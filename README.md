# wiz-js
Reactive framework for bot development

*Warning this is for experimental use only*

## Example of use

```
import { Wiz, Context, Provider, Action } from 'wiz-js';

function someContext(ctx, next) {
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
        someContext,
    ],
    actions: [
        HELLO_WORLD,
    ],
    providers: [
        new MyProvider('273jsyja8s8112'),
    ],
});

wiz.listen(new Context({
    input: 'world',
})).subscribe((botAnswer) => {
    console.log(botAnswer);
});
```