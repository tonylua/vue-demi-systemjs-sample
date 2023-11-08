const fs = require("fs");
const path = require("path");

function getVersion(directory, all = false) {
  const packageJson = require(`./${directory}/package.json`);
  const { version } = packageJson;
  if (all) return version;
  return version.split(".")[0];
}

function renameDir(oldName, newName) {
  fs.renameSync(oldName, newName, (err) => {
    if (err) {
      console.error(`Error renaming directory: ${err}`);
    } else {
      console.log(`Directory renamed to ${newName}`);
    }
  });
}

function main(to) {
  try {
    let err = false;
    let vue2Dir;
    let vue3Dir;
    let version2;
    let version3;
    if (to === "3") {
      vue2Dir = "node_modules/vue";
      vue3Dir = "node_modules/vue3";
      version2 = getVersion(vue2Dir);
      version3 = getVersion(vue3Dir);
      if (version2 === "2" && version3 === "3") {
        renameDir(vue2Dir, "node_modules/vue2");
        renameDir(vue3Dir, "node_modules/vue");
      } else {
        console.error("Versions do not match the target configuration.");
      }
    } else if (to === "2") {
      vue2Dir = "node_modules/vue2";
      vue3Dir = "node_modules/vue";
      version2 = getVersion(vue2Dir);
      version3 = getVersion(vue3Dir);
      if (version2 === "2" && version3 === "3") {
        renameDir(vue3Dir, "node_modules/vue3");
        renameDir(vue2Dir, "node_modules/vue");
      } else {
        console.error("Versions do not match the target configuration.");
      }
    } else {
      err = true;
      console.error('Invalid argument. Use "to=2" or "to=3".');
    }
    if (!err) {
      console.log(`${vue2Dir}: ${getVersion(vue2Dir, true)}`);
      console.log(`${vue3Dir}: ${getVersion(vue3Dir, true)}`);
    }
  } catch (ex) {
    console.warn("Versions of Vues NOT CHANGE!");
  }
}

const args = process.argv.slice(2);
const toArg = args.find((arg) => arg.startsWith("to="));
if (toArg) {
  const to = toArg.split("=")[1];
  main(to);
} else {
  console.error('Missing argument. Use "to=2" or "to=3".');
}
