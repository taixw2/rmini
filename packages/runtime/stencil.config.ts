import { Config } from "@stencil/core";
import { postcss } from "@stencil/postcss";
import cssvariables from "postcss-css-variables";
import pxtorem from "postcss-pxtorem";
import hexrgba from "postcss-hexrgba";

export const config: Config = {
  namespace: "runtime",
  taskQueue: "async",
  plugins: [
    postcss({
      plugins: [
        cssvariables(),
        hexrgba(),
        pxtorem({
          rootValue: 100,
          exclude: /node_modules/i,
          propList: ["*"]
        })
      ]
    })
  ],
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null // disable service workers
    }
  ]
};
