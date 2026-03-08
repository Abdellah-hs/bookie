import Image from "next/image";
import Link from "next/link";
import React from "react";


export default function Hero() {
  return (
    <div className="library-hero-card wrapper container pt-26 md:mb-10">
      <div className="library-hero-content">

        {/* 1. Left - Heading, Description, Button */}
        <div className="library-hero-text">
          <h1 className="library-hero-title">Your Library</h1>
          <p className="library-hero-description mt-2">
            Welcome to your personal reading nook. Keep track of what you're reading, save your favorite quotes, and set new reading goals.
          </p>
          <div className="mt-6">
            <Link href="/books/new" className="library-cta-primary">
              + Add New Book
            </Link>
          </div>
        </div>

        {/* 2. Center - Illustration */}
        <div className="library-hero-illustration-desktop">
          <Image
            src="/vintage-books-globe.png"
            alt="Vintage books and a globe"
            width={350}
            height={350}
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* 3. Right - Small white card with 3 steps */}
        <div className="library-steps-card min-w-[300px] shadow-soft-sm">
          <ul>
            <li className="library-step-item mb-5">
              <div className="library-step-number">1</div>
              <div>
                <h3 className="library-step-title">Add a book</h3>
                <p className="library-step-description block text-muted-foreground mt-1">Search or enter details manually.</p>
              </div>
            </li>
            <li className="library-step-item mb-5">
              <div className="library-step-number">2</div>
              <div>
                <h3 className="library-step-title">Start reading</h3>
                <p className="library-step-description block text-muted-foreground mt-1">Track your progress and write notes.</p>
              </div>
            </li>
            <li className="library-step-item">
              <div className="library-step-number">3</div>
              <div>
                <h3 className="library-step-title">Review & share</h3>
                <p className="library-step-description block text-muted-foreground mt-1">Share your thoughts with the community.</p>
              </div>
            </li>
          </ul>
        </div>

      </div>

    </div>

  );
}
