import { Router } from 'express'

import imagesRoutes from './images'

const setup = (app: Router) => {
  imagesRoutes(app)
}

export default setup
