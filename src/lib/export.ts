import {PDFDocument} from 'pdf-lib';

export async function saveWithSignature(pdfOriginal: ArrayBuffer, signatureUrl: string, x: number, y: number, w: number, h: number) {
	const doc = await PDFDocument.load(pdfOriginal);
	const page = doc.getPage(0);
	const signature = await doc.embedPng(signatureUrl);
	
	page.drawImage(signature, {
		x,
		y,
		width: w,
		height: h,
	});

	return doc.saveAsBase64({ dataUri: true });
}
