import { computeUnitMoveRange } from './game/computeUnitMoveRange'

let result
self.onmessage = (event) => {
  const data = event?.data
  console.log('🚀 ~ WORKER STARTING:')
  const timeA = performance.now()
  result = getMoveRange(data)
  const timeB = performance.now()
  console.log(`TOOK: ${timeA - timeB} ms`)
  self.postMessage(result)
}

function getMoveRange(data) {
  return computeUnitMoveRange(data)
}
