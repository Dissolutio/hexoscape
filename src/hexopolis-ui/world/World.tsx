import { Canvas } from '@react-three/fiber'
import {
  Stars,
  Stats,
  PerspectiveCamera,
  CameraControls,
  Grid,
} from '@react-three/drei'

import { HexopolisMapDisplay3D } from './hexmap3d/HexopolisMapDisplay3D'
import { useRef } from 'react'
import { BoardHexes } from '../../game/types'

export const World = ({
  boardHexes,
  isEditor,
}: {
  boardHexes: BoardHexes
  isEditor?: boolean
}) => {
  const cameraControlsRef = useRef(undefined!)
  return (
    <Canvas>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      {/* <ambientLight intensity={1} /> */}
      {/* 4 in rectangle over top, shop-light style */}
      <directionalLight position={[50, 50, 50]} intensity={0.65} />
      <directionalLight position={[50, 50, -50]} intensity={0.65} />
      <directionalLight position={[-50, 50, 50]} intensity={0.65} />
      <directionalLight position={[-50, 50, -50]} intensity={0.65} />
      {/* 4 on sides, picture-day style */}
      <directionalLight position={[-50, 0, 0]} intensity={0.65} />
      <directionalLight position={[-50, 0, -50]} intensity={0.65} />
      <directionalLight position={[0, 0, 0]} intensity={0.65} />
      <directionalLight position={[0, 0, -50]} intensity={0.65} />
      {/* Stats displays the fps */}
      <Stats />
      {isEditor ? (
        <></>
      ) : (
        <HexopolisMapDisplay3D
          boardHexes={boardHexes}
          cameraControlsRef={cameraControlsRef}
        />
      )}
      <Grid infiniteGrid />
      <PerspectiveCamera makeDefault position={[30, 30, 50]} fov={65} />
      <axesHelper scale={[100, 100, 100]} />
      <CameraControls
        maxPolarAngle={Math.PI / 2}
        ref={cameraControlsRef}
        // minDistance={0.1}
        makeDefault
        smoothTime={1}
        // dollySpeed={0.5}
        // enabled
        // verticalDragToForward={verticalDragToForward}
        // dollyToCursor={dollyToCursor}
        // infinityDolly={infinityDolly}
      />
    </Canvas>
  )
}
