const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/day.js');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

let items = [];
let workItems = [];
app.get('/', (req, res) => {
  let day = date.getDate();

  res.render('list', {listTitle: day, newListItems: items});
});
app.post('/', (req, res) => {
  let item = req.body.newItem
  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
});

app.get('/work', (req, res) => {
  res.render('list', {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});