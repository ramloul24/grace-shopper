const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findByPk(Number(req.params.id))
    if (!singleOrder) res.sendStatus(404)
    res.json(singleOrder)
  } catch (error) {
    next(error)
  }
})

//protect certain routes with a "passport"

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.send(newOrder)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

//protect certain routes with a "passport"

router.put('/:id', async (req, res, next) => {
  try {
    const orderToUpdate = await Order.findByPk(Number(req.params.id))
    !orderToUpdate && res.sendStatus(404)
    await orderToUpdate.update(req.body)

    res.send(orderToUpdate)
  } catch (error) {
    console.dir(error)
    next(error)
  }
})

//protect certain routes with a "passport"

router.delete('/:id', async (req, res, next) => {
  try {
    const orderToDelete = await Order.findByPk(Number(req.params.id))
    !orderToDelete && res.sendStatus(404)
    await orderToDelete.destroy()
    const response = {
      message: 'The order has been successfully destroyed!',
      deletedId: req.params.id
    }
    res.send(response)
  } catch (error) {
    console.error(error)
    next(error)
  }
})
