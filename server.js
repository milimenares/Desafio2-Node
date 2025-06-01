import express from 'express'
import 'dotenv/config'
import { getHtml, getCanciones, crearCanciones, updateCanciones } from './src/controllers/canciones.controllers.js'

const app = express()

const PORT = process.env.PORT ?? 3000 // hecho con variables de entorno

app.use(express.json()) // para poder recibir datos en formato JSON

app.get('/', getHtml)

app.get('/canciones', getCanciones)

app.post('/canciones', crearCanciones)

app.put('/canciones/:id', updateCanciones)

app.listen(PORT, console.log(`Servidor andando http://localhost:${PORT}`))
