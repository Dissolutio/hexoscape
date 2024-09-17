// ! Three Options:
// * A local game (for game development) `npm run start`
// * Client that connects to a local server `npm run devstart` (`npm run devserver` will run the local server)
// * Run a production server that serves up the client on localhost:8000: `npm run build` THEN `npm run server`

const isDeploymentEnv = import.meta.env.MODE === 'production'
const isDevEnv = import.meta.env.MODE === 'development'
const isSeparateServer = Boolean(import.meta.env.VITE_WITH_SEPARATE_SERVER)
export const isLocalApp = isDevEnv && !isSeparateServer
export const specialMatchIdToTellHeaderNavThisMatchIsLocal = 'localGameId'
// use appropriate address for server
const hostname = window?.location?.hostname ?? ''
const protocol = window?.location?.protocol ?? ''
const port = window?.location?.port ?? ''
const deploymentServerAddr = `${protocol}//${hostname}${port ? `:${port}` : ``}`
const localServerAddr = `http://localhost:8000`
export const SERVER = isDeploymentEnv ? deploymentServerAddr : localServerAddr