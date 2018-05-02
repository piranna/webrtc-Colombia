"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var kurento = require('kurento-client');

var EvKurentoCliente = function () {
	function EvKurentoCliente(argv) {
		_classCallCheck(this, EvKurentoCliente);

		this.argv = argv;
		this.kurentoClt = {};
		this.pipelines = [];
		this.fulfillCreateKurentoCliente = this.fulfillCreateKurentoCliente.bind(this);
		this.fulfillmentCreatePipeLine = this.fulfillmentCreatePipeLine.bind(this);
		this.createPipeLine = this.createPipeLine.bind(this);
		this.createKurentoCliente = this.createKurentoCliente.bind(this);
	}
	/**
 * Esta función se pasa como fulfillment (éxito) a la promesa 
 * de generación del cliente Kurento
 *
 * @param {kurento-client} kc - El objeto kurento-client
 * 
 */


	_createClass(EvKurentoCliente, [{
		key: "fulfillCreateKurentoCliente",
		value: function fulfillCreateKurentoCliente(kc) {
			if (error) {
				console.log("Error generando el Kurento Cliente");
				return error;
			}

			this.kurentoClt = kc;
			console.log(this.kurentoClt);
			return kc;
		}

		/**
  * Esta función se pasa como fulfillment (éxito) a la promesa
  * de generación de un Kurento MediaPipeLine
  *
  * @param {Error} Error - El error arrojado en caso de error.
  * @param {MediaPipeLine} pl - El MediaPipeLine generado
  *
  */

	}, {
		key: "fulfillmentCreatePipeLine",
		value: function fulfillmentCreatePipeLine(error, pl) {
			if (error) {
				console.log("No se pudo generar el nuevo pipeline");
				return error;
			}
			this.pipelines.push(pl);
		}
	}, {
		key: "createKurentoCliente",
		value: function createKurentoCliente() {

			var kc = kurento.KurentoClient(this.argv.ws_uri);
			kc = kc.then(this.fulfillCreateKurentoCliente, function (error) {
				// Connection error
				console.log("Error generando el cliente de kurento");
				return error;
			});
		}
	}, {
		key: "createPipeLine",
		value: function createPipeLine() {
			console.log(this.kurentoClt);
			this.kurentoClt.create("MediaPipeLine", this.fulfillmentCreatePipeLine);
		}
	}]);

	return EvKurentoCliente;
}();

module.exports = exports = EvKurentoCliente;