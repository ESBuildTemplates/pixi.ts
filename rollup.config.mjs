import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import html from '@rollup/plugin-html';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

const dev = process.env.ROLLUP_WATCH;

const htmlTemplate = ({ files, publicPath }) => {
  const scripts = files.js.map(({ fileName }) => `<script type="module" src="${publicPath}${fileName}"></script>`).join('\n');
  const styles = files.css.map(({ fileName }) => `<link rel="stylesheet" href="${publicPath}${fileName}">`).join('\n');

  return `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <title>Pixi v8 + Rollup</title>
        ${styles}
        <link rel="shortcut icon" href="https://rollupjs.org/favicon.png" type="image/x-icon" />
        ${scripts}
      </head>
      <body></body>
    </html>
  `
};

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
    postcss({
      extract: true,
      modules: false,
    }),
    html({
      template: htmlTemplate,
    }),
    copy({
      targets: [
        { src: 'public/*', dest: 'dist' }
      ]
    }),
    dev && serve({
      contentBase: 'dist',
      port: 5000,
      open: true
    }),
    dev && livereload('dist')
  ].filter(Boolean),
  watch: {
    include: 'src/**'
  }
}
