const express = require('express');
const app = express();
const { spawn } = require('child_process');

app.use(express.json()); // Enable JSON request body parsing

app.post('/api/subscribe', (req, res) => {
  const { className, action, email } = req.body;

  const pythonScript = spawn('/usr/bin/python3', ['sub-notif.py', className, action, email]);

  pythonScript.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
  });

  pythonScript.stderr.on('data', (data) => {
    console.error(`Error executing Python script: ${data}`);
  });

  res.sendStatus(200);
});

app.post('/api/unsubscribe', (req, res) => {
  const { className, action, email } = req.body;

  const pythonScript = spawn('python', ['sub-notify.py', className, action, email]);

  pythonScript.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
  });

  pythonScript.stderr.on('data', (data) => {
    console.error(`Error executing Python script: ${data}`);
  });

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
