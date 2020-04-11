import test from 'ava'
import { DataClassDefinition } from '../../src/schema-parser/DataClassDefinition';
import { MongoSchemaParser } from '../../src/schema-parser/MongoSchemaParser'
import '../../src/config'

test('mongo schema parser', t => {
  const schemaParser = new MongoSchemaParser();
  const testModel = `module.exports = model('Test', new Schema({ name: String }))`;
  const classDef: DataClassDefinition = schemaParser.parseSchema(testModel);

  t.assert(t.is(classDef.name, 'Test'));
  t.assert(t.is(classDef.properties, [ { name: 'name', type: 'String' } ]));
})