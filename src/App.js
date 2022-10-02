import { Fragment, Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './views/Scene'
import Scene1 from './views/Scene1'
import Start from './views/Start';
import Scene2 from './views/Scene2'
import ReactAudioPlayer from 'react-audio-player'
import Intro from './views/Intro'
import Outro from './views/Outro'

export default function App() {
  const [page, setPage] = useState(0);
  const [audio, setAudio] = useState({play: false, src: ''})
  const [level, setLevel] = useState({title: '', text: ''})
  const [hint, setHint] = useState({show: false, text: ''})

  const play = (src) => {
    setAudio({play: true, src})
  }

  const stop = () => {
    setAudio({play: false})
  }

  return (
    <Fragment>
      {page === 3 &&
        <Outro setPage={setPage} />
      }

      {page === 2 && 
        <Intro setPage={setPage} />
      } 


      {
      <ReactAudioPlayer
        src={`/assets/music.mp3`}
        autoPlay={true}
        loop
        // controls
        volume = {audio.play || page===2 || page===3? 0: 0.3}
        // volume = {audio.play && audio.src==='level3.mp3'? 0: 0.3}
        />
      }

      {audio.play &&
      <ReactAudioPlayer
        src={`/assets/${audio.src}`}
        autoPlay={true}
        // controls
        onEnded = {()=>setAudio({play: false})}
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

      {page === 1 && hint.show &&
      <div className='hint'>
        <p className='animate__animated animate__bounceIn'>{hint.text}</p>
      </div>}
      
      {page === 1 && 
      <Suspense fallback={null}>
        <Canvas shadows flat linear className='no-cursor'>
          <Scene2 
            play={play}   
            stop={stop} 
            setLevel={setLevel}  
            setPage={setPage}
            setHint={setHint}
          />
          <OrbitControls />
        </Canvas>
      </Suspense>
      }
    </Fragment>
  )
}
