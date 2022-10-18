const mongoose = require('mongoose');
const conec = 'mongodb://localhost/sistema2';

//mongoose.connect(conec,(err)=>console.log(err));

mongoose.connect(conec,{useNewUrlParser: true})
.then(db=> console.log('database online'))
.catch(err=>console.log('error = '+err));

module.exports = mongoose;