import { describe, expect, test } from 'bun:test'
import { partOne, parse, partTwo } from './02'

describe('Day 2', async () => {
  const { default: example } = await import('./example.txt')
  test('Part One', () => {
    expect(partOne(parse(example))).toEqual(8)
  })

  test('Part Two', () => {
    expect(partTwo(parse(example))).toEqual(2286)
  })
})
