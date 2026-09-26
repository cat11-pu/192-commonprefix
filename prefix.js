// prefix.js：求前缀（从左往右逐字符比较，遇不同或任一串结束就停）
import { sameAt } from "./scan.js";

export function commonPrefix(left, right) {
  if (left.length === 0 || right.length === 0) {
    const error = new Error("E_EMPTY_STRING: 某一串为空");
    error.code = "E_EMPTY_STRING";
    throw error;
  }
  const shortest = Math.min(left.length, right.length);
  let length = 0;
  while (length < shortest && sameAt(left, right, length)) {
    length += 1;
  }
  const prefix = left.slice(0, length);
  const first_diff = length < shortest ? length : -1;
  return { prefix, length, first_diff };
}
