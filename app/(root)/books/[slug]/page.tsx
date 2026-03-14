import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getBookBySlug } from "@/lib/actions/book.actions";
import { ArrowLeft, Mic, MicOff } from "lucide-react";

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { slug } = await params;
  const result = await getBookBySlug(slug, userId);

  if (!result.success || !result.data) {
    redirect("/");
  }

  const book = result.data;

  return (
    <div className="book-page-container">
      {/* Floating back button */}
      <Link href="/" className="back-btn-floating">
        <ArrowLeft className="w-5 h-5 text-[var(--text-primary)]" />
      </Link>

      <div className="vapi-main-container space-y-6">
        {/* 1. Header Card */}
        <div className="vapi-header-card w-full">
          {/* Cover image with mic button */}
          <div className="vapi-cover-wrapper">
            <Image
              src={book.coverURL}
              alt={book.title}
              width={130}
              height={195}
              className="vapi-cover-image"
            />
            {/* Mic button overlapping bottom-right of cover */}
            <div className="vapi-mic-wrapper">
              <button className="vapi-mic-btn vapi-mic-btn-inactive shadow-soft" aria-label="Start conversation">
                <MicOff className="w-6 h-6 text-[#ccc]" />
              </button>
            </div>
          </div>

          {/* Book info */}
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-serif leading-tight">
                {book.title}
              </h1>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-1">
                by {book.author}
              </p>
            </div>

            {/* Status badges */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <div className="vapi-status-indicator">
                <span className="vapi-status-dot vapi-status-dot-ready" />
                <span className="vapi-status-text">Ready</span>
              </div>
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">Voice: {book.persona || "default"}</span>
              </div>
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">0:00/15:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Transcript Area */}
        <div className="transcript-container w-full min-h-[400px]">
          <div className="transcript-empty">
            <Mic className="w-12 h-12 text-[var(--text-muted)] mb-4" />
            <p className="transcript-empty-text">No conversation yet</p>
            <p className="transcript-empty-hint">
              Click the mic button above to start talking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
