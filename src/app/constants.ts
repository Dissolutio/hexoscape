export const specialMatchIdToTellHeaderNavThisMatchIsLocal = 'localGameId'
// use appropriate address for server
const hostname = window?.location?.hostname ?? ''
const protocol = window?.location?.protocol ?? ''
const port = window?.location?.port ?? ''
const deploymentServerAddr = `${protocol}//${hostname}${port ? `:${port}` : ``}`
export const SERVER =  deploymentServerAddr

export const HEXGRID_SPACING = 1.05
export const HEXGRID_HEX_RADIUS = 1
export const HEXGRID_HEX_APOTHEM = 0.866
export const CAMERA_FOV = 65
