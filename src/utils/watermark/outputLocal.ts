import path from 'path'
import fs from 'fs'
import { v4 } from 'uuid'

import config from '../../config'

const getUrl = (fileName: string): string => path.join(config.imagesUrl, fileName)

const saveFileAsync = (filePath: string, buffer: Buffer) => new Promise((resolve, reject) => {
  // eslint-disable-next-line no-undef
  fs.writeFile(filePath, buffer, (error: NodeJS.ErrnoException | null) => {
    if (error) return reject(error)

    resolve(null)
  })
})

export const saveOutputImageLocal = async (buffer: Buffer, extension: string): Promise<string> => {
  const fileName = `${v4()}.${extension}`
  const saveDestination = path.join('images', `${fileName}`)

  await saveFileAsync(saveDestination, buffer)

  return getUrl(fileName)
}
