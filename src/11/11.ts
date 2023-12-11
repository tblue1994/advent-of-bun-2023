import { Coordinate, getLines } from '@/utils'

export function parse(input: string) {
  return getLines(input).map(l => Array.from(l))
}

export function partOne(input: ReturnType<typeof parse>): number {
  return calculateDistancesBetweenGalaxies(input, 2)
}

function calculateDistancesBetweenGalaxies(
  input: string[][],
  multiplier: number
) {
  let coords = findGalaxies(input)
  let blanks = findBlankRowCols(coords, input[0].length, input.length)

  let sum = 0

  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      sum +=
        Math.abs(coords[i].x - coords[j].x) +
        Math.abs(coords[i].y - coords[j].y) +
        blanks.blankX.filter(v => isBetween(v, [coords[i].x, coords[j].x]))
          .length *
          (multiplier - 1) +
        blanks.blankY.filter(v => isBetween(v, [coords[i].y, coords[j].y]))
          .length *
          (multiplier - 1)
    }
  }
  return sum
}

export function partTwo(input: ReturnType<typeof parse>): number {
  return calculateDistancesBetweenGalaxies(input, 1000000)
}

function findGalaxies(map: string[][]): Coordinate[] {
  let c: Coordinate[] = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '#') {
        c.push({ x, y })
      }
    }
  }
  return c
}

function isBetween(value: number, array: number[]): boolean {
  return value > Math.min(...array) && value < Math.max(...array)
}
function findBlankRowCols(
  galaxies: Coordinate[],
  maxX: number,
  maxY: number
): Blanks {
  let blanks: Blanks = {
    blankX: [],
    blankY: []
  }
  for (let x = 0; x < maxX; x++) {
    if (galaxies.every(g => g.x !== x)) {
      blanks.blankX.push(x)
    }
  }
  for (let y = 0; y < maxY; y++) {
    if (galaxies.every(g => g.y !== y)) {
      blanks.blankY.push(y)
    }
  }
  return blanks
}

interface Blanks {
  blankX: number[]
  blankY: number[]
}
