import { IClassDefinition } from "../classes/ClassDefinition";
import { CodeBuilder } from "../code-builder";

export class MongoSchemaGenerator {

    public generate(classDef: IClassDefinition): string {
        const classNameInCap = classDef.name.charAt(0).toUpperCase() +
            classDef.name.substring(1);
        const schemaVar = `${classDef.name}Schema`;
        const modelVar = `${classNameInCap}`;
        let codeBuilder = new CodeBuilder();
        codeBuilder.line(`import mongoose from "mongoose";`);

        const schemaBlock = codeBuilder
            .block(`const ${schemaVar} = new mongoose.Schema(`);
        classDef.properties.map((prop) => {
            schemaBlock.line(`${prop.name}: { type: ${prop.type} }`);
        });
        codeBuilder = schemaBlock.close(`)`);

        codeBuilder.line(`const ${modelVar} = mongoose.model("${classNameInCap}", ${schemaVar});`);
        codeBuilder.line(`export const ${modelVar};`);

        return codeBuilder.toCode();
    }

}
