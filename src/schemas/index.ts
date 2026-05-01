// Export all schemas 
export * from './field-schemas';
export * from './builder-schema'
export * from './create-form-schema';
export * from './onboarding-schema';

// Field Schemas Import (for registry)
import {
    checkboxFieldSchema,
    dateFieldSchema,
    numberFieldSchema,
    paragraphFieldSchema,
    selectFieldSchema,
    separatorFieldSchema,
    spacerFieldSchema,
    subTitleFieldSchema,
    textAreaFieldSchema,
    textFieldSchema,
    titleFieldSchema,
} from './field-schemas';

// Field Schema Registry
export const fieldSchemas = {
    TextField: textFieldSchema,
    NumberField: numberFieldSchema,
    TextAreaField: textAreaFieldSchema,
    DateField: dateFieldSchema,
    SelectField: selectFieldSchema,
    CheckboxField: checkboxFieldSchema,
    TitleField: titleFieldSchema,
    SubTitleField: subTitleFieldSchema,
    ParagraphField: paragraphFieldSchema,
    SpacerField: spacerFieldSchema,
    SeparatorField: separatorFieldSchema,
} as const;