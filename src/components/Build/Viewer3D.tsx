import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { BuildData } from '../../engine/buildSchema';
import { getBlockColor } from '../../engine/materialCounter';
import { useMemo } from 'react';
import * as THREE from 'three';

interface Props {
  build: BuildData;
}

/** Merges same-color blocks into a single instanced mesh for performance. */
function VoxelMeshGroup({ build }: { build: BuildData }) {
  const colorGroups = useMemo(() => {
    const groups = new Map<string, { x: number; y: number; z: number }[]>();
    for (const block of build.blocks) {
      const color = getBlockColor(block.type);
      const arr = groups.get(color) ?? [];
      arr.push({ x: block.x, y: block.y, z: block.z });
      groups.set(color, arr);
    }
    return groups;
  }, [build]);

  return (
    <>
      {Array.from(colorGroups.entries()).map(([color, positions]) => (
        <InstancedBlocks key={color} color={color} positions={positions} />
      ))}
    </>
  );
}

const BOX_GEO = new THREE.BoxGeometry(1, 1, 1);

function InstancedBlocks({
  color,
  positions,
}: {
  color: string;
  positions: { x: number; y: number; z: number }[];
}) {
  const mesh = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({ color });
    const inst = new THREE.InstancedMesh(BOX_GEO, mat, positions.length);
    const dummy = new THREE.Object3D();
    positions.forEach(({ x, y, z }, i) => {
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });
    inst.instanceMatrix.needsUpdate = true;
    return inst;
  }, [color, positions]);

  return <primitive object={mesh} />;
}

export default function Viewer3D({ build }: Props) {
  const cx = build.dimensions.width / 2;
  const cy = build.dimensions.height / 2;
  const cz = build.dimensions.depth / 2;
  const cam = Math.max(build.dimensions.width, build.dimensions.height, build.dimensions.depth) * 1.6;

  return (
    <Canvas
      camera={{ position: [cx + cam * 0.6, cy + cam * 0.5, cz + cam * 0.6], fov: 45 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[20, 40, 20]} intensity={1.2} />
      <VoxelMeshGroup build={build} />
      <OrbitControls target={[cx, cy, cz]} />
    </Canvas>
  );
}
