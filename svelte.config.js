import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const prod = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false
		}),

		paths: {
			base: prod ? '/mario-games' : ''
		},

		appDir: 'internal',
		prerender: {
			// This can be false if you're using a fallback (i.e. SPA mode)
			default: true
		}
	}
};

export default config;
