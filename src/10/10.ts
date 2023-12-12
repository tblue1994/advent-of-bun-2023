import { Coordinate, getLines } from '@/utils'

export function parse(input: string) {
  return getLines(input).map(l => Array.from(l))
}

export function partOne(input: ReturnType<typeof parse>): number {
  let start = getStartingPosition(input)
  let [nextPos, dir] = findValidStartingDirection(start, input)
  let [visited] = move(nextPos, input, dir, [])
  return visited.length / 2
}

export function partTwo(input: ReturnType<typeof parse>): number {
  let start = getStartingPosition(input)
  let [nextPos, dir] = findValidStartingDirection(start, input)
  let [visited, finalDir] = move(nextPos, input, dir, [])
  let startPipe = getPipeShape(finalDir, dir)
  let map = [...input].map(l => [...l])
  map[start.y][start.x] = startPipe
  return getCountOfSurroundedPoints(map, visited)
}

function getCountOfSurroundedPoints(
  map: string[][],
  visited: Coordinate[]
): number {
  const visitedStrings = visited.map(c => `${c.x},${c.y}`)
  let contained = 0
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (!visitedStrings.includes(`${x},${y}`)) {
        let lineCount = 0
        let xCopy = x - 1
        let yCopy = y - 1
        while (xCopy >= 0 && yCopy >= 0) {
          if (
            visitedStrings.includes(`${xCopy},${yCopy}`) &&
            ['F', 'J', '|', '-'].includes(map[yCopy][xCopy])
          ) {
            lineCount++
          }
          xCopy--
          yCopy--
        }
        if (lineCount % 2 === 1) {
          contained++
        }
      }
    }
  }
  return contained
}

function findValidStartingDirection(
  start: Coordinate,
  map: string[][]
): [Coordinate, Direction] {
  if (start.x - 1 >= 0) {
    if (['-', 'F', 'L'].includes(map[start.y][start.x - 1])) {
      return [{ x: start.x - 1, y: start.y }, Direction.Left]
    }
  }
  if (start.x + 1 < map[0].length) {
    if (['-', '7', 'J'].includes(map[start.y][start.x + 1])) {
      return [{ x: start.x + 1, y: start.y }, Direction.Right]
    }
  }
  if (start.y - 1 >= 0) {
    if (['|', 'F', '7'].includes(map[start.y - 1][start.x])) {
      return [{ x: start.x, y: start.y - 1 }, Direction.Up]
    }
  }
  if (start.y + 1 < map.length) {
    if (['|', 'J', 'L'].includes(map[start.y + 1][start.x])) {
      return [{ x: start.x, y: start.y + 1 }, Direction.Down]
    }
  }
  throw new Error('Its Bad')
}

function getPipeShape(inDir: Direction, outDir: Direction): string {
  switch (inDir) {
    case Direction.Up: {
      switch (outDir) {
        case Direction.Up:
          return '|'
        case Direction.Left:
          return '7'
        case Direction.Right:
          return 'F'
      }
    }
    case Direction.Down: {
      switch (outDir) {
        case Direction.Down:
          return '|'
        case Direction.Left:
          return 'J'
        case Direction.Right:
          return 'L'
      }
    }
    case Direction.Left: {
      switch (outDir) {
        case Direction.Right:
          return '-'
        case Direction.Up:
          return 'L'
        case Direction.Down:
          return 'F'
      }
    }
    case Direction.Right: {
      switch (outDir) {
        case Direction.Left:
          return '-'
        case Direction.Up:
          return 'J'
        case Direction.Down:
          return '7'
      }
    }
  }
}

function move(
  currentPos: Coordinate,
  map: string[][],
  direction: Direction,
  visited: Coordinate[]
): [Coordinate[], Direction] {
  let pipeShape = map[currentPos.y][currentPos.x]
  visited.push(currentPos)
  switch (pipeShape) {
    case '|': {
      switch (direction) {
        case Direction.Up:
          return move(
            { x: currentPos.x, y: currentPos.y - 1 },
            map,
            Direction.Up,
            visited
          )
        case Direction.Down:
          return move(
            { x: currentPos.x, y: currentPos.y + 1 },
            map,
            Direction.Down,
            visited
          )
      }
    }
    case '-': {
      switch (direction) {
        case Direction.Left:
          return move(
            { x: currentPos.x - 1, y: currentPos.y },
            map,
            Direction.Left,
            visited
          )
        case Direction.Right:
          return move(
            { x: currentPos.x + 1, y: currentPos.y },
            map,
            Direction.Right,
            visited
          )
      }
    }
    case 'J': {
      switch (direction) {
        case Direction.Right:
          return move(
            { x: currentPos.x, y: currentPos.y - 1 },
            map,
            Direction.Up,
            visited
          )
        case Direction.Down:
          return move(
            { x: currentPos.x - 1, y: currentPos.y },
            map,
            Direction.Left,
            visited
          )
      }
    }
    case 'L': {
      switch (direction) {
        case Direction.Left:
          return move(
            { x: currentPos.x, y: currentPos.y - 1 },
            map,
            Direction.Up,
            visited
          )
        case Direction.Down:
          return move(
            { x: currentPos.x + 1, y: currentPos.y },
            map,
            Direction.Right,
            visited
          )
      }
    }
    case '7': {
      switch (direction) {
        case Direction.Up:
          return move(
            { x: currentPos.x - 1, y: currentPos.y },
            map,
            Direction.Left,
            visited
          )
        case Direction.Right:
          return move(
            { x: currentPos.x, y: currentPos.y + 1 },
            map,
            Direction.Down,
            visited
          )
      }
    }
    case 'F': {
      switch (direction) {
        case Direction.Left:
          return move(
            { x: currentPos.x, y: currentPos.y + 1 },
            map,
            Direction.Down,
            visited
          )
        case Direction.Up:
          return move(
            { x: currentPos.x + 1, y: currentPos.y },
            map,
            Direction.Right,
            visited
          )
      }
    }
    case 'S':
      return [visited, direction]
  }
  throw new Error('UH OH')
}

function getStartingPosition(input: string[][]): Coordinate {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 'S') return { x, y }
    }
  }
  throw new Error('bad input')
}

enum Direction {
  Up,
  Down,
  Left,
  Right
}
