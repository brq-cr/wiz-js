class Context {
    
    constructor(ctx) {
        this.ctx = Object.assign({}, {
            actions: [],
        }, ctx);
    }

    input() {
        return this.ctx.input;
    }

    getActions() {
        return this.ctx.actions;
    }

    pushAction(actions) {
        this.ctx.actions.push(actions);
        return this.ctx.actions;
    }

    get(attr, subContext) {
        let value = null;
        if (subContext) {
            value = this.ctx[subContext] ? this.ctx[subContext][attr] : null;
        } else {
            value = this.ctx[attr] || null;
        }
        return value;
    }

    set(attr, val, subContext) {
        if (typeof val === 'object' && subContext) {
            if (!this.ctx[subContext]) {
                this.ctx[subContext] = {};
                this.ctx[subContext][attr] = {};
            }
            this.ctx[subContext][attr] = Object.assign(this.ctx[subContext][attr], val);
        } else if (typeof val === 'object' && !subContext) {
            if (!this.ctx[attr]) {
                this.ctx[attr] = {};
            }
            this.ctx[attr] = Object.assign(this.ctx[attr], val);
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

    of(contextExpresion) {
        const [subContext, attr] = contextExpresion.split(':');
        let value = null;
        if (subContext === 'action') {
            value = this.ctx.actions.indexOf(attr) >= 0;
        } else {
            value = this.get(attr, subContext) || null;
        }
        return value;
    }
}

export default Context;
