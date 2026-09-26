// prefix.js：求前缀（基线：一律给空串）
import { sameAt } from "./scan.js";

export function commonPrefix(left, right) {
  return { prefix: "", length: 0, first_diff: -1 };
}
