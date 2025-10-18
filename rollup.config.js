import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import esbuild from "rollup-plugin-esbuild";
import image from "@rollup/plugin-image";
import path from "path";

export default {
  input: {
    index: "src/index.ts",
    primitives: "src/components/ui/index.ts",
    components: "src/components/design-system/index.ts",
    icons: "src/assets/icons/index.ts",
    styles: "src/index.css",
  },
  output: [
    {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
      entryFileNames: "[name].js",
      assetFileNames: "assets/[name][extname]",
    },
    {
      dir: "dist",
      format: "esm",
      sourcemap: true,
      entryFileNames: "[name].esm.js",
      assetFileNames: "assets/[name][extname]",
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: [".mjs", ".js", ".json", ".node", ".ts", ".tsx"],
    }),
    commonjs(),
    postcss({
      extract: true,
      use: ["sass"],
      minimize: true,
      sourceMap: true,
      inject: false,
      config: {
        path: "./postcss.config.cjs",
      },
      include: /\.css$/,
    }),
    image(),
    esbuild({
      include: /\.[jt]sx?$/, // include .ts and .tsx
      exclude: /node_modules/,
      sourceMap: true,
      minify: false,
      target: "esnext",
      jsx: "transform", // enables JSX transform
      tsconfig: "tsconfig.json",
    }),
  ],
};
