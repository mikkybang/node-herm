import { DataClassDefinition } from './DataClassDefinition';

export interface SchemaParser {
    parseSchema(schema: string): DataClassDefinition;
}
