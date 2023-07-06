import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import Joi from "joi"
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { MongoClient } from "mongodb";

const app = express()

//Configs
app.use(express.json())
app.use(cors())
dotenv.config()

// Conexão DB
const mongoClient = new MongoClient(process.env.DATABASE_URL)
let db

mongoClient.connect()
    .then(() => db = mongoClient.db("mywallet"))
    .catch((err) => console.log(err.message));

//Schemas
const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()

})
app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body
    console.log(req.body);
    const validationSignin = userSchema.validate(req.body, { abortEarly: false })
    if (validationSignin.error) {
        const errors = validationSignin.error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }
    console.log("terminou a validção");
    try {
        const user = await db.collection("users").findOne({ email })
        console.log(user);
        if (!user) return res.status(404).send("E-mail não encontrado")
        if (!bcrypt.compareSync(password, user.password)) return res.sendStatus(401)


        const token = uuid()

        await db.collection("session").insertOne({ userId: user._id, token })
        res.send(token)
    } catch (err) {
        return res.status(500).send(err.message)
    }

})

app.get("/sign-in", async (req, res) => {
    const { Authorization } = req.headers
    const token = Authorization?.replace('Bearer ', '')

    if (!token) return res.sendStatus(401)

    const session = await db.collection("session").findOne({ token })
    if (!session) return res.sendStatus(401)

    const user = await db.collection("users").findOne({ _id: session.userId })
    if (user) {
        delete user.password
    }
})

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodado na porta ${PORT}`))