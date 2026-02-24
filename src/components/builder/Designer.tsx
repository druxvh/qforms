'use client';

import { useDesignerElements } from '@/hooks/use-designer';
import { motion } from 'framer-motion';
import DesignerElement, { AddNewField } from './FormElements';
import { Plus } from 'lucide-react';
import { Kbd } from '@/components/ui/kbd';

export default function Designer() {
    const elements = useDesignerElements();
    return (
        <div className="flex h-full w-full flex-col px-2 sm:max-w-xl">
            <div className="custom-scrollbar bg-primary-foreground flex-1 overflow-y-auto rounded-sm border">
                {elements.length > 0 && (
                    <motion.div
                        layout
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="flex w-full flex-col gap-2 p-6"
                    >
                        {elements.map((element) => (
                            <motion.div key={element.id} layout layoutId={element.id}>
                                <DesignerElement element={element} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {elements.length === 0 && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center transition-colors">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-amber-200/60 shadow-sm">
                            <Plus className="text-primary h-8 w-8" />
                        </div>

                        <div className="max-w-[280px] space-y-2">
                            <h3 className="text-primary text-xl font-semibold">
                                Your form is empty
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                Start building by clicking the button below or adding
                                fields from the sidebar.
                            </p>
                        </div>

                        {/* Keyboard Shortcut Hint */}
                        <div className="text-muted-foreground/90 flex items-center gap-2 text-sm">
                            <p>Press</p>
                            <Kbd className="bg-primary text-primary-foreground">⌘ J</Kbd>
                            <p>to quickly add fields</p>
                        </div>
                    </div>
                )}
            </div>

            <AddNewField />
        </div>
    );
}
