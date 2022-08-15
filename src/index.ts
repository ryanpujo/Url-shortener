import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose, { CallbackError } from 'mongoose';
import Url, { UrlDocument } from './models/Url';
import bodyParser from 'body-parser';
dotenv.config();
const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const port: number = Number(process.env.PORT) || 5000;
const connect = async () => {
  await mongoose.connect(`${process.env.MONGODB_URL}`);
};
app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});
app.get('/:short', async (req: Request, res: Response) => {
  const url = await Url.findOne({ shortenedUrl: req.params.short });
  if (url == null) {
    return res.status(404).send('url not found');
  }
  res.redirect(url.originalUrl);
});
app.post('/', (req: Request, res: Response, next: NextFunction) => {
  const newUrl = new Url(req.body);
  newUrl.save((err: CallbackError, url: UrlDocument) => {
    if (err) return next(err);
    res.json(url);
  });
});
app.listen(port, () => {
  connect();
  console.log('server is running');
});
