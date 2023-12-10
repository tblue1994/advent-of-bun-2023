import { getLines } from '@/utils'

export function parse(input: string) {
  return getLines(input).map(l => l.split(' ').map(n => parseInt(n)))
}

export function partOne(input: ReturnType<typeof parse>): number {
  let sum = 0
  input.forEach(arr => {
    sum += getNextNumber(arr)
  })
  return sum
}

function getNextNumber(array: number[]): number {
  if (array.every(val => val === array[0])) {
    return array[0]
  }
  return (
    array[array.length - 1] +
    getNextNumber(
      array.reduce<number[]>((acc, current, i, array) => {
        if (i != array.length - 1) {
          acc.push(array[i + 1] - current)
        }
        return acc
      }, [])
    )
  )
}

export function partTwo(input: ReturnType<typeof parse>): number {
  let sum = 0
  input.forEach(arr => {
    sum += getNextNumber(arr.reverse())
  })
  return sum
}
