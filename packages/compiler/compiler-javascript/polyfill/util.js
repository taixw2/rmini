export const noop = () => void 0;

export const createSessionId = () => Math.random().toString()

export const callHook = (target, hook, context, ...args) => {
  return Reflect.get(target || {}, hook)?.apply?.(context, args);
};

