'use client';

import { Button } from '@/components/ui/button';
import { useDesignerActions, useDesignerSelectedElement } from '@/hooks/use-designer';
import { FormElements } from '@/types/form';
import { X } from 'lucide-react';

export default function FieldProperties() {
    const { setSelectedElement } = useDesignerActions();
    const selectedElement = useDesignerSelectedElement();
    if (!selectedElement) return null;

    const Properties = FormElements[selectedElement.type].propertiesComponent;
    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between border-b p-4 pb-2">
                <p className="font-semibold">Field Properties</p>
                <Button
                    size={'icon'}
                    variant={'ghost'}
                    onClick={() => setSelectedElement(null)}
                >
                    <X />
                </Button>
            </div>

            {/* Properties */}
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
                <Properties elementInstance={selectedElement} />
            </div>
        </div>
    );
}
