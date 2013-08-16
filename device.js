var http = require('http'); 

http.createServer(function (req, res) {

	var ua = req.headers['user-agent'], 
		DeviceData = {};
		DeviceData.iOS = "",
		DeviceData.iPhone = "",
		DeviceData.iPad = "",
		DeviceData.MobileOS = "",
		DeviceData.BrowserVersion = "";

		if (/like Mac OS X/.test(ua)) {
			DeviceData.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
		    DeviceData.iPhone = /iPhone/.test(ua);
			DeviceData.iPad = /iPad/.test(ua);

			if (DeviceData.iOS !== 'undefined'){
				DeviceData.MobileOS = "iOS";
			}
		}

			if ( /Android/.test(ua)){
				DeviceData.MobileOS = "Android";
			}

			if ( /Windows Phone/.test(ua)){
				DeviceData.MobileOS = "Windows Phone";
			}

		if (/Chrome/.test(ua)){
				DeviceData.browser = "Chrome";
				DeviceData.BrowserVersion = /Chrome\/[0-9]{1,}/.exec(ua)[0].replace(/Chrome\//g, '');
			}else if (/Safari/.test(ua)){
				DeviceData.browser = "Safari";
				DeviceData.BrowserVersion = /Version\/[0-9]{1,}/.exec(ua)[0].replace(/Version\//g, '');
			}else if (/Opera/.test(ua)){
				DeviceData.browser = "Opera";
				DeviceData.BrowserVersion = /Version\/[0-9]{1,}/.exec(ua)[0].replace(/Version\//g, '');
			}else if (/Firefox/.test(ua)){
				DeviceData.browser = "Firefox";
				DeviceData.BrowserVersion = /Firefox\/[0-9]{1,}/.exec(ua)[0].replace(/Firefox\//g, '');
			}else if (/MSIE/.test(ua)){
				var add = "";

				if (/IEMobile/.test(ua)){
					add = " (IEMobile)";
				}

				DeviceData.browser = "Internet Explorer"+add;
				DeviceData.BrowserVersion = /MSIE ([0-9\.\.]+)/.exec(ua)[1].replace(/.0/g, '');
			}else{
				DeviceData.browser = "Not detected";
			}

		var html = "iOS: "+DeviceData.iOS + "<br />"
				+ "iPhone: "+DeviceData.iPhone + "<br />"
				+ "iPad: "+DeviceData.iPad + "<br />"
				+ "browser: "+DeviceData.browser + "<br />"
				+ "browser version: "+DeviceData.BrowserVersion + "<br />"
				+ "UA: " + ua + "<br />"
				+ "Mobile OS: " + DeviceData.MobileOS;

		

		res.writeHead(200, {'Content-Type': 'text/html'});
       	res.end(html+'\n');


}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');