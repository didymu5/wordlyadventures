function binarySearch(
  low: number,
  high: number,
  isChecked: (mid: number) => boolean
) {
  const mid = Math.floor(low + high / 2);
  if (mid === low) return mid;
  if (isChecked(mid)) {
    return binarySearch(mid, high, isChecked);
  } else {
    return binarySearch(low, mid, isChecked);
  }
}
export default binarySearch;
