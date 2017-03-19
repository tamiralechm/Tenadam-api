//load module dependency
var mongoose=require('mongoose');

var Schema=mongoose.Schema;

//creating remedy schema
var remedySchema=new Schema({
    name:{type:String}
});
module.exports=mongoose.model('remedy',remedySchema);