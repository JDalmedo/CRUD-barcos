const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const connect = require("./utils/db");

const Barco = require("./models/barco.model");

const server = express();
connect();
server.use(express.json());
server.use(express.urlencoded({extended: false}));

const router = express.Router();

router.get("/barcos", async (req, res) => {
    try {
        const barcos = await Barco.find();
        return res.status(200).json(barcos);
    } catch (error) {
        return res.status(400).json("Barcos not found");
      }
});
router.get("barcos/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const barco = await Barco.findById(id);
        return res.status(200).json(barco);
      } catch (error) {
        return res.status(404).json("Barco not found");
      } 
    });

router.post("/barcos", async (req, res) => {
    try {
        const newBarco = new Barco(req.body);
        await newBarco.save();
        return res.status(201).json(newBarco);
    }   catch(error){
        return res.status(500).json("Error creating Barco");
    }    
});

router.delete("/barcos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const barco = await Barco.findByIdAndDelete(id);
        return res.status(200).json(barco);
      } catch(error){
        return res.status(500).json("Error deleting Barco");
      }

});

router.patch("/barcos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const barco = await Barco.findByIdAndUpdate(id);
        return res.status(200).json(barco);
      } catch(error){
        return res.status(500).json("Error updating Barco");
      }
});

server.use("/", router);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server runnig on http://localhost:${PORT}`);
});