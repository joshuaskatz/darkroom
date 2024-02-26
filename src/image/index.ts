import sharp from 'sharp';

export enum ImageFileType {
  BMP = 'bmp',
  GIF = 'gif',
  JPEG = 'jpeg',
  JPG = 'jpg',
  PNG = 'png',
  TIFF = 'tiff',
  TIF = 'tif',
  WEBP = 'webp',
  SVG = 'svg',
}

export class Image {
  original_buffer: Buffer;
  buffer!: Buffer;
  info!: sharp.OutputInfo;
  filename!: string;

  constructor() {}

  async initializeAsync(filename: string): Promise<void> {
    this.filename = filename;

    await this.read();
  }

  async read(): Promise<void> {
    try {
      const { info, data } = await sharp(this.filename).toBuffer({
        resolveWithObject: true,
      });

      this.info = info;
      this.original_buffer = data;
      this.buffer = data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async write(newFilename: string, newFileType: ImageFileType): Promise<void> {
    try {
      await sharp(this.buffer).toFile(`${newFilename}.${newFileType}`);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
