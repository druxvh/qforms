'use client';

import DeleteElements from '@/components/builder/DeleteElements';
import PublishForm from '@/components/builder/PublishForm';
import SaveForm from '@/components/builder/SaveForm';
import { Form } from '@/generated/prisma/client';
import BuilderDropdownMenu from './BuilderDropdownMenu';

type BuilderTopbarProps = {
    form: Form;
};

export default function BuilderTopbar({ form }: BuilderTopbarProps) {
    if (!form.published) {
        return (
            <div className="flex items-center justify-between p-4">
                <h2 className="truncate font-medium">
                    <span className="text-muted-foreground mr-2">Form:</span>
                    {form.name}
                </h2>
                <div>
                    <div className="hidden items-center gap-2 sm:flex">
                        <DeleteElements variant="button" />
                        <SaveForm formId={form.id} variant="button" />
                        <PublishForm formId={form.id} variant="button" />
                    </div>

                    <BuilderDropdownMenu id={form.id} />
                </div>
            </div>
        );
    }
}
