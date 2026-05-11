import { Html, useGLTF } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import { Vector3 } from 'three'

const WatchModel = ({ partsRef, showLabels, onReady }) => {
  const { nodes } = useGLTF('/models/watch.gltf')
  const bezelRef = useRef(null)
  const dialRef = useRef(null)
  const gearsRef = useRef(null)
  const handsRef = useRef(null)
  const strapRef = useRef(null)
  const readyRef = useRef(false)

  const basePositions = useMemo(
    () => ({
      bezel: nodes.Bezel?.position?.clone() ?? new Vector3(0, 0.05, 0.1),
      dial: nodes.Dial?.position?.clone() ?? new Vector3(0, 0, 0),
      gears: nodes.Gears?.position?.clone() ?? new Vector3(0, -0.05, -0.08),
      hands: nodes.Hands?.position?.clone() ?? new Vector3(0, 0, 0.18),
      strap: nodes.Strap?.position?.clone() ?? new Vector3(0, -0.42, 0),
    }),
    [nodes],
  )

  useEffect(() => {
    if (!partsRef) return
    partsRef.current = {
      bezel: bezelRef.current,
      dial: dialRef.current,
      gears: gearsRef.current,
      hands: handsRef.current,
      strap: strapRef.current,
      base: basePositions,
    }

    if (!readyRef.current && bezelRef.current) {
      readyRef.current = true
      onReady?.()
    }
  }, [basePositions, onReady, partsRef])

  const geometry = nodes.Bezel?.geometry

  return (
    <group scale={1.05}>
      <group
        ref={bezelRef}
        position={basePositions.bezel}
        scale={[1.2, 0.18, 1.2]}
      >
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial
            color="#d6b15f"
            metalness={0.95}
            roughness={0.2}
            envMapIntensity={1.6}
          />
        </mesh>
        {showLabels && (
          <Html
            transform
            position={[0.55, 0.2, 0.4]}
            className="label"
            distanceFactor={6}
          >
            Sapphire bezel
          </Html>
        )}
      </group>

      <group ref={dialRef} position={basePositions.dial} scale={[1, 0.08, 1]}>
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial
            color="#1c1c23"
            metalness={0.35}
            roughness={0.6}
            envMapIntensity={1.2}
          />
        </mesh>
        {showLabels && (
          <Html
            transform
            position={[-0.45, 0.18, 0.4]}
            className="label"
            distanceFactor={6}
          >
            Enamel dial
          </Html>
        )}
      </group>

      <group
        ref={gearsRef}
        position={basePositions.gears}
        scale={[0.6, 0.16, 0.6]}
      >
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial
            color="#c99a5b"
            metalness={0.85}
            roughness={0.35}
            envMapIntensity={1.4}
          />
        </mesh>
        {showLabels && (
          <Html
            transform
            position={[0.4, 0.15, -0.05]}
            className="label"
            distanceFactor={6}
          >
            Escapement
          </Html>
        )}
      </group>

      <group ref={handsRef} position={basePositions.hands} scale={[0.85, 0.04, 0.85]}>
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial
            color="#e5e5e5"
            metalness={0.7}
            roughness={0.15}
            envMapIntensity={1.2}
          />
        </mesh>
        {showLabels && (
          <Html
            transform
            position={[0.2, 0.12, 0.35]}
            className="label"
            distanceFactor={6}
          >
            Mainspring
          </Html>
        )}
      </group>

      <group
        ref={strapRef}
        position={basePositions.strap}
        scale={[1.5, 0.3, 0.65]}
      >
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial
            color="#0e0f14"
            metalness={0.2}
            roughness={0.7}
            envMapIntensity={0.8}
          />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/models/watch.gltf')

export default WatchModel
