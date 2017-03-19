//load module dependency
var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var historySchema=new Schema({
patient:{type:Schema.Types.ObjectId,ref:'patient'},
recommendation:{type:Schema.Types.ObjectId,ref:'recommendation'},
symptom:{type:Schema.Types.ObjectId,ref:'symptom'},
remedy:{type:Schema.Types.ObjectId,ref:'remedy'}
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});
module.exports=mongoose.model('history',historySchema);
