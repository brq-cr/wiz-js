const { describe, it, before } = require('mocha');
const expect = require('chai').expect;
const { Context } = require('./../lib');

const INPUT = 'hello world';
const ACTION_A = 'ACTION_A';
const ACTION_B = 'ACTION_B';

describe('Context', () => {
    let contextInstace;

    before('create new context instance', () => {
        contextInstace = new Context({
            input: INPUT,
        });
    });

    describe('#constructor()', () => {
        it('should create a new instance of context', () => {
            expect(contextInstace).to.be.an.instanceof(Context);
        });

        it('should have an empty actions array inside context instance', () => {
            expect(contextInstace.actions).to.be.an.instanceof(Array);
            expect(contextInstace.actions).to.be.empty;
        });
    });

    describe('#input()', () => {
        it('should return context input', () => {
            const input = contextInstace.getInput();
            expect(input).to.equal(INPUT);
        });
    });

    describe('#pushAction()', () => {
        it('should correctly add new action once', () => {
            contextInstace.pushAction(ACTION_A);
            const actions = contextInstace.getActions();
            expect(actions).to.have.lengthOf(1);
            expect(actions).to.include(ACTION_A);
        });

        it('should add new actions without removing old actions added', () => {
            contextInstace.pushAction(ACTION_B);
            const actions = contextInstace.getActions();
            expect(actions).to.have.lengthOf(2);
            expect(actions).to.include(ACTION_A);
            expect(actions).to.include(ACTION_B);
        });

        it.skip('should mix duplicated actions', () => {

        });
    });

    describe('#getActions()', () => {
        it('should return a list of actions as array', () => {
            const actions = contextInstace.getActions();
            expect(actions).to.be.an.instanceof(Array);
        });
    });
});
