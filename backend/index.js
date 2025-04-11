const express = require('express')
const app = express()
const port = process.env.Port || 5000;

app.get('/', (req, res) => {
  res.send('SkogsNallens butik körs...!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})