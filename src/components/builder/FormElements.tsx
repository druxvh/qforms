'use client';

import ElementToolbar from '@/components/builder/ElementToolbar';
import MobileOverlay from '@/components/builder/MobileOverlay';
import { Button } from '@/components/ui/button';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { useDesignerActions, useDesignerElements } from '@/hooks/use-designer';
import { useDevice } from '@/hooks/use-device';
import idGenerator from '@/lib/idGenerator';
import { cn } from '@/lib/utils';
import {
    ElementsType,
    FormElement,
    FormElementInstance,
    FormElements,
} from '@/types/form';
import { AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// global timer
let globalAutoHideTimer: NodeJS.Timeout | null = null;

export default function DesignerElement({ element }: { element: FormElementInstance }) {
    const { activeElementId, removeElement, setSelectedElement, setActiveElementId } =
        useDesignerActions();

    const { isMobile } = useDevice();
    // const [isLongPressing, setIsLongPressing] = useState(false);

    const longPressTimer = useRef<NodeJS.Timeout | null>(null);
    const longPressTriggered = useRef(false);

    const isSelected = activeElementId === element.id;
    const DesignerFieldElement = FormElements[element.type].designerComponent;

    // Cleanup timers on unmount
    useEffect(() => {
        const timer = longPressTimer.current;
        const autoHideTimer = globalAutoHideTimer;
        return () => {
            if (timer) clearTimeout(timer);
            if (autoHideTimer) clearTimeout(autoHideTimer);
        };
    }, []);

    // activate element with auto-hide timer
    const activateWithAutoHide = (id: string) => {
        setActiveElementId(id);

        if (globalAutoHideTimer) clearTimeout(globalAutoHideTimer);
        globalAutoHideTimer = setTimeout(() => {
            setActiveElementId(null);
        }, 3250);
    };

    // remove element
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleOverlayClose();
        removeElement(element.id);
    };

    // edit element
    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleOverlayClose();
        setSelectedElement(element);
    };

    // handle click (desktop) or tap (mobile)
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        // if (isMobile) return;

        if (longPressTriggered.current) {
            longPressTriggered.current = false;
            return;
        }

        activateWithAutoHide(element.id);
    };

    // close overlay and toolbar
    const handleOverlayClose = () => {
        setActiveElementId(null);
        // longPressTriggered.current = false;
    };
    return (
        <>
            {/* Overlay (when long press active) */}
            <MobileOverlay
                visible={isMobile && isSelected}
                onClick={handleOverlayClose}
            />
            <div
                className={cn(
                    'text-foreground relative flex h-fit flex-col rounded-sm transition-all select-none hover:cursor-pointer',
                    isSelected
                        ? 'ring-primary ring-2'
                        : 'hover:ring-primary hover:ring-2',
                )}
                onClick={handleClick}
            >
                {/* Toolbar */}
                <AnimatePresence>
                    {isSelected && (
                        <ElementToolbar
                            elementId={activeElementId}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </AnimatePresence>

                {/* Rendered element */}
                <div
                    className={cn(
                        'bg-muted pointer-events-none flex h-fit w-full items-center rounded-sm p-4 shadow-sm transition hover:shadow-lg active:shadow-lg',
                        isSelected && 'bg-gray-950/20 dark:bg-slate-100/10',
                    )}
                >
                    <DesignerFieldElement elementInstance={element} />
                </div>
            </div>
        </>
    );
}

// Left sidebar field
export function SidebarFieldElement({ formElement }: { formElement: FormElement }) {
    const { addElement } = useDesignerActions();
    const elements = useDesignerElements();

    const { icon: Icon, label } = formElement.designerBtnElement;

    function handleClick() {
        const fieldElement = formElement.construct(idGenerator());
        addElement(elements.length, fieldElement);
    }
    return (
        <Button
            onClick={handleClick}
            className="bg-primary-foreground hover:bg-primary-foreground ring-primary flex h-10 w-full items-center justify-between gap-1 rounded-sm px-2 shadow-sm hover:ring-2"
        >
            <div className="flex items-center gap-2">
                <div className="rounded-md bg-amber-200/60 p-2 text-black">
                    <Icon />
                </div>

                <p className="text-primary text-sm text-wrap">{label}</p>
            </div>

            <Plus className="text-primary" />
        </Button>
    );
}

export function AddNewField() {
    const [open, setOpen] = useState(false);
    const { addElement } = useDesignerActions();
    const elements = useDesignerElements();

    // handle key shortcut
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === 'j' || e.key === 'J') && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    // handle add field and close command dialog
    function onSelectField(type: ElementsType) {
        const formElement = FormElements[type];
        const newElement = formElement.construct(idGenerator());

        addElement(elements.length, newElement);
        setOpen(false);
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 my-4 h-16 w-full rounded-sm font-bold transition-colors"
            >
                <Plus />
                Add New Element
            </Button>

            {/* Command Dialog */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search for a field type..." />
                <CommandList>
                    <CommandEmpty>No fields found.</CommandEmpty>
                    <CommandGroup heading="Form Fields">
                        {Object.values(FormElements).map((element) => {
                            const { icon: Icon, label } = element.designerBtnElement;
                            return (
                                <CommandItem
                                    key={element.type}
                                    onSelect={() => onSelectField(element.type)}
                                    className="cursor-pointer"
                                >
                                    <Icon />
                                    {label}
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
