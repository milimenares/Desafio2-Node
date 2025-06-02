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
    res.json({ message: 'El recurso no está disponible' })
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
    canciones.push(nuevaCancion)

    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción creada con éxito')
  } catch (error) {
    console.error('Error al crear canciones', error)
    res.json({ message: 'El recurso no está disponible' })
  }
}

const updateCanciones = (req, res) => {
  try {
    const id = req.params.id
    const { titulo, artista, tono } = req.body
    
    let canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))
    const cancion = canciones.find((c) => c.id === id)
    
    if (!cancion) {
      res.status(404).send('Canción no encontrada')
    }

    canciones = canciones.map((cancion) => {
      if (cancion.id === id) {
        return { ...cancion, titulo, artista, tono }
      }
      return cancion
    })

    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción actualizada con éxito')
  } catch (error) {
    console.error('Error al actualizar la canción', error)
    res.json({ message: 'El recurso no está disponible' })
  }
}

const deleteCanciones = (req, res) => {
  try {
    const id = req.params.id
    let canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))

    const cancion = canciones.find((c) => c.id === id)
    if (!cancion) {
      res.status(404).send('Canción no encontrada')
    }

    canciones = canciones.filter((c) => c.id !== id)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción eliminada con éxito')
  } catch (error) {
    console.error('Error al eliminar la canción', error)
    res.json({ message: 'El recurso no está disponible' })
  }
}

export { getHtml, getCanciones, crearCanciones, updateCanciones, deleteCanciones }
