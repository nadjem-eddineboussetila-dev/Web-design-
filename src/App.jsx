import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { SRGBColorSpace } from 'three'
import WatchScene from './components/WatchScene'
import UIOverlay from './components/UIOverlay'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const scrollRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: true,
      syncTouch: true,
    })

    const raf = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)
    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
      gsap.ticker.remove(raf)
    }
  }, [])

  return (
    <div className="app">
      <Canvas
        className="scene"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 3.8], fov: 32, near: 0.1, far: 100 }}
        onCreated={({ gl }) => {
          gl.useLegacyLights = false
          gl.toneMappingExposure = 1.15
          gl.outputColorSpace = SRGBColorSpace
        }}
      >
        <Suspense fallback={null}>
          <WatchScene scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
      <main className="scroll-root" ref={scrollRef}>
        <UIOverlay />
      </main>
    </div>
  )
}

export default App
