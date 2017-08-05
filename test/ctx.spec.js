const { describe, it, before } = require('mocha');
const expect = require('chai').expect;
const { Context } = require('./../lib');

describe('Context', () => {
    let contextInstace;

    before('create new context instance', () => {
        contextInstace = new Context({
            input: 'hello world',
        });
    });
    
    describe.skip('#constructor()', () => {
        it('should create a new instance of context', () => {

        });

        it('should have an empty actions array inside context instance', () => {
            
        });
    });

    describe('#input()', () => {
        it('should return context input', () => {
            const input = contextInstace.input();
            expect(input).to.equal('hello world');
        });
    });
});
