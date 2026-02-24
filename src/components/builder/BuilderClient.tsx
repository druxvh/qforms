'use client';

import { Form } from '@/generated/prisma/client';
import BuilderNavbar from './BuilderNavbar';
import BuilderTopbar from './BuilderTopbar';
import Sidebar from './Sidebar';
import Designer from './Designer';
import SidePanel from './SidePanel';
import { useDesignerActions } from '@/hooks/use-designer';
import { useEffect } from 'react';
import { FormElementInstance } from '@/types/form';

type BuilderClientProps = {
    form: Form;
};

export default function BuilderClient({ form }: BuilderClientProps) {
    const { setElements, setSelectedElement } = useDesignerActions();

    // hydrate elements when form changes
    useEffect(() => {
        const elements = (form.content as FormElementInstance[]) ?? [];

        setElements(elements);
        setSelectedElement(null);
    }, [form, setElements, setSelectedElement]);

    return (
        <div className="bg-muted flex h-full w-full flex-col gap-1">
            <BuilderNavbar />
            <BuilderTopbar form={form} />

            <div className="flex h-full min-h-0 w-full justify-between overflow-hidden">
                <Sidebar />
                <Designer />
                <SidePanel />
            </div>
        </div>
    );
}
