import { Line, Vector3 } from 'three'
import { MoveRange } from '../game/types'
import { transformMoveRangeToArraysOfIds } from '../game/constants'
import { HexxaformHeightRing } from '../hexxaform-ui/world/HexxaformHeightRing'
import { HexopolisHeightRing } from '../hexopolis-ui/world/HexopolisHeightRing'
import { extend, ReactThreeFiber } from '@react-three/fiber'
import { ONE_HEIGHT_LEVEL } from './MapHex3D'

export const HeightRings = ({
  boardHexID,
  playerID,
  selectedUnitMoveRange,
  bottomRingYPos,
  topRingYPos,
  position,
  isHighlighted,
  isEditor,
}: {
  boardHexID: string
  playerID: string
  selectedUnitMoveRange: MoveRange
  bottomRingYPos: number
  topRingYPos: number
  position: Vector3
  isHighlighted: boolean
  isEditor: boolean
}) => {
  const {
    safeMoves,
    engageMoves,
    dangerousMoves: disengageMoves,
  } = transformMoveRangeToArraysOfIds(selectedUnitMoveRange)
  const isInSafeMoveRange = safeMoves?.includes(boardHexID)
  const isInEngageMoveRange = engageMoves?.includes(boardHexID)
  const isInDisengageMoveRange = disengageMoves?.includes(boardHexID)
  const heightRingsForThisHex = genHeightRings(topRingYPos, bottomRingYPos)
  return (
    <>
      {heightRingsForThisHex.map((height) =>
        isEditor ? (
          <HexxaformHeightRing
            key={`${boardHexID}${height}`}
            points={genPointsForHeightRing(height)}
            height={height}
            top={topRingYPos}
            position={position}
            isHighlighted={isHighlighted}
          />
        ) : (
          <HexopolisHeightRing
            key={`${boardHexID}${height}`}
            points={genPointsForHeightRing(height)}
            height={height}
            top={topRingYPos}
            position={position}
            isHighlighted={isHighlighted}
            boardHexID={boardHexID}
            playerID={playerID}
            isInSafeMoveRange={isInSafeMoveRange}
            isInEngageMoveRange={isInEngageMoveRange}
            isInDisengageMoveRange={isInDisengageMoveRange}
          />
        )
      )}
    </>
  )
}

// this extension for line_ is because, if we just use <line></line> then we get an error:
// Property 'geometry' does not exist on type 'SVGProps<SVGLineElement>'
// So, following advice found in issue: https://github.com/pmndrs/react-three-fiber/discussions/1387
extend({ Line_: Line })
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      line_: ReactThreeFiber.Object3DNode<Line, typeof Line>
    }
  }
}

const genPointsForHeightRing = (height: number) => {
  // our World renders where the map is flat along the X,Z axes, and the negative-Y is out of the screen
  return [
    new Vector3(1.0, height, 0),
    new Vector3(0.5, height, Math.sqrt(3) / 2),
    new Vector3(-0.5, height, Math.sqrt(3) / 2),
    new Vector3(-1.0, height, 0),
    new Vector3(-0.5, height, -Math.sqrt(3) / 2),
    new Vector3(0.5, height, -Math.sqrt(3) / 2),
    new Vector3(1.0, height, 0),
  ]
}
const genHeightRings = (top: number, bottom: number) => {
  const rings: number[] = [top] // no need to show bottom rings
  for (
    let index = bottom + ONE_HEIGHT_LEVEL;
    index < top;
    index += ONE_HEIGHT_LEVEL
  ) {
    rings.push(index)
  }
  return rings
}
