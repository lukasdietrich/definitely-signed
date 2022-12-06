export interface Position {
	x: number;
	y: number;
}

export interface Size {
	w: number;
	h: number;
}

export type Dimensions = Position & Size;

export type Base64DataUrl = string;

export interface State {
	// 1. Upload Signature
	signatureOriginal?: ImageBitmap;

	// 2. Crop Signature
	signatureCropped?: ImageBitmap;

	// 3. Clean Signature
	signatureCleaned?: Base64DataUrl;

	// 4. Upload Document
	documentOriginal?: ArrayBuffer;
}
