export const lazyRouteImport = async (dir: string) => {
  const module = await import(/* @vite-ignore */ `../${dir}`);
  return { Component: module.default };
};
