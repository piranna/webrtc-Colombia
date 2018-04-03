const config = {

	certs:{
		cert: '/Users/macuser/Proyectos/webrtc/CERTS/test.crt',
		key: '/Users/macuser/Proyectos/webrtc/CERTS/test.key',
		fullchain: '/path/to/fullchain.pem'
	},
	httpsPort: 8443,
	httpPort: 8000,
	kurento:{
		as_uri: "https://kms2.sientifica.com:8443/",
		ws_uri: "wss://kms2.sientifica.com:8433/kurento"
	}

}

module.exports = exports = config;