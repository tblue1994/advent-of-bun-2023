import { getLines } from '@/utils'

export function parse(input: string): Almanac {
  let almanac: Almanac = { seeds: [], maps: [] }
  let blocks = input.split(/\n\n/)
  const seedsRegex = /seeds: (.*)/
  const seedNums = blocks[0].match(seedsRegex)

  return {
    seeds: seedNums![1].split(' ').map(n => BigInt(n)),
    maps: blocks.slice(1).map(b => parseBlock(b))
  }
}

export function partOne(input: ReturnType<typeof parse>): BigInt {
  var seedValues = [...input.seeds]
  input.maps.forEach(m => {
    let updatedSeedValues: bigint[] = []
    const ranges = m.map(x => new MapRange(x))
    seedValues.forEach(sv => {
      let range = ranges.find(r => r.isValueInRange(sv))
      if (range) {
        updatedSeedValues.push(sv + range.difference)
      } else {
        updatedSeedValues.push(sv)
      }
    })
    seedValues = updatedSeedValues
  })
  seedValues.sort((a, b) => {
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    } else {
      return 0
    }
  })
  console.log(seedValues.join(' '))
  return seedValues[0]
}

export function partTwo(input: ReturnType<typeof parse>): BigInt {
  var seedRanges = buildSeedRanges(input.seeds)
  input.maps.forEach(m => {
    let mappedSeedRanges: SeedRange[] = []
    let unmappedSeedRanges: SeedRange[] = [...seedRanges]
    const ranges = m.map(x => new MapRange(x))
    ranges.forEach(r => {
      let currentUnmapped: SeedRange[] = []
      unmappedSeedRanges.forEach(sv => {
        if (r.doRangesOverlap(sv)) {
          let unhandledRange = { ...sv }
          //handle before range
          if (sv.start < r.start) {
            currentUnmapped.push({
              start: sv.start,
              end: r.start
            })
            unhandledRange.start = r.start
          }
          //handle after range
          if (sv.end > r.end) {
            currentUnmapped.push({
              start: r.end,
              end: sv.end
            })
            unhandledRange.end = r.end
          }
          //handle overlap
          mappedSeedRanges.push({
            start: unhandledRange.start + r.difference,
            end: unhandledRange.end + r.difference
          })
        } else {
          currentUnmapped.push(sv)
        }
      })
      unmappedSeedRanges = currentUnmapped
    })
    seedRanges = mappedSeedRanges.concat(unmappedSeedRanges)
  })
  seedRanges.sort((a, b) => {
    if (a.start > b.start) {
      return 1
    } else if (a.start < b.start) {
      return -1
    } else {
      return 0
    }
  })
  return seedRanges[0].start
}

interface Almanac {
  seeds: bigint[]
  maps: bigint[][][]
}

function parseBlock(blockString: string): bigint[][] {
  let lines = getLines(blockString).slice(1)
  return lines.map(l => l.split(' ').map(n => BigInt(n)))
}

class MapRange {
  start: bigint
  end: bigint
  difference: bigint
  constructor(values: bigint[]) {
    this.start = values[1]
    this.end = values[1] + values[2]
    this.difference = values[0] - values[1]
  }

  isValueInRange(value: bigint): boolean {
    return value >= this.start && value < this.end
  }

  doRangesOverlap(seedRange: SeedRange): boolean {
    return (
      (this.start <= seedRange.start && this.end > seedRange.start) ||
      (this.start < seedRange.end && this.end >= seedRange.end) ||
      (this.start >= seedRange.start && this.end <= seedRange.end)
    )
  }
}

interface SeedRange {
  start: bigint
  end: bigint
}

function buildSeedRanges(values: bigint[]): SeedRange[] {
  let ranges: SeedRange[] = []
  for (let i = 0; i < values.length; i += 2) {
    ranges.push({
      start: values[i],
      end: values[i] + values[i + 1]
    })
  }
  return ranges
}
