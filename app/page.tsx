import React from "react";
import Hero from "@/components/Hero";
import BookCard from "@/components/BookCard";
import { auth } from "@clerk/nextjs/server";
import { getAllBooks } from "@/lib/actions/book.actions";

export default async function page() {
  const { userId } = await auth();

  let books: any[] = [];
  if (userId) {
    const result = await getAllBooks(userId);
    if (result.success) {
      books = result.data;
    }
  }

  return (
    <main className=" wrapper container">
      <Hero />
      <div className="library-books-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book._id}
              title={book.title}
              author={book.author}
              coverURL={book.coverURL}
              slug={book.slug}
            />
          ))
        ) : (
          <p className="text-[var(--text-secondary)] text-center col-span-full">
            No books yet. Upload your first book to get started!
          </p>
        )}
      </div>
    </main>
  );
}