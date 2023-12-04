import { getLines } from '@/utils'

interface Halves {
  first: string[]
  second: string[]
}

export function parse(input: string): Halves[] {
  const lineRegex = /Card +\d+: *(.*) \| *(.*)/
  let lines = getLines(input)
  return lines.map(l => {
    let matches = l.match(lineRegex)
    return { first: matches![1].split(/ +/), second: matches![2].split(/ +/) }
  })
}

export function partOne(input: ReturnType<typeof parse>): number {
  let sum = 0
  input.forEach(h => {
    let count = h.second.filter(n => h.first.includes(n)).length
    if (count > 0) {
      sum += Math.pow(2, count - 1)
    }
  })
  return sum
}

export function partTwo(input: ReturnType<typeof parse>): number {
  let indexCount: { [key: number]: number } = {}
  input.forEach((_, i) => {
    indexCount[i] = 1
  })

  input.forEach((h, i) => {
    let count = h.second.filter(n => h.first.includes(n)).length
    if (count > 0) {
      for (let j = i + 1; j <= i + count; j++) {
        indexCount[j] += indexCount[i]
      }
    }
  })

  return Object.values(indexCount).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
}
