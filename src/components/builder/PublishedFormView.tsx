'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ReactConfetti from 'react-confetti';
import { toast } from 'sonner';

type PublishedFormViewProps = {
    shareUrl: string;
    formId: string;
};

export default function PublishedFormView({ shareUrl, formId }: PublishedFormViewProps) {
    function handleCopyLink() {
        navigator.clipboard.writeText(shareUrl);
        toast.success('Copied', {
            description: 'Link copied to clipboard',
            style: {
                '--normal-bg':
                    'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                '--normal-text':
                    'light-dark(var(--color-green-600), var(--color-green-400))',
                '--normal-border':
                    'light-dark(var(--color-green-600), var(--color-green-400))',
            } as React.CSSProperties,
        });
    }

    return (
        <>
            <ReactConfetti
                width={typeof window !== 'undefined' ? window.innerWidth : 0}
                height={typeof window !== 'undefined' ? window.innerHeight : 0}
                recycle={false}
                numberOfPieces={300}
            />
            <div className="flex h-full w-full flex-col items-center justify-center px-4">
                <div className="max-w-md">
                    <h1 className="text-primary mb-5 border-b pb-2 text-center text-2xl font-bold sm:mb-10 sm:text-3xl">
                        Form Published
                    </h1>
                    <h2 className="text-lg sm:text-2xl">Share this form</h2>
                    <h3 className="text-muted-foreground border-b pb-5 text-base sm:pb-10 sm:text-xl">
                        Anyone with the link can view and submit the form
                    </h3>
                    <div className="my-4 flex w-full flex-col items-center gap-2 border-b pb-4">
                        <Input className="w-full" readOnly value={shareUrl} />
                        <Button className="mt-2 w-full" onClick={handleCopyLink}>
                            Copy Link
                        </Button>
                    </div>
                    <div className="flex justify-between">
                        <Button variant={'link'} asChild>
                            <Link href={'/dashboard'} className="gap-2">
                                <ArrowLeft />
                                Go back home
                            </Link>
                        </Button>

                        <Button variant={'link'} asChild>
                            <Link href={`/forms/${formId}`} className="gap-2">
                                Form details
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
