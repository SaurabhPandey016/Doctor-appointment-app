import express from 'express'

const router = express.Router()

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get list of services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of services
 */
router.get('/', (req, res) => {
  res.json([
    { name: 'Cardiology' },
    { name: 'Neurology' },
    { name: 'Orthopedics' }
  ])
})

export default router