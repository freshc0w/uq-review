const testingRouter = require('express').Router();

testingRouter.get('/', async (req, res) => {
  console.log('testing')
  res.send('testing')
})

module.exports = testingRouter;