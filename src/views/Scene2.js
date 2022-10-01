import useSpline from '@splinetool/r3f-spline'
import { PerspectiveCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import { useEffect, useRef, useMemo, useState } from "react";
import { usePersonControls } from './hooks/useKeyboardControls';
import { useForwardRaycast } from './hooks/useForwardRaycast';
import { useBox } from '@react-three/cannon';
import { Object3D, Raycaster, Vector3 } from 'three'

export default function Scene2({ ...props }) { 
  const { nodes, materials } = useSpline('https://prod.spline.design/iT1Og4mFFO46DKz5/scene.splinecode')

  const theMap = useRef()
  const speed = useRef(20)
  const levelUp = useRef(1)
  const thePlayer = useRef()
  const wallRight = useRef()
  const wallLeft = useRef()
  const astroids = useRef([])
  const collusion = useRef(false)
  const playerBody = useRef()

  const level1 =
         [[7900, 44, 0],
          [7900, 44, -800],
          [7900, 44, 800],
          [7900, 44, 1600],
          [6500, 44, 0],
          [6500, 44, -800],
          [6500, 44, 800],
          [6500, 44, 1600],

          [5500, 44, 0],
          [5500, 44, -800],
          [5500, 44, 800],
          [5500, 44, 1600],
          [4500, 44, 0],
          [4500, 44, -800],
          [4500, 44, 800],
          [4500, 44, 1600],

          [2500, 44, 0],
          [2500, 44, -800],
          [2500, 44, 800],
          [2500, 44, 1600],
          [500, 44, 0],
          [500, 44, -800],
          [500, 44, 800],
          [500, 44, 1600]
          ]
    
    const level2 =
         [[8500, 44, 0],
         [7900, 44, -1000],
         [7900, 44, 1000],
         [8500, 44, 2000],
         [7000, 44, 0],
         [7000, 44, -1000],
         [6500, 44, 1000],
         [7000, 44, 2000],

         [5500, 44, 0],
         [4000, 44, -1000],
         [4000, 44, 1000],
         [5500, 44, 2000],
         [2500, 44, 0],
         [2500, 44, -1000],
         [4500, 44, 1000],
         [2500, 44, 2000],

         [500, 44, 0],
         [2000, 44, -1000],
         [2000, 44, 1000],
         [2500, 44, 2000],
         [2000, 44, 0],
         [2000, 44, -1000],
         [3500, 44, 1000],
         [2000, 44, 2000]
          ]


    const level3 =
         [[8500, 44, 0],
         [7900, 44, -1000],
         [7900, 44, 1000],
         [8500, 44, 2000],
         [7000, 44, 0],
         [7000, 44, -1000],
         [6500, 44, 1000],
         [7000, 44, 2000],


         [6500, 44, 400],
         [5500, 44, -1400],
         [5500, 44, 1400],
         [6500, 44, 2400],
         [3500, 44, 0],
         [4500, 44, -1000],
         [4500, 44, -400],
         [4500, 44, 200],
         [4500, 44, 2400],
         [3500, 44, 1400],
         [3500, 44, 2400],

         [2500, 44, 400],
         [1500, 44, -1400],
         [1500, 44, 1400],
         [2500, 44, 2400],
         [500, 44, 0],
         [1500, 44, -1000],
         [1500, 44, -400],
         [1500, 44, 200],
         [1500, 44, 2400],
         [500, 44, 1400],
         [500, 44, 2400]
          ]
      

          const level4 =
          [[8500, 44, 0],
          [7900, 44, -1000],
          [7900, 44, 1000],
          [8500, 44, 2000],
          [7000, 44, 0],
          [7000, 44, -1000],
          [6500, 44, 1000],
          [7000, 44, 2000],
 
 
          [6500, 44, 400],
          [5500, 44, -1400],
          [5500, 44, 1400],
          [6500, 44, 2400],
          [3500, 44, 0],
          [4500, 44, -1000],
          [4500, 44, -400],
          [4500, 44, 200],
          [4500, 44, 2400],
          [3500, 44, 1400],
          [3500, 44, 2400],


          [2500, 44, 0],
          [1600, 44, -1000],
          [1600, 44, 1000],
          [2500, 44, 2000],
          [1000, 44, 0],
          [1000, 44, -1000],
          [500, 44, 1000],
          [1000, 44, 2000],


          [0, 44, 0],
          [-1000, 44, -1000],
          [-1000, 44, 1000],
          [0, 44, 2000],
          [-2000, 44, 0],
          [-2000, 44, -1000],
          [-1500, 44, 1000],
          [-2000, 44, 2000],


          [-1500, 44, 0],
          [-3000, 44, -1000],
          [-3000, 44, 1000],
          [0, 44, 2000],
          [-5000, 44, 0],
          [-5000, 44, -1000],
          [-300, 44, 1000],
          [-4000, 44, 2000],


          
           ]

          
           const level5 =
           [[8500, 44, 0],
           [7900, 44, -1000],
           [7900, 44, 1000],
           [8500, 44, 2000],
           [7000, 44, 0],
           [7000, 44, -1000],
           [6500, 44, 1000],
           [7000, 44, 2000],
  
  
           [6500, 44, 400],
           [5500, 44, -1400],
           [5500, 44, 1400],
           [6500, 44, 2400],
           [3500, 44, 0],
           [4500, 44, -1000],
           [4500, 44, -400],
           [4500, 44, 200],
           [4500, 44, 2400],
           [3500, 44, 1400],
           [3500, 44, 2400],
 
 
           [2500, 44, 0],
           [1600, 44, -1000],
           [1600, 44, 1000],
           [2500, 44, 2000],
           [1000, 44, 0],
           [1000, 44, -1000],
           [500, 44, 1000],
           [1000, 44, 2000],


           [1500, 44, -400],
           [600, 44, -1400],
           [600, 44, 600],
           [1500, 44, 1400],
           [0, 44, 0],
           [0, 44, -1000],
           [-500, 44, 1000],
           [0, 44, 2000],
            ]
       


  const [positions, setPositions] = useState(level1)  
  const [maxLevelPos, setmaxLevelPos] = useState(-2000) ;
  // const raycast = useForwardRaycast(thePlayer)
  const { left, right, jump } = usePersonControls()
  useEffect(()=>{
    props.play('level1')
    props.setLevel({title: 'Level 1', text: "This is it, we are at the eighth revolution around the sun, not much left until we make it to the sun's atmosphere"})
  }, [])

  useFrame(() => {
    // this use frame does the satelite movment
    // if(wallRight.current.position.z < thePlayer.current.position.z && thePlayer.current.position.z < wallRight.current.position.z)
    thePlayer.current.position.z+= speed.current*(Number(left) - Number(right))
    playerBody.current.rotation.z += (Math.PI / 100) * Number(right);
    playerBody.current.rotation.z -= (Math.PI / 100) * Number(left);
    // thePlayer.current.position.x+= 100 * Number(jump);
    if(jump){
      thePlayer.current.position.x = 12000
    }

    positions.forEach(elm=>{
        if((thePlayer.current.position.x >= elm[0] -300) 
        &&(thePlayer.current.position.x <= elm[0] +500) 
        && (elm[2] + -300<= thePlayer.current.position.z) 
        &&(thePlayer.current.position.z <= elm[2] +150) 
        && !collusion.current ){
            console.log('***** astroid collusion ********');
            collusion.current = true
            setPositions(positions)
            thePlayer.current.position.x = 12000
            theMap.current.position.x = -10260.21;
            collusion.current = false;

        }
    })
    
    if(thePlayer.current.position.x<maxLevelPos){
      levelUp.current++;
      if(levelUp.current===2){
        setPositions(level2)
        speed.current = 30
        props.setLevel({title: 'Level 2'})
      } 
      if(levelUp.current===3) {
        setPositions(level3)
        setmaxLevelPos(-5000)
        speed.current = 35
        props.play('level2')
        props.setLevel({title: 'Level 3', text: 'We are within the range of gravity of Venus! This shall strengthen the space Craft momentum'})
      }
      if(levelUp.current===4){
        setPositions(level4)
        setmaxLevelPos(-7000)
        speed.current = 45
        // props.play('level4')
        props.setLevel({title: 'Level 4'})
      } 
      if(levelUp.current===5){
        setPositions(level5)
        setmaxLevelPos(-2000)
        speed.current = 50
        props.play('level3')
        props.setLevel({title: 'Level 5', text: 'We are really close to the corona now, but the solar wind and storms may affect the probe!'})
      }
      // if(levelUp===2) setPositions(level2)
      thePlayer.current.position.x = 12000
      theMap.current.position.x = -10260.21;
      
    } 
  })


  
  useFrame(() => {
    if(!collusion.current) thePlayer.current.position.x -= speed.current;
    if(!collusion.current) theMap.current.position.x += speed.current;

  })
  return (
    <>
        <color attach="background" args={['#696771']} />
        <group {...props} dispose={null}>
            <group ref={theMap} name="Group" position={[-10260.21, 79.69, 61]}>

            <group ref={thePlayer} name="player" position={[12000, 44, -16]} rotation={[-Math.PI / 2, 0, 1.59]}>
                <mesh
                    ref={playerBody}
                    name="Cylinder003"
                    geometry={nodes.Cylinder003.geometry}
                    material={nodes.Cylinder003.material}
                    castShadow
                    receiveShadow
                    position={[-117.67, 200.14, -20.17]}
                    rotation={[-1.49, 0.01, 1.56]}
                    scale={[102.54, 110.33, 100.26]}
                />
            </group>
            
            {positions.map((pos, index) => 
            <group
                key={index}
                // ref={astroidBody}
                ref = {(element)=>astroids.current.push(element)}
                name="asteroid"
                position={pos}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[1.16, 1.2, 1.16]}
            >
                <mesh
                name="Sphere7"
                geometry={nodes.Sphere7.geometry}
                material={nodes.Sphere7.material}
                castShadow
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
                />
            </group>
            )}

          <mesh
            name="ending"
            geometry={nodes.ending.geometry}
            material={materials['ending Material']}
            castShadow
            receiveShadow
            position={[-20010.79, -45.69, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={[49.67, 1, 1]}
          />
          <mesh
            ref = {wallRight}
            name="right wall"
            geometry={nodes['right wall'].geometry}
            material={materials['ending Material']}
            position={[372.02, -19.73, -1150]}
            scale={[200, 1, 1]}
          />
          <mesh
            ref = {wallLeft}
            name="left wall"
            geometry={nodes['left wall'].geometry}
            material={materials['ending Material']}
            position={[460.21, 0, 1900]}
            scale={[200, 1, 1]}
          />
          <mesh
            name="floor"
            geometry={nodes.floor.geometry}
            material={materials['floor Material']}
            castShadow
            receiveShadow
            position={[0, -95.69, -27.82]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={[3.06, 20, 5]}
          />
        </group>
        <PerspectiveCamera
          name="Camera"
          makeDefault={true}
          far={200000}
          near={5}
          fov={45}
          position={[5000.15, 2200, -32.01]}
          rotation={[-1.59, 1, 1.6]}
        />
        <directionalLight
          name="Directional Light"
          castShadow
          intensity={0.7}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={-10000}
          shadow-camera-far={100000}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={500}
          shadow-camera-bottom={-500}
          position={[-138.67, 648.65, 183.29]}
        />
        <mesh
          name="Sphere8"
          geometry={nodes.Sphere8.geometry}
          material={materials['Sphere8 Material']}
          castShadow
          receiveShadow
          position={[0, -101, -49]}
          rotation={[0, 0, Math.PI]}
        />
        <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#d4d4d4" position={[0, 1, 0]} />
      </group>
    </>
  )
}

