$(function(){
    
    var saveKey = function(key,tag) {
        window.crypto.subtle.exportKey(
        "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
        publicKey //can be a publicKey or privateKey, as long as extractable was true
        )
        .then(function(keydata){
             //returns the exported key data
            console.log(keydata);
            var name= 'login.' +tag;
            localStorage.setItem(name,keydata);
        })
        .catch(function(err){
            console.error(err);
        });
    }

    
    var key = localStorage.getItem('login.privateKey');
    if (key && 'string'== typeof key) {
        window.crypto.subtle.importKey(
        "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
        {   //this is an example jwk key, other key types are Uint8Array objects
            kty: "RSA",
            e: "AQAB",
            n: key,
            alg: "RS256",
            ext: true,
        },
        {   //these are the algorithm options
            name: "RSASSA-PKCS1-v1_5",
            hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
        },
        false, //whether the key is extractable (i.e. can be used in exportKey)
        ["sign"] //"sign" for private key imports
    )
    .then(function(privateKey){
        //returns a publicKey (or privateKey if you are importing a private key)
        console.log(privateKey);
    })
    .catch(function(err){
        console.error(err);
    });

    } else {
        window.crypto.subtle.generateKey(
            {
                name: "RSASSA-PKCS1-v1_5",
                modulusLength: 4096, //can be 1024, 2048, or 4096
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
            },
            false, //whether the key is extractable (i.e. can be used in exportKey)
            ["sign", "verify"] //can be any combination of "sign" and "verify"
        )
        .then(function(key){
            //returns a keypair object
            console.log(key);
            console.log(key.publicKey);
            console.log(key.privateKey);
            saveKey(key.publicKey,'publicKey');
            saveKey(key.privateKey,'privateKey');
        })
        .catch(function(err){
            console.error(err);
        });
    }
)};
