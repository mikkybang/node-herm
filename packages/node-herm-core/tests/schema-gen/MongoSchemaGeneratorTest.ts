import test from "ava";

import { IClassDefinition } from "../../src/classes/ClassDefinition";
import { MongoSchemaGenerator } from "../../src/schema-gen/MongoSchemaGenerator";

test("Generate simple schema code", (t) => {
    const classDef: IClassDefinition = {
        name: "Test",
        properties: [
            {
                name: "name",
                type: "String",
            },
        ],
    };
    const schemaGenerator = new MongoSchemaGenerator();

    const generatedCode = schemaGenerator.generate(classDef);
    t.snapshot(generatedCode);
});
