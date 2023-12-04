import { getLines } from '@/utils'

export function parse(input: string) {
  return getLines(input)
}

export function partOne(input: ReturnType<typeof parse>): number {
  const specialCharLocations = getSpecialCharacterIndexes(input)
  let sum = 0
  let digitRegex = /\d/
  input.forEach((l, i) => {
    let numberString = ''
    let isBuildingNumber = false
    Array.from(l).forEach((c, j) => {
      if (c.match(digitRegex)) {
        isBuildingNumber = true
        numberString += c
      } else {
        if (isBuildingNumber) {
          let adjacentSpaces = getAdjacentSpacesForRange(
            [i, j - numberString.length],
            [i, j - 1]
          )
          if (
            [...adjacentSpaces].filter(x => specialCharLocations.has(x))
              .length > 0
          ) {
            sum += parseInt(numberString)
          }
          numberString = ''
          isBuildingNumber = false
        }
      }
    })
    if (isBuildingNumber) {
      let adjacentSpaces = getAdjacentSpacesForRange(
        [i, l.length - numberString.length],
        [i, l.length - 1 - 1]
      )
      if (
        [...adjacentSpaces].filter(x => specialCharLocations.has(x)).length > 0
      ) {
        sum += parseInt(numberString)
      }
    }
  })
  return sum
}

export function partTwo(input: ReturnType<typeof parse>): number {
  const numberLocations = getNumberLocations(input)
  let gearRatioSum = 0
  input.forEach((l, i) => {
    Array.from(l).forEach((c, j) => {
      if (c === '*') {
        let adjacentSpaces = getAdjacentSpacesForRange([i, j], [i, j])
        let adjacentNumbers = numberLocations.filter(nl =>
          [...adjacentSpaces].some(x => nl.locations.has(x))
        )
        if (adjacentNumbers.length == 2) {
          gearRatioSum +=
            adjacentNumbers[0].numberValue * adjacentNumbers[1].numberValue
        }
      }
    })
  })

  return gearRatioSum
}

function getSpecialCharacterIndexes(lines: string[]): Set<string> {
  let set = new Set<string>()
  let charRegex = /\d|\./
  lines.forEach((l, i) => {
    Array.from(l).forEach((c, j) => {
      if (c.match(charRegex) == null) {
        set.add(`${i},${j}`)
      }
    })
  })
  return set
}

function getAdjacentSpacesForRange(
  start: [number, number],
  end: [number, number]
): Set<string> {
  let set = new Set<string>()
  for (let i = start[0] - 1; i <= start[0] + 1; i++) {
    for (let j = start[1] - 1; j <= end[1] + 1; j++) {
      set.add(`${i},${j}`)
    }
  }
  return set
}

class NumberLocation {
  numberValue: number = 0
  locations: Set<string> = new Set()
}

function getNumberLocations(input: string[]) {
  let numberLocations: NumberLocation[] = []
  let digitRegex = /\d/
  input.forEach((l, i) => {
    let numberString = ''
    let isBuildingNumber = false
    let numLoc = new NumberLocation()
    Array.from(l).forEach((c, j) => {
      if (c.match(digitRegex)) {
        isBuildingNumber = true
        numberString += c
        numLoc.locations.add(`${i},${j}`)
      } else {
        if (isBuildingNumber) {
          numLoc.numberValue = parseInt(numberString)
          numberLocations.push(numLoc)
          numberString = ''
          isBuildingNumber = false
          numLoc = new NumberLocation()
        }
      }
    })
    if (isBuildingNumber) {
      numLoc.numberValue = parseInt(numberString)
      numberLocations.push(numLoc)
    }
  })
  return numberLocations
}
