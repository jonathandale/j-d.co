import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
    file: 'public/app.js',
    format: 'iife',
    name: 'app',
    sourcemap: true
  },
	plugins: [
		resolve(),
		commonjs({
      namedExports: {
        'node_modules/animejs.js': ['anime']
      }
    }),
		babel({
      exclude: 'node_modules/**'
    }),
		production && uglify()
	]
};
