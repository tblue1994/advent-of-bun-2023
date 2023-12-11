import { describe, expect, test } from 'bun:test'
import { partOne, parse, partTwo } from './11'

describe('Day 11', async () => {
  const { default: example } = await import('./example.txt')
  test('Part One', () => {
    expect(partOne(parse(example))).toEqual(374)
  })

  test('Part Two', () => {
    expect(partTwo(parse(example))).toEqual(82000210)
  })
})
