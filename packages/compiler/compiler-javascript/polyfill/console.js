import { invoke } from "./jsbridge";

export const console = {
  info(...msg) {
    invoke("console", false, "", ["info", ...msg]);
  },
  log(...msg) {
    invoke("console", false, "", msg);
  },
  error(...msg) {
    invoke("console", false, "", ["error", ...msg]);
  },
};
