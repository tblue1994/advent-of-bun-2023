import { getLines } from '@/utils'

export function parse(input: string): Hands[] {
  return getLines(input).map(l => {
    let parts = l.split(' ')
    return {
      cards: parts[0],
      bet: parseInt(parts[1]),
      type: getHandType(parts[0]),
      dynamicType: getDynamicHandType(parts[0])
    }
  })
}

export function partOne(input: ReturnType<typeof parse>): number {
  input.sort((a, b) => {
    if (a.type > b.type) {
      return 1
    } else if (a.type < b.type) {
      return -1
    } else {
      for (let i = 0; i < 5; i++) {
        if (cardOrder.indexOf(a.cards[i]) > cardOrder.indexOf(b.cards[i])) {
          return 1
        } else if (
          cardOrder.indexOf(a.cards[i]) < cardOrder.indexOf(b.cards[i])
        ) {
          return -1
        }
      }
      return 0
    }
  })
  input.reverse()
  return input.reduce((acc, x, i) => (acc += x.bet * (i + 1)), 0)
}

export function partTwo(input: ReturnType<typeof parse>): number {
  input.sort((a, b) => {
    if (a.dynamicType > b.dynamicType) {
      return 1
    } else if (a.dynamicType < b.dynamicType) {
      return -1
    } else {
      for (let i = 0; i < 5; i++) {
        if (
          cardOrderPart2.indexOf(a.cards[i]) >
          cardOrderPart2.indexOf(b.cards[i])
        ) {
          return 1
        } else if (
          cardOrderPart2.indexOf(a.cards[i]) <
          cardOrderPart2.indexOf(b.cards[i])
        ) {
          return -1
        }
      }
      return 0
    }
  })
  input.reverse()
  return input.reduce((acc, x, i) => (acc += x.bet * (i + 1)), 0)
}

function getHandType(cards: string): HandType {
  let cardDict: { [key: string]: number } = {}
  Array.from(cards).forEach(c => {
    cardDict[c] = cardDict[c] ? cardDict[c] + 1 : 1
  })
  let entries = Object.entries(cardDict)
  entries.sort((a, b) => {
    if (a[1] < b[1]) {
      return 1
    } else if (a[1] > b[1]) {
      return -1
    } else {
      return 0
    }
  })
  switch (entries.length) {
    case 5:
      return HandType.HighCard
    case 4:
      return HandType.OnePair
    case 1:
      return HandType.FiveKind
    case 3:
      if (entries[0][1] === 3) {
        return HandType.ThreeKind
      } else {
        return HandType.TwoPair
      }
    default: {
      if (entries[0][1] === 3) {
        return HandType.FullHouse
      } else {
        return HandType.FourKind
      }
    }
  }
}

function getDynamicHandType(cards: string): HandType {
  let cardDict: { [key: string]: number } = {}
  let jokerCount = 0
  Array.from(cards).forEach(c => {
    if (c === 'J') {
      jokerCount++
    } else {
      cardDict[c] = cardDict[c] ? cardDict[c] + 1 : 1
    }
  })
  let entries = Object.entries(cardDict)
  entries.sort((a, b) => {
    if (a[1] < b[1]) {
      return 1
    } else if (a[1] > b[1]) {
      return -1
    } else {
      return 0
    }
  })
  switch (entries.length) {
    case 5:
      return HandType.HighCard
    case 4:
      return HandType.OnePair
    case 1:
    case 0:
      return HandType.FiveKind
    case 3: {
      switch (entries[0][1] + jokerCount) {
        case 2:
          return HandType.TwoPair
        default:
          return HandType.ThreeKind
      }
    }
    default: {
      switch (entries[0][1] + jokerCount) {
        case 4:
          return HandType.FourKind
        default:
          return HandType.FullHouse
      }
    }
  }
}

enum HandType {
  FiveKind,
  FourKind,
  FullHouse,
  ThreeKind,
  TwoPair,
  OnePair,
  HighCard
}

interface Hands {
  cards: string
  type: HandType
  dynamicType: HandType
  bet: number
}

const cardOrder = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2'
]

const cardOrderPart2 = [
  'A',
  'K',
  'Q',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  'J'
]
