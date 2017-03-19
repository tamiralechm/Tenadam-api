var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var symptomSchema=new Schema({
    patient:{type:Schema.Types.ObjectId,ref:'patient'},
    name:{type:String},
    body_part:{type:String},
    recommendation:{type:Schema.Types.ObjectId,ref:'recommendation'},
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});
module.exports=mongoose.model('symptom',symptomSchema);