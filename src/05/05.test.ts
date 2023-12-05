import { describe, expect, test } from 'bun:test'
import { partOne, parse, partTwo } from './05'

describe('Day 5', async () => {
  const { default: example } = await import('./example.txt')
  test('Part One', () => {
    expect(partOne(parse(example))).toEqual(35n)
  })

  test('Part Two', () => {
    expect(partTwo(parse(example))).toEqual(46n)
  })
})
