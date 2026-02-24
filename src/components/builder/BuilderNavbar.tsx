'use client';

import PreviewDialogButton from '@/components/builder/PreviewDialogButton';
import ClerkUserButton from '@/components/shared/ClerkUserButton';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function BuilderNavbar() {
    return (
        <nav className="flex h-16 items-center justify-between gap-4 px-4 py-2">
            <div className="flex gap-8">
                <Link
                    href={'/dashboard'}
                    className="flex items-center font-sans text-lg font-semibold tracking-wider sm:text-xl"
                >
                    <span className="inline-flex w-fit items-center justify-center rounded-md bg-linear-to-br from-amber-200 to-amber-400 px-2 py-0.5 font-sans text-base font-semibold text-black shadow-2xl">
                        Q
                    </span>
                </Link>
                <Button
                    asChild
                    className="group text-primary hover:bg-primary hover:text-primary-foreground hidden rounded-none border-2 border-black bg-transparent px-4 sm:flex"
                >
                    <Link href={'/dashboard'}>
                        <ArrowLeftIcon className="transition-transform duration-200 group-hover:-translate-x-0.5" />
                        Go to dashboard
                    </Link>
                </Button>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-4">
                {/* {<ProBadge variant={isPro ? 'pro' : 'cta'} />} */}
                <div className="lg:hidden">
                    <PreviewDialogButton />
                </div>
                <ClerkUserButton />
            </div>
        </nav>
    );
}
