const config = {

	certs:{
		cert: '/path/to/certfile.crt',
		key: '/ path/to/keyfile.key',
		fullchain: '/path/to/fullchain.pem'
	},
	httpsPort: 443,
	httpPort: 8000,
	kurento:{
		as_uri: "https://kms2.sientifica.com:8443/",
		ws_uri: "wss://kms2.sientifica.com:8433/kurento"
	}

}

module.exports = exports = config;