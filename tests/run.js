import assert from "node:assert";
import { sameAt } from "../scan.js";
import { commonPrefix } from "../prefix.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("sameAt returns a boolean", () => {
  assert.strictEqual(typeof sameAt("ab", "ac", 0), "boolean");
});

check("commonPrefix returns a prefix", () => {
  assert.strictEqual(typeof commonPrefix("ab", "ac").prefix, "string");
});

check("commonPrefix returns a length", () => {
  assert.strictEqual(typeof commonPrefix("ab", "ac").length, "number");
});

check("render counts shortest", () => {
  assert.strictEqual(typeof render({ left: "ab", right: "ac" }).shortest, "number");
});

check("render exposes same flag", () => {
  assert.strictEqual(typeof render({ left: "ab", right: "ac" }).same, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
