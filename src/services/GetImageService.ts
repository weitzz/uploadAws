import StorageS3 from '../utils/StorageS3';

class GetImagesService {
   async execute(filename: string ): Promise<string> {
    const s3 = new StorageS3();

     return await s3.getObjectSignedUrl(filename);
  }
}

export default  GetImagesService;