//load module dependencies
var mongoose=require('mongoose');

var Schema=mongoose.Schema;

//define profile schema attribute
var ProfileSchema=new Schema({
    user:    {type:Schema.Types.ObjectId,ref:'User'},
    patient:{type:Schema.Types.ObjectId,ref:'patient'},
    admin :  {type:Schema.Types.ObjectId,ref:'Admin'},
    first_name:{type:String},
    last_name:{type:String},
    age:{type:Number},
    phone_number:{type:Number},
    location:[{
        long:{type:Number},
        lat:{type:Number}
    }],

 }, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

//export profile model
module.exports=mongoose.model('Profile',ProfileSchema);