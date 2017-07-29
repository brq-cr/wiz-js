'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wiz = function () {
    function Wiz(_ref) {
        var middlewares = _ref.middlewares,
            actions = _ref.actions,
            providers = _ref.providers;
        (0, _classCallCheck3.default)(this, Wiz);

        this.middlewares = middlewares || [];
        this.actions = actions || [];
        this.providers = providers || [];
    }

    (0, _createClass3.default)(Wiz, [{
        key: 'runMiddlewareAsPromise',
        value: function runMiddlewareAsPromise(fn, ctx) {
            return new _promise2.default(function (resolve) {
                fn(ctx, function () {
                    return resolve(ctx);
                });
            });
        }
    }, {
        key: 'observableFromMiddleware',
        value: function observableFromMiddleware(ctx, middlewares) {
            var _this = this;

            return _Rx2.default.Observable.create(function () {
                var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(observer) {
                    var i;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    observer.next(ctx);
                                    i = 0;

                                case 2:
                                    if (!(i < middlewares.length)) {
                                        _context.next = 11;
                                        break;
                                    }

                                    _context.t0 = observer;
                                    _context.next = 6;
                                    return _this.runMiddlewareAsPromise(middlewares[i], ctx);

                                case 6:
                                    _context.t1 = _context.sent;

                                    _context.t0.next.call(_context.t0, _context.t1);

                                case 8:
                                    i += 1;
                                    _context.next = 2;
                                    break;

                                case 11:
                                    observer.complete();

                                case 12:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function (_x) {
                    return _ref2.apply(this, arguments);
                };
            }());
        }
    }, {
        key: 'actionsObservableFromActions',
        value: function actionsObservableFromActions(filteredCtx, actions, providers) {
            var _this2 = this;

            return _Rx2.default.Observable.create(function () {
                var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(observer) {
                    var i, action;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    i = 0;

                                case 1:
                                    if (!(i < actions.length)) {
                                        _context2.next = 9;
                                        break;
                                    }

                                    _context2.next = 4;
                                    return actions[i].getAction(filteredCtx);

                                case 4:
                                    action = _context2.sent;

                                    observer.next({ action: action, filteredCtx: filteredCtx, providers: providers });

                                case 6:
                                    i += 1;
                                    _context2.next = 1;
                                    break;

                                case 9:
                                    observer.complete();

                                case 10:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this2);
                }));

                return function (_x2) {
                    return _ref3.apply(this, arguments);
                };
            }());
        }
    }, {
        key: 'getFunctionName',
        value: function getFunctionName(fun) {
            var ret = fun.toString();
            ret = ret.substr('function '.length);
            ret = ret.substr(0, ret.indexOf('('));
            return ret;
        }
    }, {
        key: 'addContextToProviders',
        value: function addContextToProviders(providers, ctx) {
            var providersWithContext = {};
            for (var i = 0; i < providers.length; i += 1) {
                providersWithContext[this.getFunctionName(providers[i])] = providers[i].context(ctx);
            }
            return providersWithContext;
        }
    }, {
        key: 'answersObservableFromAction',
        value: function answersObservableFromAction(_ref4) {
            var _this3 = this;

            var action = _ref4.action,
                filteredCtx = _ref4.filteredCtx,
                providers = _ref4.providers;

            return _Rx2.default.Observable.create(function () {
                var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(observer) {
                    var botResponse;
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    _context3.next = 3;
                                    return action(filteredCtx, providers);

                                case 3:
                                    botResponse = _context3.sent;

                                    observer.next(botResponse);
                                    _context3.next = 10;
                                    break;

                                case 7:
                                    _context3.prev = 7;
                                    _context3.t0 = _context3['catch'](0);

                                    observer.next(action(filteredCtx, providers));

                                case 10:
                                    observer.complete();

                                case 11:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, _this3, [[0, 7]]);
                }));

                return function (_x3) {
                    return _ref5.apply(this, arguments);
                };
            }());
        }
    }, {
        key: 'forceArray',
        value: function forceArray(notLikelyArray) {
            var retArray = void 0;
            if (notLikelyArray.length >= 0 && (typeof notLikelyArray === 'undefined' ? 'undefined' : (0, _typeof3.default)(notLikelyArray)) === 'object') {
                retArray = notLikelyArray;
            } else {
                retArray = [notLikelyArray];
            }
            return retArray;
        }
    }, {
        key: 'listen',
        value: function listen(ctx) {
            var _this4 = this;

            return this.observableFromMiddleware(ctx, this.middlewares).takeLast(1).switchMap(function (filteredCtx) {
                return _this4.actionsObservableFromActions(filteredCtx, _this4.actions, _this4.addContextToProviders(_this4.providers, filteredCtx));
            }).filter(function (_ref6) {
                var action = _ref6.action;
                return typeof action === 'function';
            }).switchMap(function (_ref7) {
                var action = _ref7.action,
                    filteredCtx = _ref7.filteredCtx,
                    providers = _ref7.providers;
                return _this4.answersObservableFromAction({
                    action: action,
                    filteredCtx: filteredCtx,
                    providers: providers
                });
            }).map(function (answer) {
                return _this4.forceArray(answer);
            }).switchMap(function (answerArray) {
                return _Rx2.default.Observable.from(answerArray);
            });
        }
    }]);
    return Wiz;
}();

module.exports = Wiz;