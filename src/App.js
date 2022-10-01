import { Fragment, Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './views/Scene'
import Scene1 from './views/Scene1'
import Start from './views/Start';
import Scene2 from './views/Scene2'

export default function App() {
  const [page, setPage] = useState(0);
  return (
    <Fragment>
      {page === 0 && <canvas id="stars"></canvas>}
      {page === 0 && <Start setPage={setPage} />}
      {page === 1 && 
      
      <Suspense fallback={null}>
        <Canvas shadows flat linear className='no-cursor'>
          <Scene2 />
          <OrbitControls />
        </Canvas>
      </Suspense>
      }
    </Fragment>
  )
}
