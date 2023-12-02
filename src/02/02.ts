import { getLines } from '@/utils'
import { match } from 'assert'
import { colors } from 'chalk'

type colors = 'red' | 'green' | 'blue'

interface Game {
  pulls: { [key in colors]?: number }[]
}

export function parse(input: string) {
  var lines = getLines(input)
  const baseRegex = new RegExp(/Game (\d+): (.*)/)
  const games: { [key: number]: Game } = {}
  lines.forEach(l => {
    let results = l.match(baseRegex)
    let gameNumber = parseInt(results?.[1]!)
    let pulls = results?.[2]!.split('; ') || []
    let game: Game = {
      pulls: pulls.map(p => {
        var numColor = p.split(', ')
        let x: { [key: string]: number } = {}
        numColor.forEach(n => {
          let parts = n.split(' ')
          var number = parseInt(parts?.[0]!)
          var color = parts[1] as colors
          x[color] = number
        })
        return x
      })
    }
    games[gameNumber] = game
  })
  return games
}

export function partOne(input: ReturnType<typeof parse>): number {
  const limits: { [key in colors]: number } = {
    red: 12,
    green: 13,
    blue: 14
  }
  let sum = 0
  Object.entries(input).forEach(([k, v]) => {
    let possible = v.pulls.every(pull => {
      return Object.keys(limits).every(
        color => (pull[color as colors] ?? 0) <= limits[color as colors]
      )
    })
    if (possible) sum += parseInt(k)
  })
  return sum
}

export function partTwo(input: ReturnType<typeof parse>): number {
  let sum = 0
  Object.values(input).forEach(game => {
    let maxColors: { [key in colors]: number } = {
      red: 0,
      green: 0,
      blue: 0
    }
    game.pulls.forEach(pull => {
      Object.keys(maxColors).forEach(color => {
        maxColors[color as colors] = Math.max(
          pull[color as colors] ?? 0,
          maxColors[color as colors]
        )
      })
    })
    sum += maxColors.blue * maxColors.green * maxColors.red
  })
  return sum
}
