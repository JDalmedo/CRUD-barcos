const mongoose = require("mongoose");

const barcoSchema = new mongoose.Schema({
    category: {type: String, enum: ["Military", "Passengers", "Cargo"], required: true},
    name: {type: String, required: true},
    IMO: {type: String, required: true},
    load: {type: String, required: true},
    cover: {type: String, required: true},
    launching: {type: Boolean, default: false},
    shipyard: {type: String, required:true},
},

{
    timestamps: true,
}
);

const barco = mongoose.model("barco", barcoSchema);

module.exports = barco;