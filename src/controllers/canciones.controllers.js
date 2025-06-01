import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const getHtml = (req, res) => {
  const filePath = path.resolve('frontend/index.html')
  res.sendFile(filePath)
}

const getCanciones = (req, res) => {
  try {
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))
    res.json(canciones)
  } catch (error) {
    console.error('Error al cargar el repertorio:', error)
  }
}

const crearCanciones = (req, res) => {
  try {
    const { titulo, artista, tono } = req.body
    const id = crypto.randomUUID()
    const nuevaCancion = {
      id,
      titulo,
      artista,
      tono
    }
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))
    console.log('Antes:', canciones)
    canciones.push(nuevaCancion)
    console.log('Después:', canciones)

    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción creada con éxito')
  } catch (error) {
    console.error('Error al crear canciones', error)
  }
}

export { getHtml, getCanciones, crearCanciones }
