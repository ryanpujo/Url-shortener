import mongoose, { Document } from 'mongoose';
import shortid from 'shortid';

export type UrlDocument = Document & {
  originalUrl: string;
  shortenedUrl: string;
  click: number;
};

const Url = new mongoose.Schema<UrlDocument>({
  originalUrl: { type: String, required: true },
  shortenedUrl: { type: String, required: true, default: shortid.generate },
  click: { type: Number, required: true, default: 0 },
});

export default mongoose.model<UrlDocument>('Url', Url);
