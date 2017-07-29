'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _wiz = require('./wiz');

var _wiz2 = _interopRequireDefault(_wiz);

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

var _ctx = require('./ctx');

var _ctx2 = _interopRequireDefault(_ctx);

var _provider = require('./provider');

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export { Wiz, Action, Context, Provider };


// import 'babel-polyfill';

// import { Wiz, Context, Provider, Action } from './wiz';

function someContext(ctx, next) {
    ctx.pushAction('HELLO_WORLD');
    next();
}

var MyProvider = function (_Provider) {
    (0, _inherits3.default)(MyProvider, _Provider);

    function MyProvider(bar) {
        (0, _classCallCheck3.default)(this, MyProvider);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MyProvider.__proto__ || (0, _getPrototypeOf2.default)(MyProvider)).call(this));

        _this.foo = bar;
        return _this;
    }

    (0, _createClass3.default)(MyProvider, [{
        key: 'someMethod',
        value: function someMethod() {
            return this.bar;
        }
    }]);
    return MyProvider;
}(_provider2.default);

var HELLO_WORLD = new _action2.default([{
    rule: function rule(ctx) {
        return ctx.of('task:HELLO_WORLD');
    },
    action: function action(ctx, _ref) {
        var MyProvider = _ref.MyProvider;

        console.log(MyProvider.someMethod(), 'worked', MyProvider.context(), 'ctx');
        return 'Holis ' + ctx.input();
    }
}]);

var wiz = new _wiz2.default({
    middlewares: [someContext],
    actions: [HELLO_WORLD],
    providers: [new MyProvider('273jsyja8s8112')]
});

wiz.listen(new _ctx2.default({
    input: 'hola'
})).subscribe(function (botAnswer) {
    console.log(botAnswer);
});