import request from "supertest";
import { Response, Express } from "express";
import { createMock } from "ts-auto-mock";

import routes from "./index";

jest.mock("../services/UploadImagesService");
jest.mock("../services/DeleteImagesService");
jest.mock("../services/GetImageService");

describe("Route tests", () => {
  let app: Express;

  beforeAll(() => {
    app = createMock<Express>();
    app.use(routes);
  });

  it("Should make a POST request to upload an image", async () => {
    const res = await request(app)
      .post("/")
      .attach("image", "../tmp/nome_do_arquivo.jpg");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true });
  });

  it("Should make a DELETE request to delete an image", async () => {
    const filename = "nome_do_arquivo.jpg";
    const res = await request(app).delete(`/${filename}`);
    expect(res.status).toBe(200);
    expect(res.text).toBe("Arquivo excluído com sucesso!");
  });

  it("Should make a GET request to retrieve the signed URL of an image", async () => {
    const filename = "nome_do_arquivo.jpg";
    const res = await request(app).get(`/${filename}`);
    expect(res.status).toBe(200);
    expect(res.body.signedUrl).toBeDefined();
  });
});
