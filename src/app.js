import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import Joi from "joi"
import { MongoClient } from "mongodb";

const app = express()

//Configs
app.use(express.json())
app.use(cors)
dotenv.config()

// Conexão DB
const mongoClient = new MongoClient(process.env.DATABASE_URL)

try {
    mongoClient.connect()
    console.log("mongoDB conectado!")
} catch (err) {
    console.log(err.message)
}

const db = mongoClient.db

//Schemas
const userSchema = Joi.object({ name: Joi.string().required })

app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body


})

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodado na porta ${PORT}`))