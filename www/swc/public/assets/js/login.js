
var swc = swc || {};
swc.rsa = swc.rsa || {};
swc.rsa.privateKey = {};
swc.rsa.ab2str = function(buf) {
  var uint8ab= new Uint8Array(buf);
  console.log(uint8ab);
  var str ='';
  for( var i = 0 ; i < uint8ab.length-1;i++) {
    str += uint8ab[i].toString(16) + ',';
  }
  str += uint8ab[i].toString(16);
  return str;
}
swc.rsa.str2ab = function (str) {
  var buf = new ArrayBuffer(str.length); // 1 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

swc.rsa.arrayBufferToBase64String = function (arrayBuffer) {
	var byteArray = new Uint8Array(arrayBuffer)
	var byteString = '';
	for (var i=0; i<byteArray.byteLength; i++) {
		byteString += String.fromCharCode(byteArray[i]);
	}
	return btoa(byteString);
}
	
swc.rsa.convertBinaryToPem = function (binaryData) {
	var base64Cert = swc.rsa.arrayBufferToBase64String(binaryData);

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


swc.rsa.sendSign = function (signMsg){
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

swc.rsa.signToken= function () {
  var token = localStorage.getItem('swc.login.token');
  var abToken = swc.rsa.str2ab(token);
  var int8View = new Int8Array(abToken);
  console.log(int8View);
  window.crypto.subtle.sign(
  {
      name: "RSASSA-PKCS1-v1_5",
  },
  swc.rsa.privateKey, //from generateKey or importKey above
  abToken //ArrayBuffer of data you want to sign
  )
  .then(function(signature){
    //returns an ArrayBuffer containing the signature
    //console.log(signature);
    //var uint8Sign = new Uint8Array(signature);
    //console.log(uint8Sign);
    var jsonSign = {'token':token,'signature':swc.rsa.ab2str(signature)};
    console.log(JSON.stringify(jsonSign));
    swc.rsa.sendSign(jsonSign)
  })
  .catch(function(err){
    console.error(err);
  });
}
swc.rsa.sendPublicKey = function (keyStr){
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
		    swc.rsa.signToken();
		  }
		}
  });
}

swc.rsa.savePublicKey = function(key) {
  window.crypto.subtle.exportKey(
    "spki", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
    key //can be a publicKey or privateKey, as long as extractable was true
    )
    .then(function(keydata){
      //returns the exported key data
      console.log(keydata);
      var keyStr = swc.rsa.convertBinaryToPem(keydata);
      console.log(keyStr);
      localStorage.setItem('swc.login.publicKey',keyStr);
      var keyJson = {'publicKey':keyStr};
      swc.rsa.sendPublicKey(JSON.stringify(keyJson));
    })
    .catch(function(err){
      console.error(err);
    });
}
swc.rsa.savePrivateKey = function(key) {
  window.crypto.subtle.exportKey(
    "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
    key //can be a publicKey or privateKey, as long as extractable was true
    )
    .then(function(keydata){
      //returns the exported key data
      //console.log(keydata);
      localStorage.setItem('swc.login.privateKey',JSON.stringify(keydata));
    })
    .catch(function(err){
      console.error(err);
    });
}
swc.rsa.createKeyPair = function () {
  window.crypto.subtle.generateKey({
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: 2048, //can be 1024, 2048, or 4096
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
    },
    true, //whether the key is extractable (i.e. can be used in exportKey)
    ["sign", "verify"] //can be any combination of "sign" and "verify"
  )
  .then(function(key){
    //returns a keypair object
    //console.log(key);
    console.log(key.publicKey);
    console.log(key.privateKey);
    swc.rsa.savePublicKey(key.publicKey);
    swc.rsa.savePrivateKey(key.privateKey);
    swc.rsa.privateKey = key.privateKey;
  })
  .catch(function(err){
    console.error(err);
  });
}
swc.rsa.importKey = function (privateKey) {
  window.crypto.subtle.importKey(
    "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
    privateKey,
    {   //these are the algorithm options
    name: "RSASSA-PKCS1-v1_5",
    hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
    },
    true, //whether the key is extractable (i.e. can be used in exportKey)
    ["sign"] //"sign" for private key imports
  )
  .then(function(privateKey){
    //returns a publicKey (or privateKey if you are importing a private key)
    console.log(privateKey);
    swc.rsa.privateKey = privateKey;
    swc.rsa.signToken();
  })
  .catch(function(err){
    console.error(err);
  });
}



$(function(){
  var privateKey = localStorage.getItem('swc.login.privateKey');
  //console.log(privateKey);
  if (privateKey && 'string'== typeof privateKey) {
    var keyJson= JSON.parse(privateKey);
    swc.rsa.importKey(keyJson);
  } else {
      swc.rsa.createKeyPair();
  }
});


/*

var swc = swc || {};
swc.rsa = swc.rsa || {};

swc.rsa.createKeyPair = function () {
  var pkey = new RSAKey();
  pkey.generate(4096, '10001'); // generate 4096bit RSA private key with public exponent 'x010001'
  var pem = PKCS5PKEY.getEryptedPKCS5PEMFromRSAKey(pkey, '');
  localStorage.setItem('swc.login.privateKey',pem);
  var pubkey_pem = KJUR.asn1.x509.X509Util.getPKCS8PubKeyPEMfromRSAKey(pkey);
  localStorage.setItem('swc.login.publicKey',pubkey_pem);
}

swc.rsa.importKey = function (privateKey) {
}



$(function(){
  var privateKey = localStorage.getItem('swc.login.privateKey');
  //console.log(privateKey);
  if (privateKey && 'string'== typeof privateKey) {
    var keyJson= JSON.parse(privateKey);
    swc.rsa.importKey(keyJson);
  } else {
      swc.rsa.createKeyPair();
  }
});
*/


