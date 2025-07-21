require("dotenv").config()
const Hapi = require("@hapi/hapi")
const Jwt = require("@hapi/jwt")

// Routes
const albumsRoutes = require("./routes/albums")
const songsRoutes = require("./routes/songs")
const usersRoutes = require("./routes/users")
const authenticationsRoutes = require("./routes/authentications")
const playlistsRoutes = require("./routes/playlists")
const collaborationsRoutes = require("./routes/collaborations")
const playlistActivitiesRoutes = require("./routes/playlist-activities")

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  })

  // Register JWT plugin
  await server.register([
    {
      plugin: Jwt,
    },
  ])

  // Define JWT authentication strategy
  server.auth.strategy("openmusic_jwt", "jwt", {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  })

  // Register routes
  server.route(albumsRoutes)
  server.route(songsRoutes)
  server.route(usersRoutes)
  server.route(authenticationsRoutes)
  server.route(playlistsRoutes)
  server.route(collaborationsRoutes)
  server.route(playlistActivitiesRoutes)

  // Global error handling
  server.ext("onPreResponse", (request, h) => {
    const { response } = request

    if (response.isBoom) {
      if (response.output.statusCode === 400) {
        return h
          .response({
            status: "fail",
            message: response.message,
          })
          .code(400)
      }

      if (response.output.statusCode === 401) {
        return h
          .response({
            status: "fail",
            message: response.message,
          })
          .code(401)
      }

      if (response.output.statusCode === 403) {
        return h
          .response({
            status: "fail",
            message: response.message,
          })
          .code(403)
      }

      if (response.output.statusCode === 404) {
        return h
          .response({
            status: "fail",
            message: response.message,
          })
          .code(404)
      }

      // Server error (500)
      return h
        .response({
          status: "error",
          message: "Terjadi kegagalan pada server kami",
        })
        .code(500)
    }

    return response.continue || response
  })

  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

init()
