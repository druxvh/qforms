'use client';

import { Loader2, Wand2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { useDesignerActions, useDesignerElements } from '@/hooks/use-designer';
import { FormElementInstance } from '@/types/form';
import { toast } from 'sonner';

export default function AISidebar() {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const elements = useDesignerElements();
    const { setElements } = useDesignerActions();

    const handleGenerate = async () => {
        const text = prompt.trim();
        if (!text) return;

        setLoading(true);

        try {
            const res = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: text,
                    currentBuilder: elements.map((el) => ({
                        id: el.id,
                        type: el.type,
                        extraAttributes:
                            typeof el.extraAttributes === 'string'
                                ? JSON.parse(el.extraAttributes)
                                : (el.extraAttributes ?? {}),
                    })),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error('Error', {
                    description: 'AI Generation Failed',
                    style: {
                        '--normal-bg':
                            'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
                        '--normal-text':
                            'light-dark(var(--color-amber-600), var(--color-amber-400))',
                        '--normal-border':
                            'light-dark(var(--color-amber-600), var(--color-amber-400))',
                    } as React.CSSProperties,
                });
            }

            setPrompt('');
            setElements(data.fields as FormElementInstance[]);

            toast.success('Success!', {
                description: 'AI Form Generated Successfully',
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
                description: 'AI Builder Error',
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
                    '--normal-text':
                        'light-dark(var(--color-amber-600), var(--color-amber-400))',
                    '--normal-border':
                        'light-dark(var(--color-amber-600), var(--color-amber-400))',
                } as React.CSSProperties,
            });

            console.error('AI Builder Error:', error);
        } finally {
            setPrompt('');
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex h-full flex-col gap-1">
                <h2 className="font-semibold">AI Form Builder</h2>
                <p className="text-muted-foreground text-sm text-wrap">
                    Describe the form you want to create or improve the existing one.
                </p>
            </div>
            <Textarea
                placeholder="Example: Create a student registration form with name, email, course, date of birth and checkbox for terms..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-40 resize-none"
            />

            <Button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="w-full"
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Form
                    </>
                )}
            </Button>
        </div>
    );
}
