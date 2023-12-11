export function getLines(str: string) {
  return str.split(/\r\n|\r|\n/).filter(b => b != '')
}

export interface Coordinate {
  x: number
  y: number
}
