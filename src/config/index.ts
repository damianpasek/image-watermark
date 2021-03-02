const { env } = process

const port = env.PORT || 3000

export default {
  port,
  imagesUrl: env.IMAGES_URL || `http://localhost:${port}/static/images`,
}
