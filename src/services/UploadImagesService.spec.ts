import UploadImagesService from './UploadImagesService';
import StorageS3 from '../utils/StorageS3';

jest.mock('../utils/StorageS3');

describe('UploadImagesService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should upload image file to S3', async () => {
    const file = { filename: 'example.jpg' };
    const uploadImagesService = new UploadImagesService();

    await uploadImagesService.execute(file);

    expect(StorageS3).toHaveBeenCalledTimes(1);
    expect(StorageS3.prototype.saveFile).toHaveBeenCalledWith(file.filename);
  });

  it('Should throw an error if upload fails', async () => {
    const file = { filename: 'example.jpg' };
    const errorMessage = 'Error uploading file';
    const uploadImagesService = new UploadImagesService();

    (StorageS3.prototype.saveFile as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(uploadImagesService.execute(file)).rejects.toThrow(errorMessage);
  });
});
