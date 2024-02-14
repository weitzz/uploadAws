import GetImagesService from './GetImageService';
import StorageS3 from '../utils/StorageS3';

jest.mock('../utils/StorageS3');

describe('GetImagesService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return signed URL for image file from S3', async () => {
    const filename = 'example.jpg';
    const signedUrl = 'https://example.com/signed-url';
    const getImagesService = new GetImagesService();

    (StorageS3.prototype.getObjectSignedUrl as jest.Mock).mockResolvedValue(signedUrl);

    const result = await getImagesService.execute(filename);

    expect(StorageS3).toHaveBeenCalledTimes(1);
    expect(StorageS3.prototype.getObjectSignedUrl).toHaveBeenCalledWith(filename);
    expect(result).toBe(signedUrl);
  });

  it('Should throw an error if signed URL cannot be retrieved', async () => {
    const filename = 'example.jpg';
    const errorMessage = 'Error retrieving signed URL';
    const getImagesService = new GetImagesService();

    (StorageS3.prototype.getObjectSignedUrl as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getImagesService.execute(filename)).rejects.toThrow(errorMessage);
  });
});
