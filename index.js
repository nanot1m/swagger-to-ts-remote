const swaggerToTS = require("@manifoldco/swagger-to-ts").default;
const got = require("got");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const mkdirp = promisify(require("mkdirp"));

async function getSpec(specUrl) {
  const { body } = await got(specUrl, {
    rejectUnauthorized: false,
    json: true
  });
  for (let key in body.definitions) {
    if (!/^[a-zA-Z]+$/.test(key)) {
      delete body.definitions[key];
      console.warn(`Warning: definition for ${key} would not be written`);
    }
  }

  return body;
}

function convertSpecToTS(spec, namespace) {
  return swaggerToTS(spec, { namespace });
}

async function saveTsDefs({ defs, name, outputPath }) {
  await mkdirp(path.join(process.cwd(), outputPath));
  const fileName = path.join(process.cwd(), outputPath, name + ".d.ts");
  fs.writeFileSync(fileName, defs, { encoding: "utf-8" });
}

module.exports = async function process(specUrl, nameSpace, output) {
  const spec = await getSpec(specUrl);
  const defs = convertSpecToTS(spec, nameSpace);
  await saveTsDefs({ defs, name: nameSpace, outputPath: output });
};
