const mongoose =require('mongoose')


const { Schema } = mongoose;

const ComponentSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    totalItems:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Comp',ComponentSchema);