const sqlite3 = require('sqlite3');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'todo_manager.db'), (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('connected to the sqlite db');
  }
});

module.exports = db;