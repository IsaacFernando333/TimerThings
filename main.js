const express = require('express');
const Datastore = require('nedb');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '20mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) { 
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  database.insert(data);
  response.json(data);
});

app.delete('/api', (request, response) => {
  const cadastros = request.body;
  const id = request.body.idp;
    database.remove(
      { _id: `${id}`},
      function (err, numReplaced) {
        database.loadDatabase();
      }
    );
  response.json(cadastros);
});

app.put('/api', (request, response) => {
  const cadastros = request.body;
  const nomeTarefa = request.body.nomeTarefa;
  const time = request.body.definitivos;
  database.findOne({ nomeTarefa : `${nomeTarefa}`}, function (err, doc) {
    database.update(
      { nomeTarefa: `${nomeTarefa}`}, 
      { $set: {tempo: `${time}`} },
      {},
      function (err, numReplaced) {
        database.loadDatabase();
      }
      );
  });
    response.json(cadastros);
  return;
});
