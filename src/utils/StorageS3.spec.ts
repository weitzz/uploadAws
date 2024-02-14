import fs from 'fs';
import mime from 'mime';
import path from 'path';
import { mocked } from 'ts-jest/utils';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import StorageS3 from './StorageS3';

jest.mock('fs');
jest.mock('mime');
jest.mock('@aws-sdk/client-s3');
jest.mock('@aws-sdk/s3-request-presigner');

describe('StorageS3', () => {
  const bucketName = 'test-bucket';
  const filename = 'example.jpg';
  const originalPath = '/path/to/example.jpg';
  const fileContent = Buffer.from('file content');

  beforeEach(() => {
    mocked(fs.promises.readFile).mockResolvedValue(fileContent);
    mocked(mime.getType).mockReturnValue('image/jpeg');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('saveFile', () => {
    it('should save file to S3', async () => {
      const s3Client = new S3Client({});
      const storageS3 = new StorageS3();
      const putObjectCommandMock = jest.fn();

      mocked(S3Client).mockImplementation(() => ({
        send: putObjectCommandMock,
      }));

      await storageS3.saveFile(filename);

      expect(putObjectCommandMock).toHaveBeenCalledWith(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: filename,
          ACL: 'public-read',
          Body: fileContent,
          ContentType: 'image/jpeg',
        })
      );
    });
  });

  describe('deleteFile', () => {
    it('should delete file from S3', async () => {
      const s3Client = new S3Client({});
      const storageS3 = new StorageS3();
      const deleteObjectCommandMock = jest.fn();

      mocked(S3Client).mockImplementation(() => ({
        send: deleteObjectCommandMock,
      }));

      await storageS3.deleteFile(filename);

      expect(deleteObjectCommandMock).toHaveBeenCalledWith(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: filename,
        })
      );
    });
  });

  describe('getObjectSignedUrl', () => {
    it('should get signed URL for file from S3', async () => {
      const s3Client = new S3Client({});
      const storageS3 = new StorageS3();
      const getObjectCommandMock = jest.fn().mockResolvedValue('signed-url');

      mocked(getSignedUrl).mockResolvedValue('signed-url');

      const signedUrl = await storageS3.getObjectSignedUrl(filename);

      expect(signedUrl).toBe('signed-url');
      expect(getSignedUrl).toHaveBeenCalledWith(s3Client, expect.any(GetObjectCommand), { expiresIn: 3600 });
    });
  });
});
