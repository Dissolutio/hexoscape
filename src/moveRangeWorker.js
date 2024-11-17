import { computeUnitMoveRange } from './game/computeUnitMoveRange'

self.onmessage = (event) => {
  const data = event?.data
  self.postMessage(computeUnitMoveRange(data))
}
