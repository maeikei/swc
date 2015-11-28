
var swc = swc || {};
swc.rsa = swc.rsa || {};
swc.rsa.ab2str = function(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

$(function(){
  
  
  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }
  function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  function arrayBufferToBase64String(arrayBuffer) {
		var byteArray = new Uint8Array(arrayBuffer)
		var byteString = '';
		for (var i=0; i<byteArray.byteLength; i++) {
			byteString += String.fromCharCode(byteArray[i]);
		}
		return btoa(byteString);
	}
	
  function convertBinaryToPem(binaryData) {
		var base64Cert = arrayBufferToBase64String(binaryData);

		var pemCert = "-----BEGIN PUBLIC KEY-----\r\n";

		var nextIndex = 0;
		var lineLength;
		while (nextIndex < base64Cert.length) {
			if (nextIndex + 64 <= base64Cert.length) {
				pemCert += base64Cert.substr(nextIndex, 64) + "\r\n";
			} else {
				pemCert += base64Cert.substr(nextIndex) + "\r\n";
			}
			nextIndex += 64;
		}

		pemCert += "-----END PUBLIC KEY-----\r\n";
		return pemCert;
	}
  
  
  function sendSign(signMsg){
    $.ajax({ 
      type: "POST",
      url:window.location, 
			data:"'" + JSON.stringify(signMsg) + "'",
			dataType: 'json',
			contentType: 'application/json',
			charset:'UTF-8',
			success: function(data) {
			  console.log(data);
			}
    });
    
  }
  function signToken(privateKey) {
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
      //console.log(signature);
      var jsonSign = {'token':token,'signature':ab2str(new Uint8Array(signature))};
      //console.log(JSON.stringify(jsonSign));
      sendSign(jsonSign)
    })
    .catch(function(err){
      console.error(err);
    });
  }
  function sendPublicKey(keyStr){
    $.ajax({ 
      type: "POST",
      url:window.location, 
			data:"'" + keyStr + "'",
			dataType: 'json',
			contentType: 'application/json',
			charset:'UTF-8',
			success: function(data) {
			  console.log(data);
			  if (data && data['token']) {
			    localStorage.setItem('swc.login.token',data['token']);
			    globalToken = data['token'];
			    signToken();
			  }
			}
    });
  }
  
  var savePublicKey = function(key) {
    window.crypto.subtle.exportKey(
      "spki", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      key //can be a publicKey or privateKey, as long as extractable was true
      )
      .then(function(keydata){
        //returns the exported key data
        console.log(keydata);
        var keyStr = convertBinaryToPem(keydata);
        var name= 'swc.login.publicKey';
        localStorage.setItem(name,keyStr);
        sendPublicKey(keyStr);
      })
      .catch(function(err){
        console.error(err);
      });
  }
  var savePrivateKey = function(key) {
    window.crypto.subtle.exportKey(
      "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      key //can be a publicKey or privateKey, as long as extractable was true
      )
      .then(function(keydata){
        //returns the exported key data
        //console.log(keydata);
        var name= 'swc.login.privateKey';
        localStorage.setItem(name,JSON.stringify(keydata));
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
      savePublicKey(key.publicKey);
      savePrivateKey(key.privateKey);
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
      signToken(privateKey);
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
