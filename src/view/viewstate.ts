export interface Dimensions {
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface State {
	// 1. Upload Signature
	signatureBitmapOriginal?: ImageBitmap;

	// 2. Crop Signature
	signatureDimensionsCropped?: Dimensions;
	signatureBitmapCropped?: ImageBitmap;

	// 3. Clean Signature
	signatureBitmapCleaned?: string;

	// 4. Upload Document
	documentOriginal?: ArrayBuffer;
}
