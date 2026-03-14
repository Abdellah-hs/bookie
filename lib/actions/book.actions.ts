'use server';

import Book from "@/database/book.model";
import { CreateBook } from "@/types";
import { connectToDatabase } from "@/database/mongoose";
import { generateSlug, serializeData } from "../utils";
import { TextSegment } from "@/types";
import BookSegment from "@/database/bookSegment.model";



export const checkBookExists = async (title: string) => {
    try {
        await connectToDatabase();
        const slug = generateSlug(title);
        const existingBook = await Book.findOne({ slug }).lean();
        if (existingBook) {
            return {
                exists: true,
                data: serializeData(existingBook) as any,
            }
        }
        return {
            exists: false,
            data: null,
        }
    } catch (error) {
        console.error("Error checking book exists:", error);
        throw error;
    }
}

export const createBook = async (bookData: CreateBook) => {
    try {
        await connectToDatabase();

        const slug = generateSlug(bookData.title);
        const existingBook = await Book.findOne({ slug }).lean();
        if (existingBook) {
            return {
                success: true,
                data: serializeData(existingBook),
                alreadyExists: true,

            }

        }
        const book = await Book.create({ ...bookData, slug, totalSegments: 0 });
        return {
            success: true,
            data: serializeData(book),
            alreadyExists: false,
        }
    } catch (error) {
        console.error("Error creating book:", error);
        throw error;
    }
};


export const saveBookSegments = async (bookId: string, clerkId: string, segments: TextSegment[]) => {
    try {
        await connectToDatabase();
        console.log("Saving book segments:");
        const segmentsToInsert = segments.map(({ text, segmentIndex, pageNumber, wordCount }) => ({
            clerkId,
            bookId,
            content: text,
            segmentIndex,
            pageNumber,
            wordCount,
        }));
        await BookSegment.insertMany(segmentsToInsert);
        await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length });
        return {
            success: true,
            data: { segmentsCreated: segments.length },
        }
    } catch (error) {
        console.error("Error saving book segments:", error);
        throw error;
    }
}

export const getAllBooks = async (clerkId: string) => {
    try {
        await connectToDatabase();
        const books = await Book.find({ clerkId })
            .sort({ createdAt: -1 })
            .lean();

        return {
            success: true,
            data: books.map((book) => serializeData(book)),
        }
    } catch (error) {
        console.error("Error fetching all books:", error);
        throw error;
    }
}
