import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import routes from './routes'

const app = express()

app.use(bodyParser.raw({
  type: ['image/png', 'image/jpg', 'image/jpeg'],
  limit: '10mb',
}))

routes(app)

app.use('/static/images', express.static(path.join(__dirname, '../images')))

export default app
