import { Origins, Server } from 'boardgame.io/server'
import { Hexoscape } from './server/game'
import { Hexxaform } from './server/hexxaform/hexxaform-game'

const server = Server({
  games: [Hexoscape, Hexxaform],
  origins: [
    // Allow your game site to connect.
    // 'https://www.mygame.domain',
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST_IN_DEVELOPMENT,
  ],
})
const PORT = process.env.PORT || 8000

server.run(PORT, () => console.log('dev server running at: PORT'))
