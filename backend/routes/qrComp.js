const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/inventoryManagment')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

    const qrCompSchema = new mongoose.Schema({
        name: String,
        partNumber: String,
        dateReceived: Date,
        dateDispatch: Date,
        balanceItems: Number,
        qrIdentifier: { type: String }
      });

module.exports = mongoose.model("qrComp", qrCompSchema)