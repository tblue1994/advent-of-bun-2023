import { describe, expect, test } from 'bun:test'
import { partOne, parse, partTwo } from './04'

describe('Day 4', async () => {
  const { default: example } = await import('./example.txt')
  test('Part One', () => {
    expect(partOne(parse(example))).toEqual(13)
  })

  test('Part Two', () => {
    expect(partTwo(parse(example))).toEqual(30)
  })
})
