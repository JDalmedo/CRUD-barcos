const mongoose = require('mongoose');

const dockedSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim:true},
        IMO: {type:Number, required: true},
        docked: {type: Boolean, required: true},
        barcos: [{type: mongoose.Types.ObjectId, ref: 'barco'}],
    
    },
    {
        timestamps: true,
    }
);

const Docked = mongoose.model('docked', dockedSchema);

module.exports = Docked;