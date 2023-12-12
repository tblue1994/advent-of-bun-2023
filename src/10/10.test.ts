import { describe, expect, test } from 'bun:test'
import { partOne, parse, partTwo } from './10'

describe('Day 10', async () => {
  const { default: example } = await import('./example.txt')
  test('Part One', () => {
    expect(partOne(parse(example))).toEqual(8)
  })
  const { default: example2 } = await import('./example2.txt')
  test('Part Two', () => {
    expect(partTwo(parse(example2))).toEqual(10)
  })
})
