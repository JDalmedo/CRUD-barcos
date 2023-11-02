const mongoose = require("mongoose");

const barcoSchema = new mongoose.Schema({
    category: {type: String, required: true}
   
},

{
    timestamps: true,
}
);

const barco = mongoose.model("barco", barcoSchema);

module.exports = barco;