import React, { useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { DoubleSide, RepeatWrapping, sRGBEncoding } from "three";
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

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[1 / 1024, 1 / 1024, 1 / 1024]}
    >
      <planeBufferGeometry args={[1024, 1024, 256, 256]} />
      <shaderMaterial
        uniforms={{
          // Feed the heightmap
          bumpTexture: { value: heightMap },
          // Feed the scaling constant for the heightmap
          // bumpScale: { value: 50 },
          bumpScale: { value: shaderMaterial.bumpScale.value },
          // Feed the texture map
          terrainTexture: { value: textureMap },
          // fog: true,
          // ...shaderMaterial
        }}
        // Feed the shaders as strings
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={DoubleSide}
        transparent
        //fog={true}
      />
    </mesh>
  );
}

export default Terrain;
