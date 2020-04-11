export interface PropertyDefinition {
    name: string;
    type: string;
}

export interface DataClassDefinition {
    name: string;
    properties: PropertyDefinition[];
}