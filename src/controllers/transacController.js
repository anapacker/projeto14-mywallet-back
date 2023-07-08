import { db } from '../database.js'

export async function postTransac(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) return res.sendStatus(401)

    const session = await db.collection("session").findOne({ token })
    if (!session) return res.sendStatus(401)

    const { userId } = session
    const { tipo } = req.params
    const { valor, descricao } = req.body

    if (tipo !== 'entrada' && tipo !== 'saida')
        return res.sendStatus(422)

    try {
        await db.collection(tipo).insertOne({ valor, descricao, userId })
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }

}