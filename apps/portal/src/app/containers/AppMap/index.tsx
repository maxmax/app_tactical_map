import React, { Suspense, useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import styled from 'styled-components';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { DoubleSide, RepeatWrapping, sRGBEncoding, Vector3, Color } from "three";
import {
  Loader,
  PerspectiveCamera,
  Shadow,
  Sky,
  Cloud,
  Plane,
  SpotLight
} from "@react-three/drei";

import { GroupBar } from '../../components/GroupBar';
import { MapsNavigation } from '../../components/MapsNavigation';
import DialogInfo from '../../components/DialogInfo';
import Box from './components/Box';
import CameraController from './components/CameraController';
import Terrain from './components/Terrain';

import {
  TerrainPlaneProps,
  TerrainObjectsProps,
  DialogInfoProps
} from '../../stores/scene-props';

import { AppMapProps, AppMapSceneProps } from "./props";


const StyledAppBase = styled.div`
  height: 100vh;
  width: 100vw;
  canvas {
    height: 100vh;
  }
`;

function AppMapScene(props: AppMapSceneProps) {

  const { pointLight, perspectiveCamera, objects, terrainFog }: any = props?.terrain;

  return (
    <>
      <DialogInfo />
      <Canvas shadows dpr={[1, 2]}>
        {/*<fog attach="fog" args={['lightpink', 60, 100]} />*/}
        {/*fog && fog?.color && <fogExp2 attach="fog" color={new Color(fog.color)} density={fog.density} />*/}
        {terrainFog && terrainFog?.color && <color attach="background" args={[terrainFog.color]} /> }

        <ambientLight />
        <directionalLight color="0xFFFFFF" intensity={2} position={[4, 2, 4]} />

        {/*<ambientLight />*/}
        {/*<pointLight position={pointLight ? pointLight : [10, -10, -10]} />*/}
        {/*<directionalLight color="0xFFFFFF" intensity={1} position={[-1, 2, 4]} />*/}
        {/*<directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}>
          <orthographicCamera attach="shadow-camera" left={-20} right={20} top={20} bottom={-20} />
        </directionalLight>*/}
        {/*<Sky sunPosition={new Vector3(100, 10, 100)} />*/}
        {terrainFog && terrainFog?.color && <fogExp2 attach="fog" color={new Color(terrainFog.color)} density={terrainFog.density} />}


        <PerspectiveCamera
          position={[0.5, 0.5, 0.5]}
          aspect={1}
          fov={40}
          near={0.1}
          far={5}
          { ...perspectiveCamera }
          makeDefault
        />

        <Suspense fallback={null}>
          <group>
            <Terrain { ...props?.terrain?.plane }/>
          </group>
        </Suspense>

        {/*<Plane args={[100, 100, 1, 9]} rotation-x={Math.PI / -2} position-y="-1">
        <Plane args={[100, 100, 1, 9]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
          <meshStandardMaterial color={planeColor} />
        </Plane>*/}

        {objects?.map((obj: TerrainObjectsProps) => {
          return (
            <>
              <Box
                args={obj?.args || [0.02, 0.02, 0.02]}
                position={obj?.position || [0.05, 0.01, 0.2]}
                color={obj?.color || 'green'}
                getDetail={props.getDetail}
                fog={true}
                {...obj}
              />
            </>
          );
        })}
        <CameraController />
      </Canvas>
      <Loader />
    </>
  );
}

const AppMap = inject('sceneStore')(observer((props: AppMapProps) => {

  const params = useParams();

  const {
    sceneStore
  } = props;

  const terrain = toJS(sceneStore?.terrain) || null;

  const getDetail = (props: DialogInfoProps) => {
    sceneStore?.getInfoDialog && sceneStore?.getInfoDialog(props);
  }

  useEffect(() => {
    sceneStore?.getTerrain && sceneStore.getTerrain(params.id || 0);
  }, [params]);

  return (
    <>
      <StyledAppBase>
        <GroupBar />
        <MapsNavigation />
        {terrain &&
          <>
            <AppMapScene
              terrain={terrain}
              // terrainNavigation={sceneStore?.terrainNavigationData()}
              getDetail={getDetail} />
          </>
        }
      </StyledAppBase>
    </>
  )
}));

export default AppMap;
