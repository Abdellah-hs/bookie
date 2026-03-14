import { Schema, model, models } from "mongoose";
import { IBookSegment } from "../types";

const BookSegmentSchema = new Schema<IBookSegment>(
  {
    clerkId: { type: String, required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true, index: true },
    content: { type: String, required: true },
    segmentIndex: { type: Number, required: true, index: true },
    pageNumber: { type: Number, index: true },
    wordCount: { type: Number, required: true },
  },
  { timestamps: true }
);

BookSegmentSchema.index({ bookId: 1, segmentIndex: 1 }, { unique: true });
BookSegmentSchema.index({ bookId: 1, pageNumber: 1 });
// Note: Full-text index on content removed — indexing large content fields causes
// huge storage overhead and slow index builds. Use a dedicated search service
// (e.g., Algolia, Elasticsearch) if full-text search is needed in the future.

const BookSegment = models.BookSegment || model<IBookSegment>("BookSegment", BookSegmentSchema);

export default BookSegment;
