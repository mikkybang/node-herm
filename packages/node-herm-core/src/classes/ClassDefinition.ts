export interface IPropertyDefinition {
    name: string;
    type: string;
}

export interface IClassDefinition {
    name: string;
    properties: IPropertyDefinition[];
}