import { Fragment, Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './views/Scene'
import Start from './views/Start';

export default function App() {
  const [page, setPage] = useState(1);
  return (
    <Fragment>
      {page === 0 && <Start />}
      {page === 1 && 
      <Suspense fallback={null}>
        <Canvas shadows flat linear>
          <Scene />
          <OrbitControls />
        </Canvas>
      </Suspense>}
    </Fragment>
  )
}
