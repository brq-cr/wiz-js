class BotAction {

    constructor(rules) {
        this.rules = rules;
        this.action = undefined;
         // TODO : Improve iteration XD
        this.iterate = function iterate(iterateRules, ctx, callback) {
            iterateRules.reverse();
            for (let i = 0; i < iterateRules.length; i += 1) {
                if (iterateRules[i].rule(ctx)) {
                    this.action = iterateRules[i].action;
                    if (typeof iterateRules[i].children === 'object' && iterateRules[i].children.length > 0) {
                        this.iterate(iterateRules[i].children, ctx, callback);
                    } else {
                        callback(this.action);
                    }
                }
            }
            callback(this.action);
        };
    }


    getAction(ctx) {
        return new Promise((resolve) => {
            this.iterate(this.rules, ctx, (action) => {
                // Reset action || TODO: This needs to be improved :/
                this.action = undefined;
                resolve(action);
            });
        });
    }

}
export default BotAction;
