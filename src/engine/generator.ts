/*

Pass build data to the generator, which will then generate the structure.

*/
import type {
  BuildData,
  GenerateBuildRequest,
} from './buildSchema';
import { postApi } from './apiGen';

async function generateBuild(
  buildData: GenerateBuildRequest,
): Promise<BuildData> {
  return postApi<BuildData>('/generate', buildData);
}

export { generateBuild };
