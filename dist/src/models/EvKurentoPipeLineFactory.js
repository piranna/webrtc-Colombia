'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EvKurentoPipeline1On1VideoRecording = require('./EvKurentoPipeline1On1VideoRecording');

var EvKurentoPipeLineFactory = function () {
	function EvKurentoPipeLineFactory() {
		_classCallCheck(this, EvKurentoPipeLineFactory);
	}

	_createClass(EvKurentoPipeLineFactory, [{
		key: 'createPipeline',
		value: function createPipeline(pipelineType, evKurentoClt, wss) {

			switch (pipelineType) {

				case '1ON1_VIDEO_RECORDING':
					var pl = new EvKurentoPipeline1On1VideoRecording(evKurentoClt, wss);
					return pl;
					break;

			}
		}
	}]);

	return EvKurentoPipeLineFactory;
}();

module.exports = exports = EvKurentoPipeLineFactory;