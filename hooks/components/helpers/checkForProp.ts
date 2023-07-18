export function checkObjectProperties(object: any): boolean {
  for (const key in object) {
    if (object.hasOwnProperty(key) && !object[key]) {
      return false;
    }
  }
  return true;
}
