import { Document, Model } from 'mongoose';
import { PropertyDefinition } from './DataClassDefinition';
import { SchemaParser } from './SchemaParser';

export class MongoSchemaParser implements SchemaParser {
    parseSchema(schema: string) {
        return {} as any;
    }

    private extractPropertiesFromModel(model: Model<Document, {}>) {
        const schemaObj = model.schema.obj;
        const keys = Object.keys(schemaObj);
        const properties: PropertyDefinition[] = keys.map(key => {
            // tslint:disable-next-line: no-any
            let type: any = schemaObj[key];
            if (type.type) {
                type = type.type;
            }

            if (type.ref) {
                type = type.ref;
            }

            return {
                name: key,
                type
            };
        });
        return properties;
    }
}