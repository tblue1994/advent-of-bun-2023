import { describe, expect, test } from 'bun:test'
import { partOne, parse, partTwo } from './03'

describe('Day 3', async () => {
  const { default: example } = await import('./example.txt')
  test('Part One', () => {
    expect(partOne(parse(example))).toEqual(4361)
  })

  test('Part Two', () => {
    expect(partTwo(parse(example))).toEqual(467835)
  })
})
