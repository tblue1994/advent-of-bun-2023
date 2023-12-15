export function parse(input: string) {
  return input.replace(/\r\n|\r|\n/, '').split(',')
}

export function partOne(input: ReturnType<typeof parse>): number {
  let sum = 0
  input.forEach(s => {
    sum += getHashValue(s)
  })
  return sum
}

function getHashValue(s: string): number {
  var currentValue = 0
  Array.from(s).forEach(c => {
    currentValue += c.charCodeAt(0)
    currentValue *= 17
    currentValue %= 256
  })
  return currentValue
}

export function partTwo(input: ReturnType<typeof parse>): number {
  var table: Lens[][] = Array.from({ length: 256 }, e => new Array()) //Array(256).fill(new Array())
  input.forEach(s => {
    if (s.includes('-')) {
      var label = s.split('-')[0]
      let hashIndex = getHashValue(label)
      table[hashIndex] = table[hashIndex].filter(x => x.label != label)
    } else if (s.includes('=')) {
      let parts = s.split('=')
      let hashIndex = getHashValue(parts[0])
      let index = table[hashIndex].findIndex(x => x.label === parts[0])
      if (index >= 0) {
        table[hashIndex][index] = { label: parts[0], value: Number(parts[1]) }
      } else {
        table[hashIndex].push({ label: parts[0], value: Number(parts[1]) })
      }
    }
  })

  return table.reduce((acc, arr, i) => {
    arr.forEach((l, j) => {
      acc += (i + 1) * l.value * (j + 1)
    })
    return acc
  }, 0)
}

interface Lens {
  label: string
  value: number
}
