import fs from 'fs'

const input = fs.readFileSync('inputs/07', 'utf8').split('\n')

let fileSystem = {}

const goHome = () => {
  if (fileSystem['..']) {
    fileSystem = fileSystem['..']
    return goHome()
  }
}

// creates file system object
for (const line of input) {
  const words = line.split(' ')
  if (words[0] === '$') {
    const command = words[1]
    if (command === 'cd') {
      const dest = words[2]
      if (dest === '/') {
        goHome()
        continue
      }
      if (dest === '..') {
        fileSystem = fileSystem['..']
        continue
      }
      if (!fileSystem[dest]) {
        fileSystem[dest] = {}
        fileSystem[dest]['..'] = fileSystem
      }
      fileSystem = fileSystem[dest]
    }
    continue
  }
  if (words[0] === 'dir') {
    const dir = words[1]
    if (!fileSystem[dir]) {
      fileSystem[dir] = {}
      fileSystem[dir]['..'] = fileSystem
    }
    continue
  }
  const size = words[0]
  const file = words[1]
  fileSystem[file] = Number(size)
}

goHome()

const dirSizes = {}

const getDirectorySize = (directory, path) => {
  const keys = Object.keys(directory).filter((k) => k !== '..')
  const size = keys.reduce((size, k) => {
    const object = directory[k]
    if (typeof object === 'number') {
      return size + object
    }
    const dir = `${path}${k}/`
    return size + getDirectorySize(object, dir)
  }, 0)
  dirSizes[path] = size
  return size
}

getDirectorySize(fileSystem, '/')

/**
* part 01
*/
const partOne = (() => (
  Object.values(dirSizes)
    .filter((size) => size <= 100000)
    .reduce((sum, n) => sum + n, 0)
))()

/**
 * part 02
 */
const partTwo = (() => {
  const totalDiskSpace = 70000000
  const requiredSpace = 30000000
  const usedSpace = dirSizes['/']
  const unusedSpace = totalDiskSpace - usedSpace
  const target = requiredSpace - unusedSpace
  const sizes = Object.values(dirSizes).sort((a, b) => a - b)
  // modified binary search
  const findSize = (start, end) => {
    const mid = Math.floor((start + end) / 2)
    const tooLow = sizes[mid] < target
    const nextStart = tooLow ? mid + 1 : start
    const nextEnd = tooLow ? end : mid
    if (nextStart >= nextEnd) {
      return sizes[nextStart]
    }
    return findSize(nextStart, nextEnd)
  }

  return findSize(0, sizes.length - 1)
})()

console.log(partOne)
console.log(partTwo)
