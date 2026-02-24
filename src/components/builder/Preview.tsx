'use client';

import { Button } from '@/components/ui/button';
import { useDesignerElements } from '@/hooks/use-designer';
import { cn } from '@/lib/utils';
import { FormElements } from '@/types/form';

export default function Preview() {
    const elements = useDesignerElements();

    return (
        <div className={cn('flex h-full w-full flex-col')}>
            <p className="border-b p-4 pb-2 font-bold">Live Preview</p>

            {/* Preview content */}
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-white p-4">
                {elements.map((element) => {
                    const FormComponent = FormElements[element.type].formComponent;

                    return <FormComponent key={element.id} elementInstance={element} />;
                })}
                {elements.length > 0 && (
                    <div className="cursor-not-allowed py-5">
                        <Button disabled className="w-full p-4">
                            Submit
                        </Button>
                    </div>
                )}
                {elements.length === 0 && (
                    <div className="text-muted-foreground m-auto text-center text-sm text-pretty">
                        Add form elements from the sidebar to see a live preview here.
                    </div>
                )}
            </div>
        </div>
    );
}
