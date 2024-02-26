import { Image } from '../image';
import cv from '@u4/opencv4nodejs';

export class Processing {
  image: Image;

  constructor(image: Image) {
    this.image = image;
  }

  async invert(): Promise<void> {
    try {
      const matFromBuffer = await cv.imdecodeAsync(this.image.buffer);
      const negatedBuffer = await cv.imencodeAsync(
        '.jpg',
        matFromBuffer.bitwiseNot(),
      );

      this.image.buffer = negatedBuffer;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async whiteBalance(): Promise<void> {
    try {
      const matFromBuffer = await cv.imdecodeAsync(this.image.buffer);

      const [r, g, b] = matFromBuffer.splitChannels();

      const eqR = r.equalizeHist();
      const eqG = g.equalizeHist();
      const eqB = b.equalizeHist();

      const eqMatFromBuffer = new cv.Mat([eqR, eqG, eqB]);

      const normalizedBuffer = await cv.imencodeAsync('.jpg', eqMatFromBuffer);

      this.image.buffer = normalizedBuffer;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
