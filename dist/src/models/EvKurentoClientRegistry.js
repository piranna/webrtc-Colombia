"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EvKurentoClientRegistry = function () {
	function EvKurentoClientRegistry() {
		_classCallCheck(this, EvKurentoClientRegistry);

		this.registry = [];
		this.deleteClient = this.deleteClient.bind(this);
	}

	_createClass(EvKurentoClientRegistry, [{
		key: "addClient",
		value: function addClient(clt) {
			if (!this.isClientAlreadyRegistered(clt)) {
				this.registry.push(clt);
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: "isClientAlreadyRegistered",
		value: function isClientAlreadyRegistered(clt) {

			for (var i = 0; i < this.registry.length; i++) {

				if (clt.uid == this.registry[i].uid) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: "getClientByUid",
		value: function getClientByUid(uid) {
			for (var i = 0; i < this.registry.length; i++) {

				if (uid == this.registry[i].uid) {
					return this.registry[i];
				}
			}
			return false;
		}
	}, {
		key: "getClientBySocketId",
		value: function getClientBySocketId(socketid) {

			for (var i = 0; i < this.registry.length; i++) {

				if (socketid == this.registry[i].socketid) {
					return this.registry[i];
				}
			}
			return false;
		}
	}, {
		key: "deleteClient",
		value: function deleteClient(clt) {

			var indexToDel = -1;
			for (var i = 0; i < this.registry.length; i++) {

				if (clt.uid == this.registry[i].uid) {
					indexToDel = i;
				}
			}
			if (indexToDel > -1) {
				this.registry.splice(indexToDel, 1);
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: "getRegistryLength",
		value: function getRegistryLength() {
			return this.registry.length;
		}
	}]);

	return EvKurentoClientRegistry;
}();

module.exports = exports = EvKurentoClientRegistry;