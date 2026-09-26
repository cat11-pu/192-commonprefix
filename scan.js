// scan.js：比一字符（越界算不同）
export function sameAt(left, right, spot) {
  if (spot < 0 || spot >= left.length || spot >= right.length) return false;
  return left[spot] === right[spot];
}
