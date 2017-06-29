DROP DATABASE IF EXISTS first_stop_parser;
CREATE DATABASE first_stop_parser;
\c first_stop_parser;
CREATE TABLE raw_doc
(
    id SERIAL NOT NULL PRIMARY KEY,
    json_doc JSON NOT NULL
);
CREATE TABLE debit_items
(
    id SERIAL NOT NULL PRIMARY KEY,
    debit_item JSON NOT NULL,
    payer_account TEXT NOT NULL,
    raw_doc_id INTEGER,
    return_code INTEGER,
    value_of DOUBLE PRECISION,
    orig_processing_date DATE,
    currency TEXT,
    trans_code INTEGER,
    return_description TEXT,
    ref VARCHAR(10),
    FOREIGN KEY (raw_doc_id) REFERENCES raw_doc(id)
);

