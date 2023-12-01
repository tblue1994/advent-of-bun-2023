export function parse(input: string) {
  return input.split(/\r?\n/)
}

export function partOne(input: ReturnType<typeof parse>): number {
  var sum = 0
  input.forEach(line => {
    var lastFound = false
    var firstFound = false
    for (var i = 0; i < line.length; i++) {
      if (!firstFound) {
        var n = parseCharAsInt(line[i]!)
        if (n !== undefined) {
          sum += 10 * n
          firstFound = true
        }
      }
      if (!lastFound) {
        var n = parseCharAsInt(line[line.length - i - 1]!)
        if (n !== undefined) {
          sum += n
          lastFound = true
        }
      }
    }
  })
  return sum
}

export function partTwo(input: ReturnType<typeof parse>): number {
  var sum = 0
  input.forEach(line => {
    var lastFound = false
    var firstFound = false
    for (var i = 0; i < line.length; i++) {
      if (!firstFound) {
        var n = parseCharAsInt(line[i]!)
        if (n !== undefined) {
          sum += 10 * n
          firstFound = true
        } else {
          let substring = line.substring(i)
          let x = getTextValueAsInt(substring, true)
          if (x != undefined) {
            sum += 10 * x
            firstFound = true
          }
        }
      }
      if (!lastFound) {
        var n = parseCharAsInt(line[line.length - i - 1]!)
        if (n !== undefined) {
          sum += n
          lastFound = true
        } else {
          let substring = line.substring(0, line.length - i)
          let x = getTextValueAsInt(substring, false)
          if (x != undefined) {
            sum += x
            lastFound = true
          }
        }
      }
    }
  })
  return sum
}

function parseCharAsInt(c: string): number | undefined {
  var n = parseInt(c)
  if (isNaN(n)) {
    return undefined
  }
  return n
}

function getTextValueAsInt(
  remaining: string,
  startsWith: boolean
): number | undefined {
  var numberStrings: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0
  }
  let x = undefined
  Object.keys(numberStrings).forEach(key => {
    if (
      (startsWith && remaining.startsWith(key)) ||
      (!startsWith && remaining.endsWith(key))
    ) {
      x = numberStrings[key]
    }
  })

  return x
}
