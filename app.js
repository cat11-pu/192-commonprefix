// app.js：渲染结果
import { sameAt } from "./scan.js";
import { commonPrefix } from "./prefix.js";

export function render(spec) {
  const left = String(spec.left === undefined ? "" : spec.left);
  const right = String(spec.right === undefined ? "" : spec.right);
  const view = commonPrefix(left, right);
  return { prefix: view.prefix || "", length: view.length || 0,
           first_diff: view.first_diff === undefined ? -1 : view.first_diff,
           shortest: Math.min(left.length, right.length),
           same: left === right, left_length: left.length, right_length: right.length };
}
