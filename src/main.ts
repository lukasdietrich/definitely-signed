import {GlobalWorkerOptions} from 'pdfjs-dist';
import 'virtual:windi.css';
import App from 'src/App.svelte';

const pdfjsWorkerUrl = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url);
GlobalWorkerOptions.workerSrc = String(pdfjsWorkerUrl);

const app = new App({
  target: document.getElementById('app')
});

export default app;
