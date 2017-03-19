//load dependency
var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var recommendationSchema=new Schema({
    medication:{type:String},
    remedy:{type:Schema.Types.ObjectId,ref:'remedy'},
    patient:{type:Schema.Types.ObjectId,ref:'patient'},
});
module.exports=mongoose.model('recommendation',recommendationSchema);