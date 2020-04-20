import { IClassDefinition } from "../classes/ClassDefinition";

export class MongoSchemaGenerator {

    public generate(classDef: IClassDefinition): string {
        const classNameInCap = classDef.name.charAt(0).toUpperCase() +
            classDef.name.substring(1);
        const schemaVar = `${classDef.name}Schema`;
        const modelVar = `${classNameInCap}`;
        const imports = `import mongoose from "mongoose";`;

        let schema = `const ${schemaVar} = new mongoose.Schema({\n`;
        classDef.properties.map((prop) => {
            schema += `    ${prop.name}: { type: ${prop.type} }\n`;
        });
        schema += `});\n`;

        const model = `const ${modelVar} = mongoose.model("${classNameInCap}", ${schemaVar});`;
        const exportsCode = `export const ${modelVar};`;

        const generatedCode = `${imports}\n${schema}\n${model}\n${exportsCode}\n`;

        return generatedCode;
    }

}
