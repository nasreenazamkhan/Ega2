export interface ElementInputProps {
    label: string,
    value: string,
    name: string,
    type?: string,
    variant?: string,
    helperText?: string,
    required?: boolean,
    error?: string
    placeholder?: string,
    fieldIcon?: string,
    inputRef?: any,
    fieldAction?(eventType: string, event: any): void;

}

export interface LabelValue {
    label: string,
    value: string,
    selected?: boolean
}

