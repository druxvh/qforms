'use client';

import { Globe, LoaderCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useTransition } from 'react';
import {
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialog,
} from '../ui/alert-dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useDesignerElements } from '@/hooks/use-designer';
import { publishFormByIdAction } from '@/actions/form';
import { DropdownMenuItem } from '../ui/dropdown-menu';

type PublishFormProps = {
    formId: string;
    variant?: 'button' | 'menu-item';
};
export default function PublishForm({ formId, variant = 'button' }: PublishFormProps) {
    const elements = useDesignerElements();
    const [isPending, startTransition] = useTransition();
    const { refresh } = useRouter();

    const isFormEmpty = !elements || elements.length === 0;

    async function handlePublishForm() {
        try {
            if (isFormEmpty) {
                toast.error('Cannot publish empty form', {
                    description: 'Add at least one field and save it before publishing.',
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
            await publishFormByIdAction(formId);
            toast.success('Published!', {
                description: 'Your form is now available to the public.',
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text':
                        'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border':
                        'light-dark(var(--color-green-600), var(--color-green-400))',
                } as React.CSSProperties,
            });
            refresh();
        } catch (error) {
            toast.error('Publish failed', {
                description: 'Something went wrong while publishing.',
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)',
                } as React.CSSProperties,
            });
            console.error('Publish form btn Err: ', error);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {variant === 'button' ? (
                    <Button
                        disabled={isPending || isFormEmpty}
                        className="w-24 cursor-pointer rounded-none text-xs sm:text-sm"
                    >
                        {isPending ? (
                            <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                            'Publish'
                        )}
                    </Button>
                ) : (
                    <DropdownMenuItem onSelect={handlePublishForm} disabled={isFormEmpty}>
                        <Globe />
                        Publish
                    </DropdownMenuItem>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-pretty">
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. After publishing you will not be
                        able to edit this form.
                        <br />
                        <br />
                        <span className="font-medium">
                            By publishing this form you will make it available to the
                            public and you will be able to collect submissions.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isPending || isFormEmpty}
                        onClick={() => {
                            startTransition(handlePublishForm);
                        }}
                    >
                        {isPending ? (
                            <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                            <span>Publish Now</span>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
