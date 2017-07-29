'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BotAction = function () {
    function BotAction(rules) {
        (0, _classCallCheck3.default)(this, BotAction);

        this.rules = rules;
        this.action = undefined;
        // TODO : Improve iteration XD
        this.iterate = function iterate(iterateRules, ctx, callback) {
            iterateRules.reverse();
            for (var i = 0; i < iterateRules.length; i += 1) {
                if (iterateRules[i].rule(ctx)) {
                    this.action = iterateRules[i].action;
                    if ((0, _typeof3.default)(iterateRules[i].children) === 'object' && iterateRules[i].children.length > 0) {
                        this.iterate(iterateRules[i].children, ctx, callback);
                    } else {
                        callback(this.action);
                    }
                }
            }
            callback(this.action);
        };
    }

    (0, _createClass3.default)(BotAction, [{
        key: 'getAction',
        value: function getAction(ctx) {
            var _this = this;

            return new _promise2.default(function (resolve) {
                _this.iterate(_this.rules, ctx, function (action) {
                    // Reset action || TODO: This needs to be improved :/
                    _this.action = undefined;
                    resolve(action);
                });
            });
        }
    }]);
    return BotAction;
}();

exports.default = BotAction;