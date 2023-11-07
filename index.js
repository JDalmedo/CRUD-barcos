const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const connect = require("./utils/db");

const Barco = require("./models/barco.model");
const Docked = require("./models/docked.model");

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
        return res.status(404).json("Barcos not found", error);
      }
});

router.get("/docked", async (req, res) => {
  try {
      const docked = await Docked.find().populate('barcos');
      return res.status(200).json(docked);
  } catch (error) {
      return res.status(404).json("Docked barcos not found", error);
    }
});

router.post("/barcos", async (req, res) => {
    try {
        const newBarco = new Barco(req.body);
        await newBarco.save();
        return res.status(201).json(newBarco);
    }   catch(error){
        return res.status(500).json("Error creating Barco", error);
    }    
});

router.post("/docked", async (req, res) => {
  try{
      const newDocked = new Docked(req.body);
      await newDocked.save();
      return res.status(201).json(newDocked);
    } catch (error) {
      return res.status(500).json("Failed creating docked barco", error);
    } 
});

router.get("/imo", async (req, res) => {
    try {
      const docked = await Docked.findOne({ name: "IMO" }).populate(
        "barcos"
      );
      return res.status(200).json(docked);
    } catch (error) {
      return res.status(404).json("Barco not found", error);
    }
});

router.get("/search/:name", async (req, res) => {
  try {
    const name = req.params;
    const docked = await Docked.findOne({ name: name }).populate(
      "barcos");
    return res.status(200).json(docked);
  } catch (error) {
    return res.status(404).json("Docked barco not found", error);
  }
});

router.get("/barcos/optimum", async (req, res) => {
  try {
    const barcos = await Barco.find({ quantity: { $gt: 20 } });
    return res.status(200).json(barcos);
  } catch (error) {
    return res.status(404).json("Barcos not found", error);
  }
});

router.get("/barcos/ordered", async (req, res) => {
  try {
    const barcos = await Barco.find().sort({ quality: -1 });
    return res.status(200).json(barcos);
  } catch (error) {
    return res.status(404).json("Barcos not found", error);
  }
});

server.use("/", router);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server runnig on http://localhost:${PORT}`);
});