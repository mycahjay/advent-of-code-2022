import fs from 'fs'

const input = fs.readFileSync('inputs/05', 'utf8').split('\n\n')

const rows = input[0]
  .split('\n')
  .slice(0, -1)

const instructions = input[1]
  .split('\n')
  .map((line) => {
    const words = line.split(' ')
    return [words[1], words[3], words[5]]
  })

const stackIds = input[0]
  .split('\n')
  .slice(-1)[0]
  .split(' ')
  .filter((n) => n)

const stacksInit = (stacks) => (row) => {
  let i = 1
  for (const stack of Object.keys(stacks)) {
    const crate = row[i]?.trim()
    if (crate) {
      stacks[stack].unshift(crate)
    }
    i += 4
  }
}

const getTopCrates = (stacks) => Object.values(stacks)
  .reduce((topCrates, stack) => {
    return topCrates + stack.pop()
  }, '')

/**
 * part 01
 */
const partOne = (() => {
  const stacks = stackIds
    .reduce((stacks, id) => ({
      ...stacks,
      [id]: []
    }), {})
  rows.forEach(stacksInit(stacks))
  instructions.forEach(([amnt, origin, dest]) => {
    for (let c = Number(amnt); c > 0; c--) {
      const crate = stacks[origin].pop()
      stacks[dest].push(crate)
    }
  })
  return getTopCrates(stacks)
})()

/**
 * part 02
 */
const partTwo = (() => {
  const stacks = stackIds
    .reduce((stacks, id) => ({
      ...stacks,
      [id]: []
    }), {})
  rows.forEach(stacksInit(stacks))
  instructions.forEach(([amnt, origin, dest]) => {
    const group = []
    for (let c = Number(amnt); c > 0; c--) {
      const crate = stacks[origin].pop()
      group.unshift(crate)
    }
    stacks[dest].push(...group)
  })
  return getTopCrates(stacks)
})()

console.log(partOne)
console.log(partTwo)
