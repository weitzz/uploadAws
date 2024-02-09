// https://api-vendas-uploads.s3.sa-east-1.amazonaws.com/e41a4a1e34019fd05c23-61taotfMcJL._AC_SL1200_.jpg
import StorageS3 from '../utils/StorageS3';

class GetImagesService {
   async execute(filename: string ): Promise<string> {
    const s3 = new StorageS3();

     return await s3.getObjectSignedUrl(filename);
  }
}

export default  GetImagesService;