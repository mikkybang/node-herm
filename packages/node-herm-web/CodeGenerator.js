const fs = require('fs');
const archiver = require('archiver');
const { MongoSchemaGenerator } = require('node-herm-core');

function generateSchema(archive, models) {
    const schemaGen = new MongoSchemaGenerator();
    models.forEach(model => {
        archive
            .append(schemaGen.generate(model), { 
                name: `schema/${model.name}.ts` 
            });
    });
}

function generate(path, models, done) {
    const output = fs.createWriteStream(path);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        done();
    });

    output.on('end', function () {
        console.log('Data has been drained');
    });


    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            // log warning
            console.log(err.message);
        } else {
            // throw error
            throw err;
        }
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);

    generateSchema(archive, models);

    archive.finalize();
}

module.exports = {
    generate
}