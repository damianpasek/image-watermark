import sharp from 'sharp'

import { saveOutputImageLocal } from './outputLocal'

const resizeImage = async (inputImage: Buffer, resizeRatio: number): Promise<Buffer> => {
  const image = await sharp(inputImage)
  const { width } = await image.metadata()

  return image.resize(Math.round(width * resizeRatio)).toBuffer()
}

const addWatermarkToImage = async (inputImage: Buffer): Promise<Buffer> => {
  const image = sharp(inputImage)

  const { height, width } = await image.metadata()

  const watermark = await sharp('src/static/logo.svg', { density: 300 })
    .resize(Math.round(width * 0.2))
    .toBuffer()

  const watermarkInput = {
    input: watermark,
    top: Math.round(height * 0.87),
    left: Math.round(width * 0.75),
  }

  return image
    .composite([watermarkInput])
    .toBuffer()
}

type SaveOutputImage = (image: Buffer, extension: string) => Promise<string>

export const processImage = async (
  inputImage: Buffer,
  resizeRatio: number = 1,
  extension: string,
  saveOutputImage: SaveOutputImage = saveOutputImageLocal,
): Promise<string> => {
  const resizedImage = await resizeImage(inputImage, resizeRatio)
  const imageWithWatermark = await addWatermarkToImage(resizedImage)

  return saveOutputImage(imageWithWatermark, extension)
}
