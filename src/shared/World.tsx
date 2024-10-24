import { Canvas } from '@react-three/fiber'
import { Stars, PerspectiveCamera, CameraControls } from '@react-three/drei'

import { useRef } from 'react'
import { BoardHexes, Glyphs, HexMap } from '../game/types'
import { HexopolisMapDisplay3D } from '../hexopolis-ui/world/HexopolisMapDisplay3D'
import { HexxaformMapDisplay3D } from '../hexxaform-ui/world/HexxaformMapDisplay3D'
import { CAMERA_FOV } from '../game/constants'
import { HexxaformMoves } from '../game/hexxaform/hexxaform-types'
import TakeAPictureBox from './TakeAPictureBox'

export const World = ({
  boardHexes,
  hexMap,
  glyphs,
  isEditor,
  hexxaformMoves,
}: {
  boardHexes: BoardHexes
  hexMap: HexMap
  glyphs: Glyphs
  isEditor?: boolean
  hexxaformMoves?: HexxaformMoves
}) => {
  const cameraControlsRef = useRef(undefined!)
  return (
    /* 
    frameloop="demand"
    Since our app does not have any animations, it uses static elements, we only need
    to run frames when something is changing, like during mouse movement or camera motion.
    https://r3f.docs.pmnd.rs/advanced/scaling-performance#on-demand-rendering
    */
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
      {/* <color attach="background" args={[150, 150, 150]} /> */}
      <WorldOverheadLights />
      <TakeAPictureBox />
      {/* Stats displays the fps */}
      {/* <Stats /> */}
      {isEditor ? (
        <HexxaformMapDisplay3D
          boardHexes={boardHexes}
          hexMap={hexMap}
          moves={hexxaformMoves}
          glyphs={glyphs}
          cameraControlsRef={cameraControlsRef}
        />
      ) : (
        <HexopolisMapDisplay3D
          boardHexes={boardHexes}
          cameraControlsRef={cameraControlsRef}
        />
      )}
      <PerspectiveCamera fov={CAMERA_FOV} />
      <axesHelper scale={[100, 100, 100]} />
      <CameraControls
        maxPolarAngle={Math.PI / 2} // this keeps the camera on a half-sphere around the map, rather than allowing camera to go under the map
        maxDistance={100} // this prevents camera from dollying out too far
        minDistance={1} // this keeps the camera above ground and out of the board hexes nether region
        ref={cameraControlsRef}
        makeDefault
        smoothTime={1}
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
