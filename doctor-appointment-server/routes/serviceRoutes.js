import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json([
    { name: 'Cardiology' },
    { name: 'Neurology' },
    { name: 'Orthopedics' }
  ])
})

export default router