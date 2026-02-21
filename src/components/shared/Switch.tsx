'use client';

import { cn } from '@/lib/utils';

type SwitchProps = {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    id?: string;
    className?: string;
};

export default function Switch({
    checked,
    onCheckedChange,
    disabled = false,
    id,
    className,
}: SwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            id={id}
            disabled={disabled}
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out outline-none',
                'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2',
                checked ? 'bg-primary' : 'bg-muted-foreground/30',
                disabled && 'cursor-not-allowed opacity-50',
                className,
            )}
        >
            {/* The Thumb */}
            <span
                className={cn(
                    'pointer-events-none block size-4 rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                    checked ? 'translate-x-[1.15rem]' : 'translate-x-0.5',
                )}
            />
        </button>
    );
}
