import React, { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { DoubleSide, RepeatWrapping, sRGBEncoding, Color } from "three";
import { TerrainPlaneProps } from '../../../../stores/scene-props';
import { vertexShader, fragmentShader } from "./shaders";

function Terrain({
  uluruHeightmap,
  uluruHeightmap2,
  texturemap,
  shaderMaterial
}: TerrainPlaneProps) {
  // Load the heightmap image
  // const heightMap = useTexture("/uluru-heightmap.png");
  const heightMap = useTexture(uluruHeightmap);
  // Apply some properties to ensure it renders correctly
  heightMap.encoding = sRGBEncoding;
  heightMap.wrapS = RepeatWrapping;
  heightMap.wrapT = RepeatWrapping;
  heightMap.anisotropy = 16;

  // Load the texture map
  // const textureMap = useTexture("/texturemap1024.png");
  const textureMap = useTexture(texturemap);
  // Apply some properties to ensure it renders correctly
  //textureMap.encoding = sRGBEncoding;
  textureMap.wrapS = RepeatWrapping;
  textureMap.wrapT = RepeatWrapping;
  textureMap.anisotropy = 16;

  // const fogColor = new Color('black');
  // const mesh2Ref = useRef();

  // console.log('mesh2Ref_______', mesh2Ref);

  // useEffect(() => {
    // menuStore?.menu?.length
    // menuStore?.getMenu && menuStore.getMenu();
    // console.log('mesh2Ref_______', mesh2Ref);
    // if (mesh2Ref?.current) {
      // console.log('mesh2Ref______11_', mesh2Ref?.current);
      // mesh2Ref.current?.material?.onBeforeCompile = (shader: any) => {
      //  console.log('kkkkkk!');
      // };
      // mesh2Ref?.current?.fog = true;
    // }
  // }, [mesh2Ref]);

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[1 / 1024, 1 / 1024, 1 / 1024]}
      // ref={mesh2Ref}
    >
      <planeBufferGeometry args={[1024, 1024, 256, 256]} />
      {/*<boxGeometry args={[1024, 1024, 10]} />*/}
      <shaderMaterial
        uniforms={{
          // Feed the heightmap
          bumpTexture: { value: heightMap },
          // Feed the scaling constant for the heightmap
          // bumpScale: { value: 50 },
          bumpScale: { value: shaderMaterial.bumpScale.value },
          // Feed the texture map
          terrainTexture: { value: textureMap },
          //fogColor:    { value: fogColor },
          //fogNear:     { value: 200 },
          //fogFar:      { value: 400 },
          // fog: true,
          // ...shaderMaterial
        }}
        // Feed the shaders as strings
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        // side={DoubleSide}
        // fog={true}
        // ref={mesh2Ref}
        opacity={0.1}
        transparent={true}
      />
    </mesh>
  );
}

export default Terrain;
