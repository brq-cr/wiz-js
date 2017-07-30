# wiz-js
Reactive framework for bot development

*Warning this is for experimental use only*

## Example of use

**npm install wiz-js --save**

```
const { Wiz, Action, Context, Provider } = require('wiz-js');

function setActionContext(ctx, next) {
    ctx.pushAction('HELLO_WORLD');
    next();
}

class MyProvider extends Provider {
    constructor(bar) {
        super();
        this.foo = bar;
    }

    someMethod() {
        return this.foo;
    }
}

const HELLO_WORLD = new Action([
    {
        rule: ctx => ctx.of('action:HELLO_WORLD'),
        action: (ctx, { MyProvider }) => {
            console.log(MyProvider.someMethod(), MyProvider.context());
            return `Hello ${ctx.input()}`;
        },
    },
]);

const wiz = new Wiz({
    middlewares: [
        setActionContext,
    ],
    actions: [
        HELLO_WORLD,
    ],
    providers: [
        new MyProvider('MyConfigurationValues-1283628192hd82'),
    ],
});

wiz.listen(new Context({
    input: 'world',
})).subscribe((botAnswer) => {
    console.log(botAnswer);
});
```