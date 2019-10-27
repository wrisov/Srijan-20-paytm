/**
* import checksum generation utility
*/
const checksum_lib = require('./checksum');

var paytmChecksum = "";

/**
* Create an Object from the parameters received in POST
* received_data should contains all data received in POST
*/
var paytmParams = {};
for(var key in received_data){
	if(key == "CHECKSUMHASH") {
		paytmChecksum = received_data[key];
	} else {
		paytmParams[key] = received_data[key];
	}
}

/**
* Verify checksum
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
var isValidChecksum = checksum_lib.verifychecksum(paytmParams, "YOUR_KEY_HERE", paytmChecksum);
if(isValidChecksum) {
	console.log("Checksum Matched");
} else {
	console.log("Checksum Mismatched");
}