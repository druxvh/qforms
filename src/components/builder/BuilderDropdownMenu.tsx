'use client';

import { EllipsisVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import SaveForm from '@/components/builder/SaveForm';
import DeleteElements from '@/components/builder/DeleteElements';
import PublishForm from '@/components/builder/PublishForm';

export default function BuilderDropdownMenu({ id }: { id: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="sm:hidden">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <SaveForm formId={id} variant="menu-item" />
                <DropdownMenuSeparator />

                <PublishForm formId={id} variant="menu-item" />
                <DropdownMenuSeparator />

                <DeleteElements variant="menu-item" />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
