import 'babel-polyfill';

import { Wiz, Context, Provider, Action } from './wiz';

function someContext(ctx, next) {
    ctx.pushAction('HELLO_WORLD');
}

class MyProvider extends Provider {
    constructor(bar) {
        super();
        this.foo = bar;
    }

    someMethod() {
        return this.bar;
    }
}

const HELLO_WORLD = new Task([
    {
        rule: ctx => ctx.of('task:HELLO_WORLD'),
        action: (ctx, { MyProvider }) => {
            console.log(MyProvider.someMethod(), 'worked', MyProvider.context(), 'ctx');
            return `Holis ${ctx.input()}`;
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
    input: 'hola',
})).subscribe((botAnswer) => {
    console.log(botAnswer);
});