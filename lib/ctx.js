'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Context = function () {
    function Context(ctx) {
        (0, _classCallCheck3.default)(this, Context);

        this.ctx = (0, _assign2.default)({}, {
            actions: []
        }, ctx);
    }

    (0, _createClass3.default)(Context, [{
        key: 'input',
        value: function input() {
            return this.ctx.input;
        }
    }, {
        key: 'getActions',
        value: function getActions() {
            return this.ctx.actions;
        }
    }, {
        key: 'pushAction',
        value: function pushAction(actions) {
            this.ctx.actions.push(actions);
            return this.ctx.actions;
        }
    }, {
        key: 'get',
        value: function get(attr, subContext) {
            var value = null;
            if (subContext) {
                value = this.ctx[subContext] ? this.ctx[subContext][attr] : null;
            } else {
                value = this.ctx[attr] || null;
            }
            return value;
        }
    }, {
        key: 'set',
        value: function set(attr, val, subContext) {
            if ((typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object' && subContext) {
                if (!this.ctx[subContext]) {
                    this.ctx[subContext] = {};
                    this.ctx[subContext][attr] = {};
                }
                this.ctx[subContext][attr] = (0, _assign2.default)(this.ctx[subContext][attr], val);
            } else if ((typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object' && !subContext) {
                if (!this.ctx[attr]) {
                    this.ctx[attr] = {};
                }
                this.ctx[attr] = (0, _assign2.default)(this.ctx[attr], val);
            } else if (subContext) {
                if (!this.ctx[subContext]) {
                    this.ctx[subContext] = {};
                }
                this.ctx[subContext][attr] = val;
            } else {
                this.ctx[attr] = val;
            }
            return val;
        }
    }, {
        key: 'of',
        value: function of(contextExpresion) {
            var _contextExpresion$spl = contextExpresion.split(':'),
                _contextExpresion$spl2 = (0, _slicedToArray3.default)(_contextExpresion$spl, 2),
                subContext = _contextExpresion$spl2[0],
                attr = _contextExpresion$spl2[1];

            var value = null;
            if (subContext === 'action') {
                value = this.ctx.actions.indexOf(attr) >= 0;
            } else {
                value = this.get(attr, subContext) || null;
            }
            return value;
        }
    }]);
    return Context;
}();

exports.default = Context;