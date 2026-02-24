'use client';

import { Button } from '../ui/button';
import { toast } from 'sonner';
import React, { useTransition } from 'react';
import { LoaderCircle, Save } from 'lucide-react';
import { updateFormContentByIdAction } from '@/actions/form';
import { useDesignerElements } from '@/hooks/use-designer';
import { DropdownMenuItem } from '../ui/dropdown-menu';

type SaveFormProps = {
    formId: string;
    variant?: 'button' | 'menu-item';
};

export default function SaveForm({ formId, variant = 'button' }: SaveFormProps) {
    const elements = useDesignerElements();
    const [isPending, startTransition] = useTransition();

    async function handleSave(e: React.MouseEvent | Event) {
        e.preventDefault();
        e.stopPropagation();

        if (!elements || elements.length === 0) {
            toast.error('Cannot save empty form', {
                description: 'Add at least one field before saving.',
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
                    '--normal-text':
                        'light-dark(var(--color-amber-600), var(--color-amber-400))',
                    '--normal-border':
                        'light-dark(var(--color-amber-600), var(--color-amber-400))',
                } as React.CSSProperties,
            });
            return;
        }

        startTransition(async () => {
            try {
                // const jsonElements = JSON.stringify(elements)
                // await updateFormContentById(formId, jsonElements)

                await updateFormContentByIdAction(formId, elements);

                toast.success('Saved', {
                    description: 'Your form has been saved successfully.',
                    style: {
                        '--normal-bg':
                            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                        '--normal-text':
                            'light-dark(var(--color-green-600), var(--color-green-400))',
                        '--normal-border':
                            'light-dark(var(--color-green-600), var(--color-green-400))',
                    } as React.CSSProperties,
                });
            } catch (error) {
                toast.error('Error', {
                    description: 'Something went wrong while saving',
                    style: {
                        '--normal-bg':
                            'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                        '--normal-text': 'var(--destructive)',
                        '--normal-border': 'var(--destructive)',
                    } as React.CSSProperties,
                });
                console.error(error);
            }
        });
    }

    // Render as a standard button
    if (variant === 'button') {
        return (
            <Button
                disabled={isPending || elements.length === 0}
                onClick={handleSave}
                className="w-24 cursor-pointer rounded-none text-xs sm:text-sm"
            >
                {isPending ? (
                    <LoaderCircle className="size-4 animate-spin" />
                ) : (
                    <span>Save</span>
                )}
            </Button>
        );
    }

    // Render as a dropdown menu item
    return (
        <DropdownMenuItem
            onSelect={handleSave}
            disabled={isPending || elements.length === 0}
        >
            {isPending ? <LoaderCircle className="size-4 animate-spin" /> : <Save />}
            <span>Save</span>
            {/* <Save />
            Save */}
        </DropdownMenuItem>
    );
}
