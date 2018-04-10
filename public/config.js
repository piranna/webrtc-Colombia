System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "PubSub": "npm:PubSub@3.4.0",
    "babel": "npm:babel-core@5.8.38",
    "babel-preset-es2015": "npm:babel-preset-es2015@6.24.1",
    "babel-preset-react": "npm:babel-preset-react@6.24.1",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "bufferutil": "npm:bufferutil@3.0.3",
    "core-js": "npm:core-js@1.2.7",
    "jquery": "npm:jquery@3.2.1",
    "socket.io": "npm:socket.io@2.0.4",
    "socket.io-client": "npm:socket.io-client@2.0.4",
    "uid-safe": "npm:uid-safe@2.1.5",
    "utf-8-validate": "npm:utf-8-validate@4.0.0",
    "webrtc-adapter": "npm:webrtc-adapter@6.1.0",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.1.0"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
    },
    "github:jspm/nodelibs-crypto@0.1.0": {
      "crypto-browserify": "npm:crypto-browserify@3.12.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-net@0.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "net": "github:jspm/nodelibs-net@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "timers": "github:jspm/nodelibs-timers@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.10"
    },
    "github:jspm/nodelibs-querystring@0.1.0": {
      "querystring": "npm:querystring@0.2.0"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-timers@0.1.0": {
      "timers-browserify": "npm:timers-browserify@1.4.2"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:jspm/nodelibs-zlib@0.1.0": {
      "browserify-zlib": "npm:browserify-zlib@0.1.4"
    },
    "npm:PubSub@3.4.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:accepts@1.3.3": {
      "mime-types": "npm:mime-types@2.1.17",
      "negotiator": "npm:negotiator@0.6.1"
    },
    "npm:are-we-there-yet@1.1.4": {
      "delegates": "npm:delegates@1.0.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "readable-stream": "npm:readable-stream@2.3.3",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:asn1.js@4.9.2": {
      "bn.js": "npm:bn.js@4.11.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:async-limiter@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babel-code-frame@6.26.0": {
      "chalk": "npm:chalk@1.1.3",
      "esutils": "npm:esutils@2.0.2",
      "js-tokens": "npm:js-tokens@3.0.2"
    },
    "npm:babel-helper-builder-react-jsx@6.26.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0",
      "esutils": "npm:esutils@2.0.2"
    },
    "npm:babel-helper-call-delegate@6.24.1": {
      "babel-helper-hoist-variables": "npm:babel-helper-hoist-variables@6.24.1",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-traverse": "npm:babel-traverse@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-helper-define-map@6.26.0": {
      "babel-helper-function-name": "npm:babel-helper-function-name@6.24.1",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0",
      "lodash": "npm:lodash@4.17.4"
    },
    "npm:babel-helper-function-name@6.24.1": {
      "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.24.1",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-template": "npm:babel-template@6.26.0",
      "babel-traverse": "npm:babel-traverse@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-helper-get-function-arity@6.24.1": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-helper-hoist-variables@6.24.1": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-helper-optimise-call-expression@6.24.1": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-helper-regex@6.26.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0",
      "lodash": "npm:lodash@4.17.4"
    },
    "npm:babel-helper-replace-supers@6.24.1": {
      "babel-helper-optimise-call-expression": "npm:babel-helper-optimise-call-expression@6.24.1",
      "babel-messages": "npm:babel-messages@6.23.0",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-template": "npm:babel-template@6.26.0",
      "babel-traverse": "npm:babel-traverse@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-messages@6.23.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:babel-plugin-check-es2015-constants@6.22.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-arrow-functions@6.22.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-block-scoped-functions@6.22.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-block-scoping@6.26.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-template": "npm:babel-template@6.26.0",
      "babel-traverse": "npm:babel-traverse@6.26.0",
      "babel-types": "npm:babel-types@6.26.0",
      "lodash": "npm:lodash@4.17.4"
    },
    "npm:babel-plugin-transform-es2015-classes@6.24.1": {
      "babel-helper-define-map": "npm:babel-helper-define-map@6.26.0",
      "babel-helper-function-name": "npm:babel-helper-function-name@6.24.1",
      "babel-helper-optimise-call-expression": "npm:babel-helper-optimise-call-expression@6.24.1",
      "babel-helper-replace-supers": "npm:babel-helper-replace-supers@6.24.1",
      "babel-messages": "npm:babel-messages@6.23.0",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-template": "npm:babel-template@6.26.0",
      "babel-traverse": "npm:babel-traverse@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-computed-properties@6.24.1": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-template": "npm:babel-template@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-destructuring@6.23.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-duplicate-keys@6.24.1": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-for-of@6.23.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-function-name@6.24.1": {
      "babel-helper-function-name": "npm:babel-helper-function-name@6.24.1",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-literals@6.22.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-modules-amd@6.24.1": {
      "babel-plugin-transform-es2015-modules-commonjs": "npm:babel-plugin-transform-es2015-modules-commonjs@6.26.0",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-template": "npm:babel-template@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-modules-commonjs@6.26.0": {
      "babel-plugin-transform-strict-mode": "npm:babel-plugin-transform-strict-mode@6.24.1",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-template": "npm:babel-template@6.26.0",
      "babel-types": "npm:babel-types@6.26.0",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:babel-plugin-transform-es2015-modules-systemjs@6.24.1": {
      "babel-helper-hoist-variables": "npm:babel-helper-hoist-variables@6.24.1",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-template": "npm:babel-template@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-modules-umd@6.24.1": {
      "babel-plugin-transform-es2015-modules-amd": "npm:babel-plugin-transform-es2015-modules-amd@6.24.1",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-template": "npm:babel-template@6.26.0",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:babel-plugin-transform-es2015-object-super@6.24.1": {
      "babel-helper-replace-supers": "npm:babel-helper-replace-supers@6.24.1",
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-parameters@6.24.1": {
      "babel-helper-call-delegate": "npm:babel-helper-call-delegate@6.24.1",
      "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.24.1",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-template": "npm:babel-template@6.26.0",
      "babel-traverse": "npm:babel-traverse@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-shorthand-properties@6.24.1": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-spread@6.22.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-sticky-regex@6.24.1": {
      "babel-helper-regex": "npm:babel-helper-regex@6.26.0",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-template-literals@6.22.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-typeof-symbol@6.23.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-es2015-unicode-regex@6.24.1": {
      "babel-helper-regex": "npm:babel-helper-regex@6.26.0",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "regexpu-core": "npm:regexpu-core@2.0.0"
    },
    "npm:babel-plugin-transform-flow-strip-types@6.22.0": {
      "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.18.0",
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-react-display-name@6.25.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:babel-plugin-transform-react-jsx-self@6.22.0": {
      "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-react-jsx-source@6.22.0": {
      "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-react-jsx@6.24.1": {
      "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.26.0",
      "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
      "babel-runtime": "npm:babel-runtime@6.26.0"
    },
    "npm:babel-plugin-transform-regenerator@6.26.0": {
      "regenerator-transform": "npm:regenerator-transform@0.10.1"
    },
    "npm:babel-plugin-transform-strict-mode@6.24.1": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0"
    },
    "npm:babel-preset-es2015@6.24.1": {
      "babel-plugin-check-es2015-constants": "npm:babel-plugin-check-es2015-constants@6.22.0",
      "babel-plugin-transform-es2015-arrow-functions": "npm:babel-plugin-transform-es2015-arrow-functions@6.22.0",
      "babel-plugin-transform-es2015-block-scoped-functions": "npm:babel-plugin-transform-es2015-block-scoped-functions@6.22.0",
      "babel-plugin-transform-es2015-block-scoping": "npm:babel-plugin-transform-es2015-block-scoping@6.26.0",
      "babel-plugin-transform-es2015-classes": "npm:babel-plugin-transform-es2015-classes@6.24.1",
      "babel-plugin-transform-es2015-computed-properties": "npm:babel-plugin-transform-es2015-computed-properties@6.24.1",
      "babel-plugin-transform-es2015-destructuring": "npm:babel-plugin-transform-es2015-destructuring@6.23.0",
      "babel-plugin-transform-es2015-duplicate-keys": "npm:babel-plugin-transform-es2015-duplicate-keys@6.24.1",
      "babel-plugin-transform-es2015-for-of": "npm:babel-plugin-transform-es2015-for-of@6.23.0",
      "babel-plugin-transform-es2015-function-name": "npm:babel-plugin-transform-es2015-function-name@6.24.1",
      "babel-plugin-transform-es2015-literals": "npm:babel-plugin-transform-es2015-literals@6.22.0",
      "babel-plugin-transform-es2015-modules-amd": "npm:babel-plugin-transform-es2015-modules-amd@6.24.1",
      "babel-plugin-transform-es2015-modules-commonjs": "npm:babel-plugin-transform-es2015-modules-commonjs@6.26.0",
      "babel-plugin-transform-es2015-modules-systemjs": "npm:babel-plugin-transform-es2015-modules-systemjs@6.24.1",
      "babel-plugin-transform-es2015-modules-umd": "npm:babel-plugin-transform-es2015-modules-umd@6.24.1",
      "babel-plugin-transform-es2015-object-super": "npm:babel-plugin-transform-es2015-object-super@6.24.1",
      "babel-plugin-transform-es2015-parameters": "npm:babel-plugin-transform-es2015-parameters@6.24.1",
      "babel-plugin-transform-es2015-shorthand-properties": "npm:babel-plugin-transform-es2015-shorthand-properties@6.24.1",
      "babel-plugin-transform-es2015-spread": "npm:babel-plugin-transform-es2015-spread@6.22.0",
      "babel-plugin-transform-es2015-sticky-regex": "npm:babel-plugin-transform-es2015-sticky-regex@6.24.1",
      "babel-plugin-transform-es2015-template-literals": "npm:babel-plugin-transform-es2015-template-literals@6.22.0",
      "babel-plugin-transform-es2015-typeof-symbol": "npm:babel-plugin-transform-es2015-typeof-symbol@6.23.0",
      "babel-plugin-transform-es2015-unicode-regex": "npm:babel-plugin-transform-es2015-unicode-regex@6.24.1",
      "babel-plugin-transform-regenerator": "npm:babel-plugin-transform-regenerator@6.26.0"
    },
    "npm:babel-preset-flow@6.23.0": {
      "babel-plugin-transform-flow-strip-types": "npm:babel-plugin-transform-flow-strip-types@6.22.0"
    },
    "npm:babel-preset-react@6.24.1": {
      "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
      "babel-plugin-transform-react-display-name": "npm:babel-plugin-transform-react-display-name@6.25.0",
      "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.24.1",
      "babel-plugin-transform-react-jsx-self": "npm:babel-plugin-transform-react-jsx-self@6.22.0",
      "babel-plugin-transform-react-jsx-source": "npm:babel-plugin-transform-react-jsx-source@6.22.0",
      "babel-preset-flow": "npm:babel-preset-flow@6.23.0"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babel-runtime@6.26.0": {
      "core-js": "npm:core-js@2.5.1",
      "regenerator-runtime": "npm:regenerator-runtime@0.11.0"
    },
    "npm:babel-template@6.26.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-traverse": "npm:babel-traverse@6.26.0",
      "babel-types": "npm:babel-types@6.26.0",
      "babylon": "npm:babylon@6.18.0",
      "lodash": "npm:lodash@4.17.4"
    },
    "npm:babel-traverse@6.26.0": {
      "babel-code-frame": "npm:babel-code-frame@6.26.0",
      "babel-messages": "npm:babel-messages@6.23.0",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0",
      "babylon": "npm:babylon@6.18.0",
      "debug": "npm:debug@2.6.9",
      "globals": "npm:globals@9.18.0",
      "invariant": "npm:invariant@2.2.2",
      "lodash": "npm:lodash@4.17.4",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babel-types@6.26.0": {
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "esutils": "npm:esutils@2.0.2",
      "lodash": "npm:lodash@4.17.4",
      "to-fast-properties": "npm:to-fast-properties@1.0.3"
    },
    "npm:babylon@6.18.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:base64id@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0"
    },
    "npm:better-assert@1.0.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "callsite": "npm:callsite@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:bindings@1.3.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:bl@1.2.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "readable-stream": "npm:readable-stream@2.3.3",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:browserify-aes@1.1.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "buffer-xor": "npm:buffer-xor@1.0.3",
      "cipher-base": "npm:cipher-base@1.0.4",
      "create-hash": "npm:create-hash@1.1.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
      "inherits": "npm:inherits@2.0.3",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-cipher@1.0.0": {
      "browserify-aes": "npm:browserify-aes@1.1.1",
      "browserify-des": "npm:browserify-des@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.3"
    },
    "npm:browserify-des@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "cipher-base": "npm:cipher-base@1.0.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "des.js": "npm:des.js@1.0.0",
      "inherits": "npm:inherits@2.0.3",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-rsa@4.0.1": {
      "bn.js": "npm:bn.js@4.11.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "randombytes": "npm:randombytes@2.0.5",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-sign@4.0.4": {
      "bn.js": "npm:bn.js@4.11.8",
      "browserify-rsa": "npm:browserify-rsa@4.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "create-hash": "npm:create-hash@1.1.3",
      "create-hmac": "npm:create-hmac@1.1.6",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.4.0",
      "inherits": "npm:inherits@2.0.3",
      "parse-asn1": "npm:parse-asn1@5.1.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-zlib@0.1.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "pako": "npm:pako@0.2.9",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "readable-stream": "npm:readable-stream@2.3.3",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:buffer-xor@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:buffer@5.1.0": {
      "base64-js": "npm:base64-js@1.2.3",
      "ieee754": "npm:ieee754@1.1.11"
    },
    "npm:bufferutil@3.0.3": {
      "bindings": "npm:bindings@1.3.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "nan": "npm:nan@2.7.0",
      "prebuild-install": "npm:prebuild-install@2.3.0"
    },
    "npm:chalk@1.1.3": {
      "ansi-styles": "npm:ansi-styles@2.2.1",
      "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
      "has-ansi": "npm:has-ansi@2.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "strip-ansi": "npm:strip-ansi@3.0.1",
      "supports-color": "npm:supports-color@2.0.0"
    },
    "npm:chownr@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:cipher-base@1.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-js@2.5.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:create-ecdh@4.0.0": {
      "bn.js": "npm:bn.js@4.11.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.4.0"
    },
    "npm:create-hash@1.1.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "cipher-base": "npm:cipher-base@1.0.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.3",
      "ripemd160": "npm:ripemd160@2.0.1",
      "sha.js": "npm:sha.js@2.4.9"
    },
    "npm:create-hmac@1.1.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "cipher-base": "npm:cipher-base@1.0.4",
      "create-hash": "npm:create-hash@1.1.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.3",
      "ripemd160": "npm:ripemd160@2.0.1",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "sha.js": "npm:sha.js@2.4.9"
    },
    "npm:crypto-browserify@3.12.0": {
      "browserify-cipher": "npm:browserify-cipher@1.0.0",
      "browserify-sign": "npm:browserify-sign@4.0.4",
      "create-ecdh": "npm:create-ecdh@4.0.0",
      "create-hash": "npm:create-hash@1.1.3",
      "create-hmac": "npm:create-hmac@1.1.6",
      "diffie-hellman": "npm:diffie-hellman@5.0.2",
      "inherits": "npm:inherits@2.0.3",
      "pbkdf2": "npm:pbkdf2@3.0.14",
      "public-encrypt": "npm:public-encrypt@4.0.0",
      "randombytes": "npm:randombytes@2.0.5",
      "randomfill": "npm:randomfill@1.0.3"
    },
    "npm:debug@2.6.9": {
      "ms": "npm:ms@2.0.0"
    },
    "npm:deep-extend@0.4.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:des.js@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:diffie-hellman@5.0.2": {
      "bn.js": "npm:bn.js@4.11.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "miller-rabin": "npm:miller-rabin@4.0.1",
      "randombytes": "npm:randombytes@2.0.5",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:elliptic@6.4.0": {
      "bn.js": "npm:bn.js@4.11.8",
      "brorand": "npm:brorand@1.1.0",
      "hash.js": "npm:hash.js@1.1.3",
      "hmac-drbg": "npm:hmac-drbg@1.0.1",
      "inherits": "npm:inherits@2.0.3",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:end-of-stream@1.4.0": {
      "once": "npm:once@1.4.0"
    },
    "npm:engine.io-client@3.1.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "component-emitter": "npm:component-emitter@1.2.1",
      "component-inherit": "npm:component-inherit@0.0.3",
      "debug": "npm:debug@2.6.9",
      "engine.io-parser": "npm:engine.io-parser@2.1.1",
      "has-cors": "npm:has-cors@1.1.0",
      "indexof": "npm:indexof@0.0.1",
      "parseqs": "npm:parseqs@0.0.5",
      "parseuri": "npm:parseuri@0.0.5",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "yeast": "npm:yeast@0.1.2"
    },
    "npm:engine.io-parser@2.1.1": {
      "after": "npm:after@0.8.2",
      "arraybuffer.slice": "npm:arraybuffer.slice@0.0.6",
      "base64-arraybuffer": "npm:base64-arraybuffer@0.1.5",
      "blob": "npm:blob@0.0.4",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "has-binary2": "npm:has-binary2@1.0.2"
    },
    "npm:engine.io@3.1.4": {
      "accepts": "npm:accepts@1.3.3",
      "base64id": "npm:base64id@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "cookie": "npm:cookie@0.3.1",
      "debug": "npm:debug@2.6.9",
      "engine.io-parser": "npm:engine.io-parser@2.1.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "querystring": "github:jspm/nodelibs-querystring@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "uws": "npm:uws@0.14.5",
      "ws": "npm:ws@3.3.3",
      "zlib": "github:jspm/nodelibs-zlib@0.1.0"
    },
    "npm:evp_bytestokey@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "md5.js": "npm:md5.js@1.3.4",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:gauge@2.7.4": {
      "aproba": "npm:aproba@1.2.0",
      "console-control-strings": "npm:console-control-strings@1.1.0",
      "has-unicode": "npm:has-unicode@2.0.1",
      "object-assign": "npm:object-assign@4.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "signal-exit": "npm:signal-exit@3.0.2",
      "string-width": "npm:string-width@1.0.2",
      "strip-ansi": "npm:strip-ansi@3.0.1",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "wide-align": "npm:wide-align@1.1.2"
    },
    "npm:github-from-package@0.0.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:globals@9.18.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:has-ansi@2.0.0": {
      "ansi-regex": "npm:ansi-regex@2.1.1"
    },
    "npm:has-binary2@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "isarray": "npm:isarray@2.0.1"
    },
    "npm:has-unicode@2.0.1": {
      "os": "github:jspm/nodelibs-os@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:hash-base@2.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:hash-base@3.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:hash.js@1.1.3": {
      "inherits": "npm:inherits@2.0.3",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:hmac-drbg@1.0.1": {
      "hash.js": "npm:hash.js@1.1.3",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:inherits@2.0.3": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:ini@1.3.5": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:invariant@2.2.2": {
      "loose-envify": "npm:loose-envify@1.3.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:is-fullwidth-code-point@1.0.0": {
      "number-is-nan": "npm:number-is-nan@1.0.1"
    },
    "npm:isarray@1.0.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:loose-envify@1.3.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "js-tokens": "npm:js-tokens@3.0.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:md5.js@1.3.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "hash-base": "npm:hash-base@3.0.4",
      "inherits": "npm:inherits@2.0.3"
    },
    "npm:miller-rabin@4.0.1": {
      "bn.js": "npm:bn.js@4.11.8",
      "brorand": "npm:brorand@1.1.0"
    },
    "npm:mime-db@1.30.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:mime-types@2.1.17": {
      "mime-db": "npm:mime-db@1.30.0",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:mkdirp@0.5.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "minimist": "npm:minimist@0.0.8",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:nan@2.7.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:nan@2.8.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:node-abi@2.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "semver": "npm:semver@5.4.1"
    },
    "npm:npmlog@4.1.2": {
      "are-we-there-yet": "npm:are-we-there-yet@1.1.4",
      "console-control-strings": "npm:console-control-strings@1.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "gauge": "npm:gauge@2.7.4",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "set-blocking": "npm:set-blocking@2.0.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:once@1.4.0": {
      "wrappy": "npm:wrappy@1.0.2"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:os-homedir@1.0.2": {
      "os": "github:jspm/nodelibs-os@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pako@0.2.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:parse-asn1@5.1.0": {
      "asn1.js": "npm:asn1.js@4.9.2",
      "browserify-aes": "npm:browserify-aes@1.1.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "create-hash": "npm:create-hash@1.1.3",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
      "pbkdf2": "npm:pbkdf2@3.0.14",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:parseqs@0.0.5": {
      "better-assert": "npm:better-assert@1.0.2"
    },
    "npm:parseuri@0.0.5": {
      "better-assert": "npm:better-assert@1.0.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pbkdf2@3.0.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "create-hash": "npm:create-hash@1.1.3",
      "create-hmac": "npm:create-hmac@1.1.6",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "ripemd160": "npm:ripemd160@2.0.1",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "sha.js": "npm:sha.js@2.4.9"
    },
    "npm:prebuild-install@2.3.0": {
      "expand-template": "npm:expand-template@1.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "github-from-package": "npm:github-from-package@0.0.0",
      "minimist": "npm:minimist@1.2.0",
      "mkdirp": "npm:mkdirp@0.5.1",
      "node-abi": "npm:node-abi@2.1.2",
      "noop-logger": "npm:noop-logger@0.1.1",
      "npmlog": "npm:npmlog@4.1.2",
      "os-homedir": "npm:os-homedir@1.0.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "pump": "npm:pump@1.0.3",
      "rc": "npm:rc@1.2.2",
      "simple-get": "npm:simple-get@1.4.3",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "tar-fs": "npm:tar-fs@1.16.0",
      "tunnel-agent": "npm:tunnel-agent@0.6.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "xtend": "npm:xtend@4.0.1",
      "zlib": "github:jspm/nodelibs-zlib@0.1.0"
    },
    "npm:process-nextick-args@1.0.7": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:process@0.11.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:public-encrypt@4.0.0": {
      "bn.js": "npm:bn.js@4.11.8",
      "browserify-rsa": "npm:browserify-rsa@4.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "create-hash": "npm:create-hash@1.1.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "parse-asn1": "npm:parse-asn1@5.1.0",
      "randombytes": "npm:randombytes@2.0.5"
    },
    "npm:pump@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "end-of-stream": "npm:end-of-stream@1.4.0",
      "once": "npm:once@1.4.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:random-bytes@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0"
    },
    "npm:randombytes@2.0.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:randomfill@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "randombytes": "npm:randombytes@2.0.5",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:rc@1.2.2": {
      "deep-extend": "npm:deep-extend@0.4.2",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ini": "npm:ini@1.3.5",
      "minimist": "npm:minimist@1.2.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "strip-json-comments": "npm:strip-json-comments@2.0.1"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:readable-stream@2.3.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "process-nextick-args": "npm:process-nextick-args@1.0.7",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "npm:string_decoder@1.0.3",
      "util-deprecate": "npm:util-deprecate@1.0.2"
    },
    "npm:regenerator-runtime@0.11.0": {
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:regenerator-transform@0.10.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "babel-runtime": "npm:babel-runtime@6.26.0",
      "babel-types": "npm:babel-types@6.26.0",
      "private": "npm:private@0.1.8",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:regexpu-core@2.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "regenerate": "npm:regenerate@1.3.3",
      "regjsgen": "npm:regjsgen@0.2.0",
      "regjsparser": "npm:regjsparser@0.1.5",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:regjsparser@0.1.5": {
      "jsesc": "npm:jsesc@0.5.0"
    },
    "npm:ripemd160@2.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "hash-base": "npm:hash-base@2.0.2",
      "inherits": "npm:inherits@2.0.3"
    },
    "npm:rtcpeerconnection-shim@1.2.5": {
      "sdp": "npm:sdp@2.5.0"
    },
    "npm:safe-buffer@5.1.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:semver@5.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:set-blocking@2.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sha.js@2.4.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.3",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:signal-exit@3.0.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:simple-get@1.4.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "once": "npm:once@1.4.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:socket.io-adapter@1.1.1": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:socket.io-client@2.0.4": {
      "backo2": "npm:backo2@1.0.2",
      "base64-arraybuffer": "npm:base64-arraybuffer@0.1.5",
      "component-bind": "npm:component-bind@1.0.0",
      "component-emitter": "npm:component-emitter@1.2.1",
      "debug": "npm:debug@2.6.9",
      "engine.io-client": "npm:engine.io-client@3.1.4",
      "has-cors": "npm:has-cors@1.1.0",
      "indexof": "npm:indexof@0.0.1",
      "object-component": "npm:object-component@0.0.3",
      "parseqs": "npm:parseqs@0.0.5",
      "parseuri": "npm:parseuri@0.0.5",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "socket.io-parser": "npm:socket.io-parser@3.1.2",
      "to-array": "npm:to-array@0.1.4"
    },
    "npm:socket.io-parser@3.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "component-emitter": "npm:component-emitter@1.2.1",
      "debug": "npm:debug@2.6.9",
      "has-binary2": "npm:has-binary2@1.0.2",
      "isarray": "npm:isarray@2.0.1"
    },
    "npm:socket.io@2.0.4": {
      "debug": "npm:debug@2.6.9",
      "engine.io": "npm:engine.io@3.1.4",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "socket.io-adapter": "npm:socket.io-adapter@1.1.1",
      "socket.io-client": "npm:socket.io-client@2.0.4",
      "socket.io-parser": "npm:socket.io-parser@3.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "url": "github:jspm/nodelibs-url@0.1.0"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string-width@1.0.2": {
      "code-point-at": "npm:code-point-at@1.1.0",
      "is-fullwidth-code-point": "npm:is-fullwidth-code-point@1.0.0",
      "strip-ansi": "npm:strip-ansi@3.0.1"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:string_decoder@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:strip-ansi@3.0.1": {
      "ansi-regex": "npm:ansi-regex@2.1.1"
    },
    "npm:supports-color@2.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:tar-fs@1.16.0": {
      "chownr": "npm:chownr@1.0.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "mkdirp": "npm:mkdirp@0.5.1",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "pump": "npm:pump@1.0.3",
      "tar-stream": "npm:tar-stream@1.5.5"
    },
    "npm:tar-stream@1.5.5": {
      "bl": "npm:bl@1.2.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "end-of-stream": "npm:end-of-stream@1.4.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "readable-stream": "npm:readable-stream@2.3.3",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:timers-browserify@1.4.2": {
      "process": "npm:process@0.11.10"
    },
    "npm:tunnel-agent@0.6.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "net": "github:jspm/nodelibs-net@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "tls": "github:jspm/nodelibs-tls@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:uid-safe@2.1.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "random-bytes": "npm:random-bytes@1.0.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:utf-8-validate@4.0.0": {
      "bindings": "npm:bindings@1.3.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "nan": "npm:nan@2.8.0",
      "prebuild-install": "npm:prebuild-install@2.3.0"
    },
    "npm:util-deprecate@1.0.2": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:uws@0.14.5": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:webrtc-adapter@6.1.0": {
      "rtcpeerconnection-shim": "npm:rtcpeerconnection-shim@1.2.5",
      "sdp": "npm:sdp@2.5.0"
    },
    "npm:wide-align@1.1.2": {
      "string-width": "npm:string-width@1.0.2"
    },
    "npm:ws@3.3.3": {
      "async-limiter": "npm:async-limiter@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "ultron": "npm:ultron@1.1.1",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "zlib": "github:jspm/nodelibs-zlib@0.1.0"
    },
    "npm:xtend@4.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    }
  }
});
