import fs from 'fs'

const input = fs.readFileSync('inputs/02', 'utf8').split('\n')

const shapePoints = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  X: 1, // rock
  Y: 2, // paper
  Z: 3 // scissors
}

const outcomePoints = {
  0: 3, // tie
  1: 6, // win
  2: 0 // lose
}

/**
 * part 01
 */
const partOne = (() => {
  return input.reduce((score, columns) => {
    const me = shapePoints[columns[2]]
    const them = shapePoints[columns[0]]
    let outcome = me - them
    if (outcome < 0) {
      outcome += 3
    }
    const points = outcomePoints[outcome]
    return score + points + me
  }, 0)
})()

/**
 * part 02
 */
const partTwo = (() => {
  const outcomes = {
    X: 2, // lose
    Y: 0, // tie
    Z: 1 // win
  }
  return input.reduce((score, columns) => {
    const them = shapePoints[columns[0]]
    const outcome = outcomes[columns[2]]
    const points = outcomePoints[outcome]
    let me = outcome + them
    if (me > 3) {
      me -= 3
    }
    return score + points + me
  }, 0)
})()

console.log(partOne)
console.log(partTwo)
