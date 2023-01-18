import { Canvas } from '@react-three/fiber'
import './App.css'
import Scene from './components/Scene'

function App() {

  return (
    <div className="App">
      <Canvas
        flat
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [3,2,6]
        }}
      >
        <Scene/>

      </Canvas>
    </div>
  )
}

export default App
