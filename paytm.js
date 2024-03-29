const https = require('https');

/**
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/
const checksum_lib = require('./checksum');

https.createServer(function (req, res) {
	/* initialize an object with request parameters */
	var paytmParams = {

		/* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
		"MID" : "YOUR_MID_HERE",

		/* Find your WEBSITE in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
		"WEBSITE" : "YOUR_WEBSITE_HERE",

		/* Find your INDUSTRY_TYPE_ID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
		"INDUSTRY_TYPE_ID" : "YOUR_INDUSTRY_TYPE_ID_HERE",

		/* WEB for website and WAP for Mobile-websites or App */
		"CHANNEL_ID" : "YOUR_CHANNEL_ID",

		/* Enter your unique order id */
		"ORDER_ID" : "YOUR_ORDER_ID",

		/* unique id that belongs to your customer */
		"CUST_ID" : "CUSTOMER_ID",

		/* customer's mobile number */
		"MOBILE_NO" : "CUSTOMER_MOBILE_NUMBER",

		/* customer's email */
		"EMAIL" : "CUSTOMER_EMAIL",

		/**
		* Amount in INR that is payble by customer
		* this should be numeric with optionally having two decimal points
		*/
		"TXN_AMOUNT" : "ORDER_TRANSACTION_AMOUNT",

		/* on completion of transaction, we will send you the response on this URL */
		"CALLBACK_URL" : "YOUR_CALLBACK_URL",
	};

	/**
	* Generate checksum for parameters we have
	* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
	*/
	checksum_lib.genchecksum(paytmParams, "YOUR_KEY_HERE", function(err, checksum){

		/* for Staging */
		var url = "https://securegw-stage.paytm.in/order/process";

		/* for Production */
		// var url = "https://securegw.paytm.in/order/process";

		/* Prepare HTML Form and Submit to Paytm */
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<html>');
		res.write('<head>');
		res.write('<title>Merchant Checkout Page</title>');
		res.write('</head>');
		res.write('<body>');
		res.write('<center><h1>Please do not refresh this page...</h1></center>');
		res.write('<form method="post" action="' + url + '" name="paytm_form">');
		for(var x in paytmParams){
			res.write('<input type="hidden" name="' + x + '" value="' + paytmParams[x] + '">');
		}
		res.write('<input type="hidden" name="CHECKSUMHASH" value="' + checksum + '">');
		res.write('</form>');
		res.write('<script type="text/javascript">');
		res.write('document.paytm_form.submit();');
		res.write('</script>');
		res.write('</body>');
		res.write('</html>');
		res.end();
	});
}).listen(3000);