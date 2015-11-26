$(function(){
  function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i &lt; strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  function sendSignToken(privateKey) {
    var token = localStorage.getItem('swc.login.token');
    var abToken = str2ab(token); 
    window.crypto.subtle.sign(
    {
        name: "RSASSA-PKCS1-v1_5",
    },
    privateKey, //from generateKey or importKey above
    abToken //ArrayBuffer of data you want to sign
    )
    .then(function(signature){
      //returns an ArrayBuffer containing the signature
      console.log(new Uint8Array(signature));
    })
    .catch(function(err){
      console.error(err);
    });
  }
  function sendPublicKey(keydata){
    $.ajax({ 
      type: "POST",
      url:window.location, 
			data:"'" + JSON.stringify(keydata) + "'",
			dataType: 'json',
			contentType: 'application/json',
			charset:'UTF-8',
			success: function(data) {
			  console.log(data);
			  if (data && data['token']) {
			    localStorage.setItem('swc.login.token',data['token']);
			    globalToken = data['token'];
			    sendSignMess();
			  }
			}
    });
  }
  
  var saveKey = function(key,tag,send) {
    window.crypto.subtle.exportKey(
      "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      key //can be a publicKey or privateKey, as long as extractable was true
      )
      .then(function(keydata){
        //returns the exported key data
        //console.log(keydata);
        var name= 'swc.login.' +tag;
        localStorage.setItem(name,JSON.stringify(keydata));
        if (send) {
          sendPublicKey(keydata);
        }
      })
      .catch(function(err){
        console.error(err);
      });
  }
  function createKeyPair() {
    window.crypto.subtle.generateKey({
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 4096, //can be 1024, 2048, or 4096
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: {name: "SHA-512"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      true, //whether the key is extractable (i.e. can be used in exportKey)
      ["sign", "verify"] //can be any combination of "sign" and "verify"
    )
    .then(function(key){
      //returns a keypair object
      //console.log(key);
      console.log(key.publicKey);
      console.log(key.privateKey);
      saveKey(key.publicKey,'publicKey',true);
      saveKey(key.privateKey,'privateKey');
      sendSignToken(privateKey);
    })
    .catch(function(err){
      console.error(err);
    });
  }
  function importKey(privateKey) {
    window.crypto.subtle.importKey(
      "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      privateKey,
      {   //these are the algorithm options
      name: "RSASSA-PKCS1-v1_5",
      hash: {name: "SHA-512"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      false, //whether the key is extractable (i.e. can be used in exportKey)
      ["sign"] //"sign" for private key imports
    )
    .then(function(privateKey){
      //returns a publicKey (or privateKey if you are importing a private key)
      console.log(privateKey);
      sendSignToken(privateKey);
    })
    .catch(function(err){
      console.error(err);
    });
  }
  
  var privateKey = localStorage.getItem('swc.login.privateKey');
  //console.log(privateKey);
  if (privateKey && 'string'== typeof privateKey) {
    var keyJson= JSON.parse(privateKey);
    importKey(keyJson);
  } else {
      createKeyPair();
  }
});
