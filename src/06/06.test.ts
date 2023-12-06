import { describe, expect, test } from 'bun:test'
import { partOne, parse, partTwo } from './06'

describe('Day 6', async () => {
  const { default: example } = await import('./example.txt')
  test('Part One', () => {
    expect(partOne(parse(example))).toEqual(288n)
  })

  test('Part Two', () => {
    expect(partTwo(parse(example))).toEqual(71503n)
  })
})
