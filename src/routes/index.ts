import { Router, Request, Response } from 'express';
import multer from 'multer';
import UploadImagesService from '../services/UploadImagesService';
import DeleteImagesService from '../services/DeleteImagesService';
import GetImagesService from '../services/GetImageService';
import uploadConfig from '../config/upload';


const routes = Router();
const upload = multer(uploadConfig);


routes.post('/', upload.single('image'), async (request: Request, response: Response) => {
  try {
    const { file } = request;
    const uploadImagesService = new UploadImagesService();
    await uploadImagesService.execute(file);
    
    return response.json({ success: true });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});

routes.delete('/:filename', async (request: Request, response: Response) => {
  try {
    const { filename } = request.params;
    const deleteImagesService = new DeleteImagesService();
    await deleteImagesService.execute(filename);
   return response.status(200).send('Arquivo excluído com sucesso!');
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});



routes.get('/:filename', async (request: Request, response: Response) => {
  try {
    const { filename } = request.params;
    const getImagesService = new GetImagesService();
    const signedUrl = await getImagesService.execute(filename);
    return response.status(200).json({ signedUrl });
  } catch (error) {
    console.error(error);
    response.status(500).send('Erro ao obter a URL assinada.');
  }
});


export default routes;
