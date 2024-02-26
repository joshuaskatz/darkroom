import { Image as I, ImageFileType } from './image';
import { Processing } from './processing';
import path from 'path';

const run = async () => {
  const image = new I();

  await image.initializeAsync(path.join(__dirname, './assets/init.jpg'));

  const proc = new Processing(image);

  await proc.invert();

  await image.write('invert', ImageFileType.JPG);

  await proc.whiteBalance();

  await image.write('wb', ImageFileType.JPG);
};

run().catch(console.error);
