//load module dependdencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PatientSchema = new Schema({
    name: { type: String },
    email: { type: String },
    profile:{type:Schema.Types.ObjectId,ref:'Profile'},
    symptom: [{ type: Schema.Types.ObjectId, ref: 'symptom' }],
    recommendation: [{ type: Schema.Types.ObjectId, ref: 'recommendation' }]
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

    });
module.exports = mongoose.model('Patient', PatientSchema);