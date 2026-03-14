import { NextResponse } from "next/server";
import { handleUpload, HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@clerk/nextjs/server";
import { MAX_FILE_SIZE } from "@/lib/constant";

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async () => {
                const { userId } = await auth();
                if (!userId) {
                    throw new Error('Unauthorized: User not authenticated');
                }

                return {
                    allowedContentTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
                    addRandomSuffix: true,
                    maximumSizeInBytes: MAX_FILE_SIZE,
                    tokenPayload: JSON.stringify({ userId })
                }
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                console.log('Upload completed successfully');

                try {
                    const payload = JSON.parse(tokenPayload as string);
                    console.log('Upload processed for authenticated user');
                } catch (error) {
                    console.error('Error processing upload completion');
                    throw new Error('Could not process upload completion');
                }
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        const message = (error as Error).message;
        const isAuthError = message.toLowerCase().includes('unauthorized') || message.toLowerCase().includes('not authenticated');
        const status = isAuthError ? 401 : 400;
        return NextResponse.json(
            { error: message },
            { status }
        );
    }
}