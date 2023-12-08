import { describe, expect, test } from 'bun:test'
import { partOne, parse, partTwo } from './07'

describe('Day 7', async () => {
  const { default: example } = await import('./example.txt')
  test('Part One', () => {
    expect(partOne(parse(example))).toEqual(6440)
  })

  test('Part Two', () => {
    expect(partTwo(parse(example))).toEqual(5905)
  })
})
