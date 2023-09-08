import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://birth.pleshco.deeplace.md',
  integrations: [tailwind()],
  compressHTML: true,
  outDir: "./web",
});