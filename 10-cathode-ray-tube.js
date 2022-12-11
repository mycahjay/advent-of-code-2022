import fs from 'fs'
import chalk from 'chalk'

const input = fs.readFileSync('inputs/10', 'utf8').split('\n')

/**
 * part 01
 */

const partOne = (() => {
  const checkpoints = [20, 60, 100, 140, 180, 220]
  let value = 1
  let cycle = 1
  let signalSum = 0
  for (const instruction of input) {
    const prev = value
    const [command, v] = instruction.split(' ')
    cycle += command === 'addx' ? 2 : 1
    if (command === 'addx') {
      value += Number(v)
    }
    if (checkpoints[0] === cycle) {
      signalSum += checkpoints[0] * value
      checkpoints.shift()
      continue
    }
    if (checkpoints[0] === cycle - 1) {
      signalSum += checkpoints[0] * prev
      checkpoints.shift()
    }
  }
  return signalSum
})()

/**
 * part 02
 */
const partTwo = (() => {
  const rows = new Array(6).fill('').map((r) => new Array(40).fill(chalk.green('.')))
  let cycle = 0
  let x = 1
  for (const instruction of input) {
    const [command, v] = instruction.split(' ')
    const row = Math.floor(cycle / 40)
    const idx = cycle % 40
    const char = Math.abs(idx - x) <= 1 ? chalk.magenta('*') : ' '
    rows[row].splice(idx, 1, char)
    cycle++
    if (command === 'addx') {
      const row = Math.floor(cycle / 40)
      const idx = cycle % 40
      const char = Math.abs(idx - x) <= 1 ? chalk.magenta('*') : ' '
      rows[row].splice(idx, 1, char)
      cycle++
      x += Number(v)
    }
  }
  return rows.map((row) => row.join('')).join('\n')
})()

console.log(partOne)
console.log(partTwo)
