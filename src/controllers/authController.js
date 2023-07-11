import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { db } from '../database.js'

export async function signin(req, res) {
    const { email, password } = req.body
    try {
        const user = await db.collection("users").findOne({ email })
        if (!user) return res.status(404).send("Você não tem cadastro.")
        if (!bcrypt.compareSync(password, user.password)) return res.sendStatus(401)


        const token = uuid()

        await db.collection("session").insertOne({ userId: user._id, token })
        res.send({ token })
    } catch (err) {
        return res.status(500).send(err.message)
    }

}

export async function getSignin(req, res) {
    const { userId } = res.locals.session

    const user = await db.collection("users").findOne({ _id: userId })
    if (user) {
        delete user.password
        res.send(user)
    } else {
        res.sendStatus(401)
    }
}

export async function signup(req, res) {
    const { name, email, password } = req.body

    try {
        const user = await db.collection("users").findOne({ email })
        if (user) return res.status(409).send("E-mail já cadastrado")

        const passwordHash = bcrypt.hashSync(password, 10)
        await db.collection("users").insertOne({ name, email, password: passwordHash })
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }


}

export async function logout(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    try {
        await db.collection("session").deleteOne({ token })
        res.senStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }

}
