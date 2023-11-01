const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const connect = require("./utils/db");

const Barco = require("./models/barco.model");

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}));
connect();

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const newBarco = new Barco(req, body);
        console.log(newBarco);
        await newBarco.save();
        return res.status(201).json(newBarco);
    }   catch(error){
        return res.status(400).json("Error creating Barco");
    }    
});

router.get("/barcos", async (req, res) => {
    try {
        const barcos = await Barco.find();
        return res.status(200).json(barcos);
    } catch (error) {
        return res.status(404).json("Barcos not found");
      }
});

server.use("/", router);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server runnig on http://localhost:${PORT}`)
});