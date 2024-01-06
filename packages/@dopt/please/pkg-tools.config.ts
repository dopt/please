import { config, build } from "@pkg-tools/pkg-tools";

export default config.definePkgToolsConfig({
  build: build.config.node({}),
});
