export function exhaustive(_value: never): never {
  throw new Error('exhaustive');
}
