import path from 'path';
import fs from 'fs';
import mime from 'mime';
import { S3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import uploadConfig from '../config/upload';

class StorageS3 {
  private readonly client: S3Client;
  private readonly bucketName: string;

  constructor() {
    this.client = new S3Client({ region: 'sa-east-1' });
    this.bucketName = 'api-vendas-uploads';
    
  }

  async saveFile(filename: string): Promise<void> {
    const originalPath = path.resolve(uploadConfig.directory, filename);
    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    const uploadParams:PutObjectCommandInput  = {
      Bucket: this.bucketName,
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: contentType,
    };

    await this.client.send(new PutObjectCommand(uploadParams));
  }

  async deleteFile(filename: string): Promise<void> {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: filename,
    };

    await this.client.send(new DeleteObjectCommand(deleteParams));
  }

  async getObjectSignedUrl(filename: string): Promise<string> {
    const expiresT = 3600 ;
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
    });

    const signedUrl = await getSignedUrl(this.client, command, { expiresIn: expiresT });
    console.log("URL assinada para o arquivo:", signedUrl);
    return signedUrl;
  }

  
}

export default StorageS3;
