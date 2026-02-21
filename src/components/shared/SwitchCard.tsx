'use client';

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from '@/components/ui/field';
import { useId } from 'react';
import Switch from './Switch';

type SwitchCardProps = {
    title: string;
    description: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
};

export function SwitchCard({
    title,
    description,
    checked,
    onCheckedChange,
}: SwitchCardProps) {
    const id = useId();

    return (
        <FieldLabel htmlFor={id} className="">
            <Field orientation="horizontal">
                <FieldContent>
                    <FieldTitle>{title}</FieldTitle>
                    <FieldDescription>{description}</FieldDescription>
                </FieldContent>
                <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
            </Field>
        </FieldLabel>
    );
}
