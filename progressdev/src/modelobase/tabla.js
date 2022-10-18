const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    user:{type:String,required:true},
    pass:{type:String,required:true}/*,
    edad:{type:Number,required:true},
    fechainscripcion:{type: Date, default: Date.now },
    sex:{type:Boolean,default:true}*/
});

module.exports = mongoose.model('Task2',TaskSchema);