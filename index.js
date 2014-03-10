/**
 * Created by azu on 2014/03/11.
 * LICENSE : MIT
 */
"use strict";

var fs = require("fs");
var esprima = require("esprima");
var estraverse = require("estraverse");

function main(src) {
    var ast = esprima.parse(src);
    var html = [];
    var depth = 0;
    estraverse.traverse(ast, {
        enter: function (node, parent) {
            depth += 1;
            var name = node.name ? ' name="' + node.name + '" ' : "";
            html.push(new Array(depth - 1).join("  ") + "<" + node.type + name + ">");
        },
        leave: function (node, parent) {
            html.push(new Array(depth - 1).join("  ") + "</" + node.type + ">");
            depth -= 1;
        }
    });
    html.push('<link rel="stylesheet" href="style.css" type="text/css"/>');
    fs.writeFileSync("index.html", html.join("\n"), "utf-8");
}

var code = fs.readFileSync(__dirname + "/example/index.js", "utf-8");

main(code);