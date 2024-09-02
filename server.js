const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let issues = [
  { id: 1, title: 'Issue 1', description: 'Description for issue 1' },
  { id: 2, title: 'Issue 2', description: 'Description for issue 2' },
];

//Create
app.post('/issues', (req, res) => {
  const newIssue = req.body;
  issues.push(newIssue);
  console.log('Created Issue:', newIssue);
  res.status(201).send(newIssue);
});

//Read
app.get('/issues/:id', (req, res) => {
  const issue = issues.find(i => i.id === parseInt(req.params.id));
  if (issue) {
    res.send(issue);
  } else {
    res.status(404).send({ error: 'Issue not found' });
  }
});

//Update
app.put('/issues/:id', (req, res) => {
  const index = issues.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    const updatedIssue = { ...issues[index], ...req.body };
    issues[index] = updatedIssue;
    console.log('Updated Issue:', updatedIssue);
    res.send(updatedIssue);
  } else {
    res.status(404).send({ error: 'Issue not found' });
  }
});

//Delete
app.delete('/issues/:id', (req, res) => {
  const index = issues.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedIssue = issues.splice(index, 1);
    console.log('Deleted Issue:', deletedIssue);
    res.send(deletedIssue);
  } else {
    res.status(404).send({ error: 'Issue not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
