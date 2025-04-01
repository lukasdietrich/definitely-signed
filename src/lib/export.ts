import type { Dimensions } from 'src/lib/types';
import { PDFDocument } from 'pdf-lib';

export async function saveWithSignature(pdfOriginal: ArrayBuffer, signatureUrl: string, pageNumber: number, dimension: Dimensions) {
	const doc = await PDFDocument.load(pdfOriginal, { ignoreEncryption: true });
	const page = doc.getPage(pageNumber - 1);
	const signature = await doc.embedPng(signatureUrl);

	const { x, y, w, h } = dimension;
	page.drawImage(signature, {
		x,
		y,
		width: w,
		height: h,
	});

	return doc.saveAsBase64({ dataUri: true });
}
