import { describe, expect, test } from 'bun:test'
import { partOne, parse, partTwo } from './15'

describe('Day 15', async () => {
  const { default: example } = await import('./example.txt')
  test('Part One', () => {
    expect(partOne(parse(example))).toEqual(1320)
  })

  test('Part Two', () => {
    expect(partTwo(parse(example))).toEqual(145)
  })
})
