// import Navbar from '@/components/shared/Navbar';
import { ReactNode } from 'react';

export default function BuilderLayout({ children }: { children: ReactNode }) {
    return (
        // <div className="bg-background flex max-h-screen min-h-screen min-w-full flex-col">
        //     <Navbar />
        //     <main className="flex w-full grow">{children}</main>
        // </div>
        <div className="flex h-screen w-full flex-col overflow-hidden">
            {/* <Navbar /> */}
            <main className="min-h-0 flex-1">{children}</main>
        </div>
    );
}
