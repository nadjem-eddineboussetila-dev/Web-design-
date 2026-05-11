import { Environment, OrbitControls, Stage } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MathUtils, Vector2, Vector3 } from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import GoldDust from './GoldDust'
import WatchModel from './WatchModel'

gsap.registerPlugin(ScrollTrigger)

const WatchScene = ({ scrollRef }) => {
  const groupRef = useRef(null)
  const parallaxRef = useRef(null)
  const floatRef = useRef(null)
  const rimLightRef = useRef(null)
  const partsRef = useRef(null)
  const velocityRef = useRef(0)
  const focusRef = useRef(new Vector3(0, 0, 0))
  const audioRef = useRef(null)
  const audioUnlockedRef = useRef(false)
  const labelStateRef = useRef(false)
  const [showLabels, setShowLabels] = useState(false)
  const [modelReady, setModelReady] = useState(false)
  const { camera } = useThree()

  useEffect(() => {
    RectAreaLightUniformsLib.init()
  }, [])

  useEffect(() => {
    const audio = new Audio('/audio/tick.wav')
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  useLayoutEffect(() => {
    if (!modelReady || !scrollRef?.current || !partsRef.current) return

    const ctx = gsap.context(() => {
      const parts = partsRef.current
      const base = parts.base
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            velocityRef.current = self.getVelocity()
            if (!audioUnlockedRef.current && audioRef.current) {
              audioRef.current.play().catch(() => {})
              audioUnlockedRef.current = true
            }
            const show = self.progress > 0.68
            if (show !== labelStateRef.current) {
              labelStateRef.current = show
              setShowLabels(show)
            }
          },
        },
      })

      tl.to(
        groupRef.current.rotation,
        {
          y: Math.PI * 0.45,
          duration: 1,
          ease: 'power2.inOut',
        },
        0,
      )

      tl.to(
        groupRef.current.position,
        {
          y: 0.06,
          duration: 1,
          ease: 'power1.out',
        },
        0,
      )

      tl.to(
        parts.bezel.position,
        {
          x: base.bezel.x,
          y: base.bezel.y + 0.35,
          z: base.bezel.z + 0.45,
          duration: 1,
          ease: 'power2.inOut',
        },
        1,
      )

      tl.to(
        parts.dial.position,
        {
          x: base.dial.x - 0.12,
          y: base.dial.y + 0.08,
          z: base.dial.z + 0.2,
          duration: 1,
          ease: 'power2.inOut',
        },
        1,
      )

      tl.to(
        parts.gears.position,
        {
          x: base.gears.x + 0.15,
          y: base.gears.y - 0.2,
          z: base.gears.z - 0.25,
          duration: 1,
          ease: 'power2.inOut',
        },
        1,
      )

      tl.to(
        parts.hands.position,
        {
          x: base.hands.x + 0.05,
          y: base.hands.y + 0.2,
          z: base.hands.z + 0.35,
          duration: 1,
          ease: 'power2.inOut',
        },
        1,
      )

      tl.to(
        parts.strap.position,
        {
          x: base.strap.x,
          y: base.strap.y - 0.35,
          z: base.strap.z - 0.35,
          duration: 1,
          ease: 'power2.inOut',
        },
        1,
      )

      tl.to(
        camera.position,
        {
          x: 0.65,
          y: 0.2,
          z: 2.1,
          duration: 1,
          ease: 'power2.inOut',
        },
        2,
      )

      tl.to(
        focusRef.current,
        {
          x: 0.1,
          y: 0.05,
          z: 0,
          duration: 1,
          ease: 'power2.inOut',
        },
        2,
      )

      if (audioRef.current) {
        tl.to(
          audioRef.current,
          {
            volume: 0.18,
            duration: 0.5,
            ease: 'power1.out',
          },
          2.2,
        )
      }
    })

    return () => ctx.revert()
  }, [camera, modelReady, scrollRef])

  useFrame((state, delta) => {
    if (parallaxRef.current) {
      const targetX = state.pointer.y * 0.18
      const targetY = state.pointer.x * 0.22
      parallaxRef.current.rotation.x = MathUtils.lerp(
        parallaxRef.current.rotation.x,
        targetX,
        0.06,
      )
      parallaxRef.current.rotation.y = MathUtils.lerp(
        parallaxRef.current.rotation.y,
        targetY,
        0.06,
      )
    }

    if (floatRef.current) {
      floatRef.current.rotation.y += delta * 0.15
      floatRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08
      floatRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    }

    if (rimLightRef.current) {
      rimLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2
      rimLightRef.current.position.y =
        1.4 + Math.cos(state.clock.elapsedTime * 0.4) * 0.4
    }

    camera.lookAt(focusRef.current)
  })

  return (
    <>
      <GoldDust velocityRef={velocityRef} />
      <ambientLight intensity={0.35} />
      <rectAreaLight
        ref={rimLightRef}
        width={2.6}
        height={1.2}
        intensity={6}
        color="#ffd78a"
        position={[2.2, 1.4, 2.4]}
      />
      <pointLight intensity={1.2} position={[-2, 1.2, 1.8]} color="#8aa4ff" />
      <Stage environment={null} intensity={0.2} shadows={false} adjustCamera={false}>
        <group ref={groupRef}>
          <group ref={parallaxRef}>
            <group ref={floatRef}>
              <WatchModel
                partsRef={partsRef}
                showLabels={showLabels}
                onReady={() => setModelReady(true)}
              />
            </group>
          </group>
        </group>
      </Stage>
      <Environment preset="studio" />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <EffectComposer multisampling={4}>
        <Bloom intensity={1.2} luminanceThreshold={0.4} mipmapBlur />
        <ChromaticAberration
          offset={new Vector2(0.0016, 0.0012)}
          radialModulation
        />
      </EffectComposer>
    </>
  )
}

export default WatchScene
