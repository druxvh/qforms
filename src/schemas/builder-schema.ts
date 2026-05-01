import * as z from 'zod';
import {
    textFieldSchema,
    numberFieldSchema,
    textAreaFieldSchema,
    dateFieldSchema,
    selectFieldSchema,
    checkboxFieldSchema,
    titleFieldSchema,
    subTitleFieldSchema,
    paragraphFieldSchema,
    spacerFieldSchema,
    separatorFieldSchema,
} from './field-schemas';

// Supported field types
export const fieldTypeEnum = z.enum([
    "TitleField",
    "SubTitleField",
    "ParagraphField",
    "SeparatorField",
    "SpacerField",
    "TextField",
    "NumberField",
    "TextAreaField",
    "DateField",
    "SelectField",
    "CheckboxField",
]);

// Builder Schema type
export const builderSchema = z.discriminatedUnion("type", [
    z.object({
        id: z.string(),
        type: z.literal("TitleField"),
        extraAttributes: titleFieldSchema,
    }),
    z.object({
        id: z.string(),
        type: z.literal("SubTitleField"),
        extraAttributes: subTitleFieldSchema,
    }),
    z.object({
        id: z.string(),
        type: z.literal("ParagraphField"),
        extraAttributes: paragraphFieldSchema,
    }),
    z.object({
        id: z.string(),
        type: z.literal("SeparatorField"),
        extraAttributes: separatorFieldSchema,
    }),
    z.object({
        id: z.string(),
        type: z.literal("SpacerField"),
        extraAttributes: spacerFieldSchema,
    }),
    z.object({
        id: z.string(),
        type: z.literal("TextField"),
        extraAttributes: textFieldSchema,
    }),
    z.object({
        id: z.string(),
        type: z.literal("NumberField"),
        extraAttributes: numberFieldSchema,
    }),
    z.object({
        id: z.string(),
        type: z.literal("TextAreaField"),
        extraAttributes: textAreaFieldSchema,
    }),
    z.object({
        id: z.string(),
        type: z.literal("DateField"),
        extraAttributes: dateFieldSchema,
    }),
    z.object({
        id: z.string(),
        type: z.literal("SelectField"),
        extraAttributes: selectFieldSchema,
    }),
    z.object({
        id: z.string(),
        type: z.literal("CheckboxField"),
        extraAttributes: checkboxFieldSchema,
    }),
]);

// Builder schema as array 
export const builderArraySchema = z.array(builderSchema);

export type BuilderSchemaT = z.infer<typeof builderSchema>;