import { CameraControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useControls, button, buttonGroup, folder } from 'leva'
import { MathUtils } from "three"

type MyTuple = [number, number, number]
const { DEG2RAD } = MathUtils

export default function MyCameraControls({
    cameraControlsRef
}: { cameraControlsRef: React.MutableRefObject<CameraControls> }) {
    // const { camera } = useThree()
    // const { minDistance, enabled, verticalDragToForward, dollyToCursor, infinityDolly } = useControls({
    //     thetaGrp: buttonGroup({
    //         label: 'rotate theta',
    //         opts: {
    //             '+45º': () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
    //             '-90º': () => cameraControlsRef.current?.rotate(-90 * DEG2RAD, 0, true),
    //             '+360º': () => cameraControlsRef.current?.rotate(360 * DEG2RAD, 0, true)
    //         }
    //     }),
    //     phiGrp: buttonGroup({
    //         label: 'rotate phi',
    //         opts: {
    //             '+20º': () => cameraControlsRef.current?.rotate(0, 20 * DEG2RAD, true),
    //             '-40º': () => cameraControlsRef.current?.rotate(0, -40 * DEG2RAD, true)
    //         }
    //     }),
    //     truckGrp: buttonGroup({
    //         label: 'truck',
    //         opts: {
    //             '(1,0)': () => cameraControlsRef.current?.truck(1, 0, true),
    //             '(0,1)': () => cameraControlsRef.current?.truck(0, 1, true),
    //             '(-1,-1)': () => cameraControlsRef.current?.truck(-1, -1, true)
    //         }
    //     }),
    //     dollyGrp: buttonGroup({
    //         label: 'dolly',
    //         opts: {
    //             '1': () => cameraControlsRef.current?.dolly(1, true),
    //             '-1': () => cameraControlsRef.current?.dolly(-1, true)
    //         }
    //     }),
    //     zoomGrp: buttonGroup({
    //         label: 'zoom',
    //         opts: {
    //             '/2': () => cameraControlsRef.current?.zoom(camera.zoom / 2, true),
    //             '/-2': () => cameraControlsRef.current?.zoom(-camera.zoom / 2, true)
    //         }
    //     }),
    //     minDistance: { value: 0 },
    //     moveTo: folder(
    //         {
    //             vec1: { value: [3, 5, 2], label: 'vec' },
    //             'moveTo(…vec)': button((get) => cameraControlsRef.current?.moveTo(...get('moveTo.vec1') as MyTuple, true))
    //         },
    //         { collapsed: true }
    //     ),
    //     // 'fitToBox(mesh)': button(() => cameraControlsRef.current?.fitToBox(meshRef.current, true)),
    //     setPosition: folder(
    //         {
    //             vec2: { value: [-5, 2, 1], label: 'vec' },
    //             'setPosition(…vec)': button((get) => cameraControlsRef.current?.setPosition(...get('setPosition.vec2') as MyTuple, true))
    //         },
    //         { collapsed: true }
    //     ),
    //     setTarget: folder(
    //         {
    //             vec3: { value: [3, 0, -3], label: 'vec' },
    //             'setTarget(…vec)': button((get) => cameraControlsRef.current?.setTarget(...get('setTarget.vec3') as MyTuple, true))
    //         },
    //         { collapsed: true }
    //     ),
    //     setLookAt: folder(
    //         {
    //             vec4: { value: [1, 2, 3], label: 'position' },
    //             vec5: { value: [1, 1, 0], label: 'target' },
    //             'setLookAt(…position, …target)': button((get) => cameraControlsRef.current?.setLookAt(...get('setLookAt.vec4') as MyTuple, ...get('setLookAt.vec5') as MyTuple, true))
    //         },
    //         { collapsed: true }
    //     ),
    //     lerpLookAt: folder(
    //         {
    //             vec6: { value: [-2, 0, 0], label: 'posA' },
    //             vec7: { value: [1, 1, 0], label: 'tgtA' },
    //             vec8: { value: [0, 2, 5], label: 'posB' },
    //             vec9: { value: [-1, 0, 0], label: 'tgtB' },
    //             t: { value: Math.random(), label: 't', min: 0, max: 1 },
    //             'f(…posA,…tgtA,…posB,…tgtB,t)': button((get) => {
    //                 return cameraControlsRef.current?.lerpLookAt(
    //                     ...get('lerpLookAt.vec6') as MyTuple,
    //                     ...get('lerpLookAt.vec7') as MyTuple,
    //                     ...get('lerpLookAt.vec8') as MyTuple,
    //                     ...get('lerpLookAt.vec9') as MyTuple,
    //                     get('lerpLookAt.t'),
    //                     true
    //                 )
    //             })
    //         },
    //         { collapsed: true }
    //     ),
    //     saveState: button(() => cameraControlsRef.current?.saveState()),
    //     reset: button(() => cameraControlsRef.current?.reset(true)),
    //     enabled: { value: true, label: 'controls on' },
    //     verticalDragToForward: { value: false, label: 'vert. drag to move forward' },
    //     dollyToCursor: { value: false, label: 'dolly to cursor' },
    //     infinityDolly: { value: false, label: 'infinity dolly' }
    // })
    return (
        <CameraControls
            ref={cameraControlsRef}
            makeDefault
            // camera: Persp | Ortho
            // domElement: HTML element
            // onStart
            // onEnd
            // onChange
            // events: boolean
            // regress: boolean

            // minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2} // this keeps the camera on a half-sphere around the map, rather than allowing camera to go under the map
            // minAzimuthAngle={}
            // maxAzimuthAngle={}
            minDistance={1} // this keeps the camera above ground and out of the board hexes nether region
            maxDistance={100} // this prevents camera from dollying out too far
            // infinityDolly={false}
            // minZoom={}
            // maxZoom={}
            smoothTime={0.3}



        // LEVA EXPLORE
        // minDistance={minDistance}
        // enabled={enabled}
        // verticalDragToForward={verticalDragToForward}
        // dollyToCursor={dollyToCursor}
        // infinityDolly={infinityDolly}
        />
    )
}
