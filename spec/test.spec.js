const expect = require('chai').expect;

let { mapDebitItems, locateDebitItems } = require('../lib/helpers.js');

describe('mapDebitItems', () => {
    it('is a function', () => {
        expect(mapDebitItems).to.be.a('function');
    });

    it('returns an array of correctly formatted debit objects', () => {
        let input = [ 
            { '$':
                { ref: 'X01234',
                valueOf: '65.00',
                currency: 'GBP' },
                PayerAccount: [ {'$': {} } ]  
            } 
        ];

        let output = [{
            id: 1,
            debit: { 
                ref: 'X01234',
                valueOf: '65.00',
                currency: 'GBP'
            },
            payerAccount: '[{"$":{}}]' 
        }];

        expect(mapDebitItems(input, 1)).to.be.an('array');
        expect(mapDebitItems(input, 1)).to.eql(output);

        let debits = mapDebitItems(input, 1);

        debits.forEach(item => {
            expect(item.id).to.be.a('number');
            expect(item.debit).to.be.an('object');
            expect(item.payerAccount).to.be.a('string');
            expect(item.debit.ref).to.be.a('string');
            expect(item.debit.valueOf).to.be.a('string');
            expect(item.debit.currency).to.be.a('string');
        });
    });
});

describe('locateDebitItems', () => {
    it('is a function', () => {
        expect(locateDebitItems).to.be.a('function');
    });

    it('returns an array of debit item objects', () => {
        let input = {
            Data: {
                ReturnedDebitItem: [
                    { '$':
                    { ref: 'X01234',
                    valueOf: '65.00',
                    currency: 'GBP' },
                    PayerAccount: [ { '$': {} } ] 
                }
                ]
            }
        };

        let output = [ 
                { '$': { ref: 'X01234', valueOf: '65.00', currency: 'GBP' },
                PayerAccount: [ {'$': {} } ] } 
            ];

        expect(locateDebitItems(input)).to.be.an('array');
        expect(locateDebitItems(input)).to.eql(output);
    });

    it('returns false when no debit items are found', () => {
        let input = {
            Data: {
                account: [
                    { '$':
                    { ref: 'X01234',
                    value: '65.00',
                    currency: 'GBP' },
                    PayAccount: [ { '$': {} } ] 
                }]
            }
        };
        expect(locateDebitItems(input)).to.equal(false);
    });
});
