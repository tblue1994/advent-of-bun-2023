import { describe, expect, test } from 'bun:test'
import { partOne, parse, partTwo } from './09'

describe('Day 9', async () => {
  const { default: example } = await import('./example.txt')
  test('Part One', () => {
    expect(partOne(parse(example))).toEqual(114)
  })

  test('Part Two', () => {
    expect(partTwo(parse(example))).toEqual(2)
  })
})
