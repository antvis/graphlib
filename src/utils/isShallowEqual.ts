export function depthOf(val: any, currentDepth = 0) {
  if (currentDepth > 3) return Infinity;

  if (typeof val !== 'object' || val === null) {
    return currentDepth;
  }

  let maxDepth = currentDepth;
  for (const key in val) {
    const depth = depthOf(val[key], currentDepth + 1);
    maxDepth = Math.max(maxDepth, depth);
  }
  return maxDepth;
}

export function isShallowEqual(val1: any, val2: any, depth = 1, maxDepth = 3) {
  if (depth > maxDepth) return true;

  if (val1 === val2) return true;
  if (
    typeof val1 !== 'object' ||
    typeof val2 !== 'object' ||
    val1 == null ||
    val2 == null
  ) {
    return val1 === val2;
  }

  const keys1 = Object.keys(val1);
  const keys2 = Object.keys(val2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }

    if (typeof val1[key] === 'object' && typeof val2[key] === 'object') {
      if (!isShallowEqual(val1[key], val2[key], depth + 1, maxDepth)) {
        return false;
      }
    } else if (val1[key] !== val2[key]) {
      return false;
    }
  }

  return true;
}

/**
 * Compare two values deeply.
 *
 * If the depth of the values is greater than 3, it will be regarded as not equal.
 *
 * This is for performance optimization, not for correctness.
 */
export function isEqual(val1: any, val2: any) {
  if (depthOf(val1) === Infinity || depthOf(val2) === Infinity) return false;
  return isShallowEqual(val1, val2);
}
