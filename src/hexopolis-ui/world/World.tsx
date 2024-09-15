import { Canvas } from '@react-three/fiber'
import {
  Stars,
  Stats,
  PerspectiveCamera,
  CameraControls,
  Grid,
} from '@react-three/drei'

import { useRef } from 'react'
import { BoardHexes, Glyphs } from '../../game/types'
import { HexopolisMapDisplay3D } from './HexopolisMapDisplay3D'
import { HexxaformMapDisplay3D } from '../../hexxaform-ui/world/HexxaformMapDisplay3D'

export const World = ({
  boardHexes,
  glyphs,
  isEditor,
}: {
  boardHexes: BoardHexes
  glyphs: Glyphs
  isEditor?: boolean
}) => {
  const cameraControlsRef = useRef(undefined!)
  return (
    <Canvas frameloop="demand">
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <WorldOverheadLights />

      {/* Stats displays the fps */}
      <Stats />
      {isEditor ? (
        <HexxaformMapDisplay3D
          boardHexes={boardHexes}
          glyphs={glyphs}
          cameraControlsRef={cameraControlsRef}
        />
      ) : (
        <HexopolisMapDisplay3D
          boardHexes={boardHexes}
          cameraControlsRef={cameraControlsRef}
        />
      )}
      <Grid infiniteGrid />
      <PerspectiveCamera fov={65} />
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

const WorldOverheadLights = () => {
  return (
    <>
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
    </>
  )
}
