const mapDebitItems = (docs, id) => {

    return docs.map((item) => {
        return {
            id: id,
            debit: item.$,
            payerAccount: JSON.stringify(item.PayerAccount)
        };
    });
};

const locateDebitItems = (json) => {
    
    let debitItem = 'ReturnedDebitItem';

    if (json[debitItem]) return json[debitItem];

    for (debitItem in json) {
        if (typeof json[debitItem] === 'object') {
            const result = locateDebitItems(json[debitItem]);
            if (result) return result;
        }
    }
    return false;
};

module.exports = {
    mapDebitItems,
    locateDebitItems
};