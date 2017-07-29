class Provider {
    context(ctx) {
        if(ctx) { this.ctx = ctx; }
        return this.ctx;
    }
}