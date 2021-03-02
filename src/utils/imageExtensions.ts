import { Request } from 'express'

export const getImageExtensionFromHeaders = (
  headers: Request['headers'],
): string => headers['content-type'].split('/').slice(-1)[0]
