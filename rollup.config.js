import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

const child_process = require('child_process');
const production = !process.env.ROLLUP_WATCH;

function getSha(){
	return child_process.execSync('git rev-parse HEAD').toString().trim();
}

export default {
	input: 'src/main.js',
	output: {
    file: 'public/app.js',
    format: 'iife',
    name: 'app',
    sourcemap: true
  },
	plugins: [
		replace({
		  delimiters: ['<@', '@>'],
		  GIT_SHA: getSha()
		}),
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
