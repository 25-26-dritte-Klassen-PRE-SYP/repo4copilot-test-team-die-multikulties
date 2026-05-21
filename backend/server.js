const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: 'Tastatur' },
  { id: 2, name: 'Maus' }
];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = {
    id: Date.now(),
    name: req.body.name ?? 'Ohne Name'
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Item nicht gefunden' });
  }

  items[index] = { ...items[index], name: req.body.name ?? items[index].name };
  res.json(items[index]);
});

app.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  items = items.filter(i => i.id !== id);
  res.status(204).send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
