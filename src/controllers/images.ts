import { Request, Response } from 'express'

import { processImage } from '../utils/watermark'
import { getImageExtensionFromHeaders } from '../utils/imageExtensions'

export const addWatermarkController = async (req: Request, res: Response) => {
  const requestImage = req.body
  const resizeRatio = req.query.resize as any as number
  const extension = getImageExtensionFromHeaders(req.headers)

  const fileLink = await processImage(requestImage, resizeRatio, extension)

  res.json({ success: true, image: fileLink })
}
