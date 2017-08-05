class Context {
    constructor({ input }) {
        this.input = input;
        this.actions = [];
    }

    getInput() {
        return this.input;
    }

    getActions() {
        return this.actions;
    }

    pushAction(actions) {
        this.actions.push(actions);
        return this.actions;
    }

    get(attr, subContext) {
        let value = null;
        if (subContext) {
            value = this[subContext] ? this[subContext][attr] : null;
        } else {
            value = this[attr] || null;
        }
        return value;
    }

    set(attr, val, subContext) {
        if (typeof val === 'object' && subContext) {
            if (!this[subContext]) {
                this[subContext] = {};
                this[subContext][attr] = {};
            }
            this[subContext][attr] = Object.assign(this[subContext][attr], val);
        } else if (typeof val === 'object' && !subContext) {
            if (!this[attr]) {
                this[attr] = {};
            }
            this[attr] = Object.assign(this[attr], val);
        } else if (subContext) {
            if (!this[subContext]) {
                this[subContext] = {};
            }
            this[subContext][attr] = val;
        } else {
            this[attr] = val;
        }
        return val;
    }

    of(contextExpresion) {
        const [subContext, attr] = contextExpresion.split(':');
        let value = null;
        if (subContext === 'action') {
            value = this.actions.indexOf(attr) >= 0;
        } else {
            value = this.get(attr, subContext) || null;
        }
        return value;
    }
}

export default Context;
