import { Download } from 'lucide-react';
import type { BuildData } from '../../engine/buildSchema';

interface Props {
  build: BuildData;
}

export default function SchematicDownload({ build }: Props) {
  const handleDownload = () => {
    const lines = [
      `# MineHelper Schematic`,
      `# Category: ${build.category}`,
      `# Description: ${build.description}`,
      `# Dimensions: ${build.dimensions.width}W x ${build.dimensions.height}H x ${build.dimensions.depth}D`,
      `# Seed: ${build.seed}`,
      ``,
      ...build.materials.map((m) => `${m.type} = ${m.count}`),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minehelper-${build.category}-${build.seed}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" className="btn btn-ghost" onClick={handleDownload}>
      <Download size={16} />
      Download Schematic
    </button>
  );
}
