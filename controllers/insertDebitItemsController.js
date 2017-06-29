const { db } = require('../db.config');
const fs = require('fs');

const insertDebitItems = (debit, id, payerAccount, returnCode, valueOf, origProcessDate, currency, transCode, rD, ref) => {

    db.one(`INSERT INTO debit_items(debit_item, raw_doc_id, payer_account, return_code, value_of, 
            orig_processing_date, currency, trans_code, return_description, ref) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            returning debit_item`, [debit, id, payerAccount, returnCode, valueOf, origProcessDate, currency, transCode, rD, ref])
        .then(result => {
            console.log(`REFERENCE: ${ref} - debit item successfully saved to database`); 
            return fs.writeFileSync(`./archive/${ref}.json`, JSON.stringify(result.debit_item));
        })
        .catch(error => {
            return error;
        });
};

module.exports = {
    insertDebitItems
};