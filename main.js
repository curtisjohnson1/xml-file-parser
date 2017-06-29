if (!process.env.NODE_ENV) process.env.NODE_ENV = 'local';

const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

const { taskFunc } = require('./controllers/taskController');

fs.readdir(__dirname + '/docs/', (error, files) => {

    if (error) {
        throw error;
    }

    fs.mkdirSync('./archive');

    files.forEach((file) => {
        file = fs.readFileSync(__dirname + '/docs/' + file);
        
        parser.parseString(file, (error, result) => {
            
            const jsonDoc = result.BACSDocument;

            if (error) {
                throw error;
            }
            return taskFunc(jsonDoc);
        });
    });
});

