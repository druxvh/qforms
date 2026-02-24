'use client';

import { Trash, Trash2Icon, TriangleAlertIcon } from 'lucide-react';
import { Button } from '../ui/button';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import { useDesignerActions, useDesignerElements } from '@/hooks/use-designer';
import { DropdownMenuItem } from '../ui/dropdown-menu';

type DeleteElementsProps = {
    variant?: 'button' | 'menu-item';
};

export default function DeleteElements({ variant = 'button' }: DeleteElementsProps) {
    const { setElements, setSelectedElement } = useDesignerActions();
    const elements = useDesignerElements();
    const isFormEmpty = !elements || elements.length === 0;

    // deletes all the elements from the builder area.
    function handleDeleteElements() {
        setElements([]);
        setSelectedElement(null);
        return;
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {variant === 'menu-item' ? (
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        disabled={isFormEmpty}
                        variant="destructive"
                    >
                        <Trash />
                        Delete
                    </DropdownMenuItem>
                ) : (
                    <Button
                        disabled={elements.length === 0}
                        variant="outline"
                        size={'icon'}
                        className="hover:bg-destructive/10! text-destructive! border-destructive! focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 rounded-sm"
                    >
                        <Trash2Icon />
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-sm">
                <AlertDialogHeader className="items-center">
                    <div className="bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
                        <TriangleAlertIcon className="text-destructive size-6" />
                    </div>
                    <AlertDialogTitle>
                        Are you absolutely sure you want to delete?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        This action cannot be undone. This will permanently delete all the
                        elements from the builder area!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-sm">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteElements}
                        className="bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive rounded-sm text-white"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
