//load module dependencies
var mongoose=require('mongoose');

var Schema=mongoose.Schema;

//define admin schema attribute
var AdminSchema=new Schema({
    profile:{type:Schema.Types.ObjectId,ref:'Profile'},
 }, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

//export profile model
module.exports=mongoose.model('Admin',AdminSchema);