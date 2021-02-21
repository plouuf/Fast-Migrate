const express = require('express');
const country_router = require('./routes/country');
const user_router = require('./routes/users');
const port = 3000;

const app = express();

app.use(express.json());
app.use('/country', country_router);
app.use('/user', user_router);

app.get('/', (req, res) => {
  res.send('Homepage :)');
});

server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
