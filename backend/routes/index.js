var express = require('express');
var router = express.Router();
var QrModel = require('../models/qrComp')
const UserModel = require('../models/UserModel');
const CompModel = require('../models/ComponentModel')

const jwt = require('jsonwebtoken')
const jwtSecret = "mynameismonkeydluffy"



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/data', async (req, res) => {
  try {
    // console.log(req.body)
    await QrModel.create({
      name: req.body.name,
      partNumber: Math.floor(Math.random() * 99999999),
      dateReceived: req.body.dateRecieved,
      dateDispatch: null,
      balanceItems: req.body.items,
      qrIdentifier: req.body.src,
    })
    res.status(201).json({ success: true })

  } catch (err) {
    res.status(400).send(err);
    console.log(err)
  }
});

router.post("/createuser", async (req, res) => {
  try {
    await UserModel.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    });
    res.json({ success: true })
  }
  catch (error) {
    console.log(err);
    res.json({ success: false })
  }
})

router.post("/loginuser", async (req, res) => {
  let email = req.body.email

  try {
    let userdata = await UserModel.findOne({ email })
    if (!userdata) {
      return res.status(400).json({ errors: "try logging with current credentials" });
    }

    if (userdata.password !== req.body.password) {
      return res.status(400).json({ errors: "try logging with current credentials" });
    }

    const data = {
      user: {
        id: userdata._id
      }
    }

    authToken = jwt.sign(data, jwtSecret)
    return res.json({ success: true, authToken: authToken });


  } catch (error) {
    console.log(err);
    res.json({ success: false })
  }
})

router.post("/data/delete/:id", async (req,res) => {
  try {
    const id = req.params.id;
    await QrModel.deleteOne({_id : id})
    return res.json({ success: true });
  
  } catch (error) {
    console.log(error)
  }

})




router.post('/data/update/:id', async (req, res) => {
    // console.log(req.body)
    try {
      let compData = await QrModel.findOne({ _id: req.params.id })
      if (!compData) {
        return res.status(400).json({ errors: "try logging with correct credentials" });
      }
      await QrModel.findOneAndUpdate({ _id: req.params.id }, {
        dateDispatch: new Date.now(),
        balanceItems: compData.balanceItems - req.body.items,
      })

      res.status(201).json({ success: true })

    } 
    catch (err) {
      res.status(400).send(err);
    }
});

router.get('/data', function (req, res, next) {
  try {
    QrModel.find()
      .then(function (alldata) {
        res.json(alldata)
      })


  } catch (err) {
    res.status(400).send(err);
  }

});

module.exports = router;
