import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = {
  storage: diskStorage({
    destination: './uploads', // Specify the folder where the uploaded files will be saved
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
