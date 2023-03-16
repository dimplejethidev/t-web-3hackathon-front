/**
 * マップをディープコピー
 * @param map コピー元
 * @return {Map<K, V>} Map<K, V>
 */
export function deepCpyMap<K, V>(map: Map<K, V>): Map<K, V> {
  const deepCpyMap = new Map<K, V>();
  const keys = map.keys();
  for (const key of keys) {
    deepCpyMap.set(key, map.get(key)!);
  }
  return deepCpyMap;
}
