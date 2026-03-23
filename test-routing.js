const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('holafly-clone/shop.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const a = document.querySelector('a[href="/es/shop/planes-regionales/"]');
console.log("Found a tag:", a ? a.outerHTML : "no");
let btn = a.closest("button");
console.log("Closest button:", btn ? "yes" : "no");
let a_closest = a.closest("a");

var textStr = (a.textContent || "").toUpperCase();
var text = (textStr || (a_closest ? a_closest.textContent : "") || "").toUpperCase();
var href = (a_closest ? a_closest.getAttribute("href") : "") || "";
var h = href.toLowerCase();

console.log("text:", text);
console.log("href:", h);
if (h.includes("shop/planes-regionales") || (text.includes("PLANES REGIONALES") && (h.includes("shop") || h === ""))) {
    console.log("-> MATCHES PLANES REGIONALES");
}
