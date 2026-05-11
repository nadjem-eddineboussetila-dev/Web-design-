import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'

const GoldDust = ({ count = 1400, spread = 8, velocityRef }) => {
  const pointsRef = useRef(null)
  const materialRef = useRef(null)
  const positions = useMemo(() => {
    const pseudoRandom = (seed) => {
      const value = Math.sin(seed) * 43758.5453123
      return value - Math.floor(value)
    }

    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3
      const randA = pseudoRandom(i * 1.3 + 0.1) - 0.5
      const randB = pseudoRandom(i * 2.1 + 1.7) - 0.5
      const randC = pseudoRandom(i * 3.7 + 3.2) - 0.5
      array[i3] = randA * spread
      array[i3 + 1] = randB * spread * 0.6
      array[i3 + 2] = randC * spread
    }
    return array
  }, [count, spread])

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04
      pointsRef.current.rotation.x += delta * 0.01
    }

    if (materialRef.current) {
      const velocity = Math.min(Math.abs(velocityRef?.current ?? 0) / 1400, 1)
      materialRef.current.size = 0.015 + velocity * 0.03
      materialRef.current.opacity = 0.35 + velocity * 0.45
    }
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color="#e3c47a"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  )
}

export default GoldDust
