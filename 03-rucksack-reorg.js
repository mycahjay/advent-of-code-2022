import fs from 'fs'

const input = fs.readFileSync('inputs/03', 'utf8').split('\n')

/**
 * part 01
 */
const partOne = (() => {
  let sum = 0
  for (const rucksack of input) {
    const idx = rucksack.length / 2
    const compartOne = rucksack.slice(0, idx)
    const compartTwo = rucksack.slice(idx)
    for (const item of compartOne) {
      if (compartTwo.includes(item)) {
        const n = item.charCodeAt(0) - 96
        sum += n < 0 ? n + 58 : n
        break
      }
    }
  }
  return sum
})()

/**
 * part 02
 */
const partTwo = (() => {
  let sum = 0
  for (let i = 0; i < input.length; i += 3) {
    const group = input.slice(i, i + 3)
    const [elf1, elf2, elf3] = group
    for (const item of elf1) {
      if (elf2.includes(item) && elf3.includes(item)) {
        const n = item.charCodeAt(0) - 96
        sum += n < 0 ? n + 58 : n
        break
      }
    }
  }
  return sum
})()

console.log(partOne)
console.log(partTwo)
