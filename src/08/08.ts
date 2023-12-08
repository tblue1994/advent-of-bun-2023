import { getLines } from '@/utils'

export function parse(input: string): Day8ParsedInput {
  let lines = getLines(input)
  let matches = lines.slice(1).map(l => l.match(/(.*) = \((.*), (.*)\)/))

  return {
    instructions: Array.from(lines[0]),
    leftMap: matches.reduce<{ [key: string]: string }>((acc, m) => {
      acc[m![1]] = m![2]
      return acc
    }, {}),
    rightMap: matches.reduce<{ [key: string]: string }>((acc, m) => {
      acc[m![1]] = m![3]
      return acc
    }, {})
  }
}

export function partOne(input: ReturnType<typeof parse>): number {
  return traverse(input, 0, 0, 'AAA', name => name === 'ZZZ')
}

export function partTwo(input: ReturnType<typeof parse>): bigint {
  let x = Object.keys(input.leftMap)
    .filter(n => n.endsWith('A'))
    .map(n => {
      return traverse(input, 0, 0, n, name => name.endsWith('Z'))
    })
  let hcf = 0
  for (let i = 1; i <= Math.min(...x); i++) {
    // check if is factor of both integers
    if (x.every(n => n % i === 0)) {
      hcf = i
    }
  }

  // find LCM
  return (
    x.reduce((p, e) => {
      return p * BigInt(e / hcf)
    }, 1n) * BigInt(hcf)
  )
}

type EndConditionFunc = (nodeName: string) => boolean

function traverse(
  input: Day8ParsedInput,
  instructionIndex: number,
  instructionCount: number,
  nodeName: string,
  endConditionFn: EndConditionFunc
): number {
  if (endConditionFn(nodeName)) return instructionCount
  if (instructionIndex >= input.instructions.length) instructionIndex = 0
  if (input.instructions[instructionIndex] === 'L') {
    //go left
    return traverse(
      input,
      instructionIndex + 1,
      instructionCount + 1,
      input.leftMap[nodeName],
      endConditionFn
    )
  }
  // go right
  return traverse(
    input,
    instructionIndex + 1,
    instructionCount + 1,
    input.rightMap[nodeName],
    endConditionFn
  )
}

function traverse2(
  input: Day8ParsedInput,
  instructionIndex: number,
  instructionCount: number,
  nodeNames: string[]
): number {
  if (nodeNames.every(n => n.endsWith('Z'))) return instructionCount
  if (instructionIndex >= input.instructions.length) instructionIndex = 0
  if (input.instructions[instructionIndex] === 'L') {
    //go left
    return traverse2(
      input,
      instructionIndex + 1,
      instructionCount + 1,
      nodeNames.map(n => input.leftMap[n])
    )
  }
  // go right
  return traverse2(
    input,
    instructionIndex + 1,
    instructionCount + 1,
    nodeNames.map(n => input.rightMap[n])
  )
}

interface Day8ParsedInput {
  leftMap: { [key: string]: string }
  rightMap: { [key: string]: string }
  instructions: string[]
}
