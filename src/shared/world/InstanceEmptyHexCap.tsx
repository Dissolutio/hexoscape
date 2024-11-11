import { useRef, useLayoutEffect, useMemo, useState } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import {
    BufferGeometry,
    Color,
    InstancedMesh,
    InstancedMeshEventMap,
    Material,
    NormalBufferAttributes,
    Object3D,
    Vector3,
} from 'three'
import { halfLevel } from '../../game/constants'
import { getBoardHex3DCoords } from '../../game/hex-utils'
import { hexTerrainColor } from '../../hexxaform-ui/virtualscape/terrain'
import { useUIContext } from '../../hooks/ui-context'
import { InstanceCapProps } from './InstanceFluidHexCap'

const InstanceEmptyHexCapCountWrapper = (props: InstanceCapProps) => {
    const numInstances = props.capHexesArray.length
    const key = 'InstanceEmptyHexCap-' + numInstances // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
    const [hoverID, setHoverID] = useState('')

    if (numInstances < 1) return null
    return (
        <InstanceEmptyHexCap
            capHexesArray={props.capHexesArray}
            onClick={props.onClick}
            setHoverID={setHoverID}
            hoverID={hoverID}
            key={key}
        />
    )
}

const tempColor = new Color()

const InstanceEmptyHexCap = ({
    hoverID,
    setHoverID,
    capHexesArray,
    onClick,
}: InstanceCapProps) => {
    const instanceRef = useRef<
        InstancedMesh<
            BufferGeometry<NormalBufferAttributes>,
            Material | Material[],
            InstancedMeshEventMap
        >
    >(undefined!)
    const countOfCapHexes = capHexesArray.length
    const { isCameraActive, toggleIsCameraDisabled } = useUIContext()

    const colorArray = useMemo(
        () => {
            return Float32Array.from(new Array(capHexesArray.length).fill(0).flatMap((_, i) => {
                return tempColor.set(hexTerrainColor[capHexesArray[i].terrain]).toArray()
            }))
        }, [capHexesArray])
    useLayoutEffect(() => {
        const placeholder = new Object3D()
        capHexesArray.forEach((boardHex, i) => {
            const altitude = boardHex.altitude
            const yAdjustEmptyCap = altitude / 2
            const { x, z } = getBoardHex3DCoords(boardHex)
            const capPosition = new Vector3(x, yAdjustEmptyCap, z)
            placeholder.position.set(capPosition.x, capPosition.y, capPosition.z)
            placeholder.scale.set(1, halfLevel, 1)
            placeholder.updateMatrix()
            instanceRef.current.setMatrixAt(i, placeholder.matrix)
        })
        instanceRef.current.instanceMatrix.needsUpdate = true
    }, [capHexesArray])

    const onPointerEnter = (e: ThreeEvent<PointerEvent>) => {
        if (isCameraActive) return
        setHoverID(capHexesArray[e.instanceId].id)
        tempColor.set('#fff').toArray(colorArray, e.instanceId * 3)
        instanceRef.current.geometry.attributes.color.needsUpdate = true
    }
    const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
        if (isCameraActive) return
        if (hoverID === capHexesArray[e.instanceId].id) {
            setHoverID('')
            tempColor.set(hexTerrainColor[capHexesArray[e.instanceId].terrain]).toArray(colorArray, e.instanceId * 3)
            instanceRef.current.geometry.attributes.color.needsUpdate = true
        }
    }
    const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
        if (e.button === 2) return // ignore right clicks
        if (isCameraActive) return
        e.stopPropagation();
        toggleIsCameraDisabled(true)
        onClick(e, capHexesArray[e.instanceId])
    }
    const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
        if (e.button === 2) return // ignore right clicks
        toggleIsCameraDisabled(false)
    }


    return (
        <instancedMesh
            ref={instanceRef}
            args={[undefined, undefined, countOfCapHexes]} //args:[geometry, material, count]
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerEnter={onPointerEnter}
            onPointerOut={onPointerOut}
        >
            <cylinderGeometry args={[1, 1, halfLevel, 6]}>
                <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
            </cylinderGeometry>
            <meshLambertMaterial
                transparent
                opacity={0.5}
                vertexColors
            />
        </instancedMesh>
    )
}
export default InstanceEmptyHexCapCountWrapper
