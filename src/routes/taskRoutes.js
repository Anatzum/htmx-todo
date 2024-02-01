const express = require('express');
const db = require('../db.js');
const router = express.Router();

router.get('/', (req, res) => {
  let taskList = [];
  const sql = 'select * from tasks';
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      let taskRow = `<div class="task-row">
        <div>${row.title}</div>
        <div>${row.description}</div>
        <div>${row.due_date}</div>
        <div>${row.completed ? "Completed" : "Pending"}</div>
        <div>
          <button
            hx-delete="/tasks/${row.id}"
          >
            Delete
          </button>
        </div>
      </div>`;
      taskList.push(taskRow);
    });
    res.send(taskList.join(""));
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  const sql = 'insert into tasks (title, description, due_date, completed) values(?, ?, ?, 0)';

  db.run(sql, [body.title, body.description, body.due_date], (err) => {
    if (err) {
      console.log(err.message);
    }
    res.redirect('back');
  });
});

router.delete('/:id', (req, res) => {
  const sql = 'delete from tasks where id = ?';
  db.run(sql, [req.params.id], (err) => {
    if (err) {
      console.log(err.message);
    }
    res.set({
      'HX-Refresh': true
    });
    res.send();
  });
});

module.exports = router;