import DeleteImagesService from './DeleteImagesService';
import StorageS3 from '../utils/StorageS3';

jest.mock('../utils/StorageS3');

describe('DeleteImagesService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should delete image file from S3', async () => {
    const filename = 'example.jpg';
    const deleteImagesService = new DeleteImagesService();

    await deleteImagesService.execute(filename);

    expect(StorageS3).toHaveBeenCalledTimes(1);
    expect(StorageS3.prototype.deleteFile).toHaveBeenCalledWith(filename);
  });

  it('Should throw an error if deletion fails', async () => {
    const filename = 'example.jpg';
    const errorMessage = 'Error deleting file';
    const deleteImagesService = new DeleteImagesService();

    (StorageS3.prototype.deleteFile as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(deleteImagesService.execute(filename)).rejects.toThrow(errorMessage);
  });
});
