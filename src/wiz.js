import Rx from 'rxjs/Rx';

class Wiz {
    constructor({ middlewares, actions, providers }) {
        this.middlewares = middlewares || [];
        this.actions = actions || [];
        this.providers = providers || [];
    }

    runMiddlewareAsPromise(fn, ctx) {
        return new Promise((resolve) => {
            fn(ctx, () => resolve(ctx));
        });
    }

    observableFromMiddleware(ctx, middlewares) {
        return Rx.Observable.create(async (observer) => {
            observer.next(ctx);
            for (let i = 0; i < middlewares.length; i += 1) {
                observer.next(await this.runMiddlewareAsPromise(middlewares[i], ctx));
            }
            observer.complete();
        });
    }

    actionsObservableFromActions(filteredCtx, actions, providers) {
        return Rx.Observable.create(async (observer) => {
            for (let i = 0; i < actions.length; i += 1) {
                const action = await actions[i].getAction(filteredCtx);
                observer.next({ action, filteredCtx, providers });
            }
            observer.complete();
        });
    }

    getFunctionName(fun) {
        let ret = fun.toString();
        ret = ret.substr('function '.length);
        ret = ret.substr(0, ret.indexOf('('));
        return ret;
    }

    addContextToProviders(providers, ctx) {
        const providersWithContext = {};
        for (let i = 0; i < providers.length; i += 1) {
            providersWithContext[this.getFunctionName(providers[i])] = providers[i].context(ctx);
        }
        return providersWithContext;
    }

    answersObservableFromAction({ action, filteredCtx, providers }) {
        return Rx.Observable.create(async (observer) => {
            try {
                const botResponse = await action(filteredCtx, providers);
                observer.next(botResponse);
            } catch (err) {
                observer.next(action(filteredCtx, providers));
            }
            observer.complete();
        });
    }

    forceArray(notLikelyArray) {
        let retArray;
        if (notLikelyArray.length >= 0 && typeof notLikelyArray === 'object') {
            retArray = notLikelyArray;
        } else {
            retArray = [notLikelyArray];
        }
        return retArray;
    }

    listen(ctx) {
        return this.observableFromMiddleware(ctx, this.middlewares)
            .takeLast(1)
            .switchMap(filteredCtx => this.actionsObservableFromActions(
                filteredCtx,
                this.actions,
                this.addContextToProviders(this.providers, filteredCtx),
            ))
            .filter(({ action }) => typeof action === 'function')
            .switchMap(({ action, filteredCtx, providers }) => this.answersObservableFromAction({
                action,
                filteredCtx,
                providers,
            }))
            .map(answer => this.forceArray(answer))
            .switchMap(answerArray => Rx.Observable.from(answerArray));
    }
}
module.exports = Wiz;
