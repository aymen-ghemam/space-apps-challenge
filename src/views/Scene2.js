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
  const speed = useRef(5)
  const thePlayer = useRef()
  const astroids = useRef([])
  const collusion = useRef(false)

  const [positions, setPositions] = useState([
    [7900, 44, 0],
    [7900, 44, 600],
    [7900, 44, -600],
  ])  

  // const raycast = useForwardRaycast(thePlayer)
  const { left, right, jump } = usePersonControls()


  useFrame(() => {
    // this use frame does the satelite movment
    thePlayer.current.position.z+= 10*(Number(right) - Number(left))
    // thePlayer.current.position.x+= 100 * Number(jump);
    if(jump){
      thePlayer.current.position.x = 12000
    }

    positions.forEach(elm=>{
        if((thePlayer.current.position.x >= elm[0] -300) 
        &&(thePlayer.current.position.x <= elm[0] +600) 
        && (elm[2] + -500<= thePlayer.current.position.z) 
        &&(thePlayer.current.position.z <= elm[2] +250) 
        && !collusion.current ){
            console.log('***** astroid collusion ********');
            collusion.current = true
        }
    })

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
            position={[-9010.79, -45.69, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={[49.67, 1, 1]}
          />
          <mesh
            name="right wall"
            geometry={nodes['right wall'].geometry}
            material={materials['right wall Material']}
            position={[372.02, -19.73, -1730.39]}
            scale={[200, 1, 1]}
          />
          <mesh
            name="left wall"
            geometry={nodes['left wall'].geometry}
            material={materials['left wall Material']}
            position={[460.21, 0, 1526.91]}
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
          position={[2640.15, 1955.11, -32.01]}
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
