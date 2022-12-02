import fs from 'fs'

const input = fs.readFileSync('inputs/01', 'utf8').split('\n\n')

const calories = input.map((str) => str
  .split('\n')
  .reduce((sum, n) => sum + Number(n), 0)
)

/**
 * part 01
 */
const partOne = (() => {
  let highest = 0
  for (const c of calories) {
    if (c > highest) {
      highest = c
    }
  }
  return highest
})()

/**
 * part 02
 */
const partTwo = (() => {
  let second = 0
  let third = 0
  for (const c of calories) {
    if (c < third) {
      continue
    }
    if (c < second) {
      third = c
      continue
    }
    if (c === partOne) {
      continue
    }
    third = second
    second = c
  }
  return partOne + second + third
})()

console.log(partOne)
console.log(partTwo)
