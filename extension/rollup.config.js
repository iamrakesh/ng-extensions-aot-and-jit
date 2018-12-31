import globalModules from '../platform/system.modules.json';

export default {
  input: './dist/aot/src/sample-ext.module.ngfactory.js',
  output: {
    file: './dist/bundle/sample-ext.module.umd.js',
    format: 'umd',
    globals: globalModules,
    name: 'SampleExtModule',
  },
  external: Object.keys(globalModules),
};
