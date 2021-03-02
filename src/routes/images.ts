import { Router } from 'express'
import { query } from 'express-validator'

import { addWatermarkController } from '../controllers/images'
import { checkValidationErrors } from '../utils/validation'

const routes = (app: Router) => {
  app.post(
    '/images/watermark',
    [
      query('resize')
        .optional()
        .isFloat()
        .toFloat(),
      checkValidationErrors(),
    ],
    addWatermarkController,
  )
}

export default routes
