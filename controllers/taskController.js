const { db } = require('../db.config');

const { locateDebitItems, mapDebitItems } = require('../lib/helpers');
const { insertDebitItems } = require('./insertDebitItemsController');

const taskFunc = (json) => {
    db.task(() => {
        return db.one('INSERT INTO raw_doc(json_doc) VALUES($1) RETURNING id', [json])
            .then(({id: res}) => {
                return {
                    id: res,
                    debit: locateDebitItems(json)
                };
            })
            .catch(error => {
                return error;
            });
    })
    .then(res => {
        return mapDebitItems(res.debit, res.id);
    })
    .then(res => {
        res.map(element => {
            return insertDebitItems(element.debit, element.id, element.payerAccount,
            element.debit.returnCode, element.debit.valueOf, element.debit.originalProcessingDate,
            element.debit.currency, element.debit.transCode, element.debit.returnDescription, element.debit.ref);
        });
    })
    .catch(error => {
        return error;
    });
};

module.exports = {
    taskFunc
};