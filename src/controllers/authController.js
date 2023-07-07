import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { db } from '../database.js'

export async function signin(req, res) {
    const { email, password } = req.body
    try {
        const user = await db.collection("users").findOne({ email })
        if (!user) return res.status(404).send("E-mail não encontrado")
        if (!bcrypt.compareSync(password, user.password)) return res.sendStatus(401)


        const token = uuid()

        await db.collection("session").insertOne({ userId: user._id, token })
        res.send(token)
    } catch (err) {
        return res.status(500).send(err.message)
    }

}

export async function getSignin(req, res) {
    const { Authorization } = req.headers
    const token = Authorization?.replace('Bearer ', '')

    if (!token) return res.sendStatus(401)

    const session = await db.collection("session").findOne({ token })
    if (!session) return res.sendStatus(401)

    const user = await db.collection("users").findOne({ _id: session.userId })
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
        if (!user) return res.status(404).send("E-mail não encontrado")
        if (!bcrypt.compareSync(password, user.password)) return res.sendStatus(401)


        const token = uuid()

        await db.collection("session").insertOne({ userId: user._id, token })
        res.send(token)
    } catch (err) {
        return res.status(500).send(err.message)
    }


}