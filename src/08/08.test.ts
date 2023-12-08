import { describe, expect, test } from 'bun:test'
import { partOne, parse, partTwo } from './08'

describe('Day 8', async () => {
  const { default: example } = await import('./example.txt')
  const { default: example2 } = await import('./example2.txt')
  test('Part One', () => {
    expect(partOne(parse(example))).toEqual(6)
  })

  test('Part Two', () => {
    expect(partTwo(parse(example2))).toEqual(6n)
  })
})
