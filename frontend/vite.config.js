import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import htmlPurge from 'vite-plugin-purgecss';

export default defineConfig({
	// https://vitejs.dev/config/
	plugins: [sveltekit({}), htmlPurge({})],
	server: {
		open: false,
		port: 3001,
		host: true
	},
	build: {}

	// assetsInclude: 'static/**'
});
