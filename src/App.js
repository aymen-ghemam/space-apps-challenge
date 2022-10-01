import { Fragment, Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './views/Scene'
import Scene1 from './views/Scene1'
import Start from './views/Start';
import Scene2 from './views/Scene2'

export default function App() {
  const [page, setPage] = useState(1);
  return (
    <Fragment>
      {page === 0 && <Start />}
      {page === 1 && 
      <Suspense fallback={null}>
        <Canvas shadows flat linear>
          <Scene2 />
          <OrbitControls />
        </Canvas>
      </Suspense>}
    </Fragment>
  )
}
