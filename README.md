# XML File Parser

An XML file parser which reads a given directories files, converts the XML file into JSON and stores the information into a postgres database. 

As well as this, it will recursively search for all returnDebitItem's storing each into the database, before then archiving each debit item.

## Get Started

The below instructions will help get you up and running in a development environment. 

## Prerequisites

To get started, please ensure that you are running Node version 6.11 or higher, you can check that you are by running terminal command 

```javascript
node -v
```

If you do not have node installed, then please follow [here](https://nodejs.org/en/download/) to get node installed onto your machine.

Next, you will need to ensure that you have postgres which I chose as my database. If you do not have a local copy already installed then you can download the app located [here](http://postgresapp.com/) to get you up and running.

## Local machine commands

Clone the git repo

```javascript
git clone 
```

Install all dependencies that are required

```javascript
npm install
```

Next, you will need to create your local postgres SQL database by running the terminal command

```javascript
npm run build
```

You should then receive confirmation that your database and all it's tables have been created.

Finally, run command

```javascript
npm run start
```

You should now have successfully parsed all XML files, returning all debit items into the archive as a JSON document, as well as saving these files into your local database. 

## Viewing the JSON Docs

To view the JSON documents, please locate the archive folder where all debit items will be filed by their reference number.

To view the files in postgres, firstly open postgres and click on the database titled 

```javascript
first_stop_parser
```

Once this has then loaded, input command 

```javascript
SELECT * FROM debit_items;
``` 

This will then show all debit items that have been saved into the database. 

Alternatively, you can use a GUI such as [pgAdmin](https://www.pgadmin.org/) to connect to the database and view all records within.

# Testing

To be able to run all the automated tests, please open your terminal and run the following command 

```javascript
npm run test
```



