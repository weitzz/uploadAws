import StorageS3 from '../utils/StorageS3';

class UploadImagesService {
  async execute(file: Express.Multer.File | any): Promise<void> {
    const s3 = new StorageS3();

    await s3.saveFile(file.filename);
  }
}

export default UploadImagesService;