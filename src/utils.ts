export function getLines(str: string) {
  return str.split(/\r\n|\r|\n/).slice(0, -1)
}
