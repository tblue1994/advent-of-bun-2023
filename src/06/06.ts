import { getLines } from '@/utils'

export function parse(input: string) {
  const regex = /.*: *(.*)/
  let lines = getLines(input)
  let matches = lines.map(l => l.match(regex))
  let arrays = matches.map(m => m![1].split(/ +/).map(n => parseInt(n)))
  return arrays
}

export function partOne(input: ReturnType<typeof parse>): bigint {
  var product = 1n

  for (let i = 0; i < input[0].length; i++) {
    product *= getCountOfWinningCombinations(
      BigInt(input[0][i]),
      BigInt(input[1][i])
    )
  }

  return product
}

export function partTwo(input: ReturnType<typeof parse>): bigint {
  let totalTime = BigInt(input[0].join(''))
  let distanceToBeat = BigInt(input[1].join(''))
  return getCountOfWinningCombinations(totalTime, distanceToBeat)
}

function getCountOfWinningCombinations(
  totalTime: bigint,
  distanceToBeat: bigint
): bigint {
  let count: bigint = 0n
  for (let time = 1n; time < totalTime; time++) {
    if (time * (totalTime - time) > distanceToBeat) {
      count = totalTime - 2n * time + 1n
      break
    }
  }
  return count
}
