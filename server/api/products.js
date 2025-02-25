const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(Number(req.params.id))
    if (!singleProduct) res.sendStatus(404)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.send(newProduct)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(Number(req.params.id))
    !productToUpdate && res.sendStatus(404)
    await productToUpdate.update(req.body)

    res.send(productToUpdate)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const productToDelete = await Product.findByPk(Number(req.params.id))
    !productToDelete && res.sendStatus(404)
    await productToDelete.destroy()
    const response = {
      message: 'The product has been successfully destroyed!',
      deletedId: req.params.id
    }
    res.send(response)
  } catch (error) {
    console.error(error)
    next(error)
  }
})
