const mongoose = require("mongoose");

const barcoSchema = new mongoose.Schema({
    category: {type: String, required: true, trim: true},
    name: {type: String, required: true, trim: true},
    IMO: {type: Number, required: true},
    tipology: {type: String, required: true, trim: true},
    cover: {type: String, required: true},
    flag: {type: String, required: true, trim: true},
    shipyard: {type: String, required: true, trim: true},
    launching: {type: Number, required: true}
 },

 {
    timestamps: true,
 }
);

const barco = mongoose.model("barco", barcoSchema);

module.exports = barco;