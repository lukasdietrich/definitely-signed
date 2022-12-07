import {fileURLToPath, URL} from 'url';
import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';
import windicss from 'vite-plugin-windicss';

export default defineConfig({
	resolve: {
		alias: {
			src: fileURLToPath(new URL('./src', import.meta.url)),
		},
	},

	plugins: [
		svelte(),
		windicss({
			config: {
				theme: {
					cursor: {
						'move': 'move',
						'resize': 'se-resize',
						'pointer': 'pointer',
					},
				},
			},
		}),
	],
});
