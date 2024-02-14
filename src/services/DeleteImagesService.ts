import StorageS3 from "../utils/StorageS3";

class DeleteImagesService {
  async execute(filename: string): Promise<void> {
    const s3 = new StorageS3();

    await s3.deleteFile(filename);
  }
}

export default DeleteImagesService;
