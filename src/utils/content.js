import { code } from "@babel/template";
import generator from "@babel/generator";
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
import ProxySandbox from "./sandbox/ProxySandbox";

window.ProxySandbox = ProxySandbox;

export function wrapModuleWithSandbox(sandboxId, modCont, context) {
  const ast = parser.parse(modCont, {
    sourceType: "script",
  });
  let functionCounter = 0;
  traverse(ast, {
    enter(path) {
      if (path.node.type === "FunctionExpression") {
        functionCounter++;
        if (functionCounter === 2) {
          let { start, end } = path.node;
          const varsCode = `{
              let _local_global_win = window;
              let sandbox;
              if (window.ProxySandbox) {
                sandbox = new ProxySandbox('${sandboxId}');
                _local_global_win = sandbox.proxy;
                ${
                  context
                    ? Object.keys(context)
                        .map((key) => {
                          let vlu = JSON.stringify(context[key]);
                          return `_local_global_win.${key} = ${vlu};`;
                        })
                        .join("")
                    : ""
                }
                const rawWindow = (new Function("return this"))();
                _local_global_win.__RAW_WINDOW__ = rawWindow; 
                if (!rawWindow._sandboxes) rawWindow._sandboxes = [];
                rawWindow._sandboxes.push(_local_global_win);
              }
              return (function (window) {
                with (window) {
          `;
          let source = modCont.slice(start, end);
          source = source.replace(/{/, varsCode);

          source = source.replace(/}$/, "}})(_local_global_win)}");
          path.replaceWithSourceString(source);
        }
      }
    },
  });
  return generator(ast, {}, code).code;
}
