'use client';

import { FormElements } from '@/types/form';
import { SidebarFieldElement } from './FormElements';

export default function FieldSidebar() {
    return (
        <div>
            <div className="flex h-full flex-col gap-1">
                <h2 className="font-semibold">Fields</h2>
                <p className="text-muted-foreground text-sm text-wrap">
                    Tap on a field to add it to your form. Customize it further in the
                    side panel!
                </p>
            </div>
            <div className="flex flex-col gap-2 py-4">
                {Object.values(FormElements).map((formElement, idx) => (
                    <SidebarFieldElement key={idx} formElement={formElement} />
                ))}
            </div>
        </div>
    );
}
