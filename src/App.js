import { Fragment, Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './views/Scene'
import Scene1 from './views/Scene1'
import Start from './views/Start';
import Scene2 from './views/Scene2'
import ReactAudioPlayer from 'react-audio-player'
import Over from './views/Over'

export default function App() {
  const [page, setPage] = useState(0);
  const [audio, setAudio] = useState({play: false, src: ''})
  const [level, setLevel] = useState({title: '', text: ''})

  const play = (src) => {
    setAudio({play: true, src})
  }

  const stop = () => {
    setAudio({play: false})
  }

  return (
    <Fragment>
      {page === 2 && 
        <Over />
      } 


      {audio.play &&
        <ReactAudioPlayer
      src={`/assets/${audio.src}.mp3`}
      autoPlay={true}
      // controls
      />
    }
      {page === 0 && <canvas id="stars"></canvas>}
      {page === 0 && <Start setPage={setPage} />}
      {page === 1 &&
      <div className='level'>
        <h1>{level.title}</h1>
        {level.text &&
        <p className='animate__animated animate__bounceIn'>{level.text}</p>
        }
      </div>}
      {page === 1 && 
      <Suspense fallback={null}>
        <Canvas shadows flat linear className='no-cursor'>
          <Scene2 
            play={play}   
            stop={stop} 
            setLevel={setLevel}  
            setPage={setPage}
          />
          <OrbitControls />
        </Canvas>
      </Suspense>
      }
    </Fragment>
  )
}
