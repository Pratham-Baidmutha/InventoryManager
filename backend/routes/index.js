var express = require('express');
var router = express.Router();
var QrModel = require('./qrComp')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/data', async (req, res) => {
  try {
    console.log(req.body)
    await QrModel.create({
      name: req.body.opt,
      partNumber: Math.floor(Math.random() * 99999999),
      dateReceived: req.body.date,
      dateDispatch: req.body.date,
      balanceItems: req.body.items,
      qrIdentifier: req.body.src,
    })
    res.status(201).json({ success: true })
   
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/data',function(req, res, next) {
  try {
    QrModel.find()
    .then(function (alldata) {
      res.json(alldata)
    })

   
  } catch (err) {
    res.status(400).send(err);
  }
  
});
// Implement other CRUD endpoints similarly

module.exports = router;
