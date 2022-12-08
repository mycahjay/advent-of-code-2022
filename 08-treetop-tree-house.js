import fs from 'fs'

const input = fs.readFileSync('inputs/08', 'utf8').split('\n')

const grid = input.map((str) => str.split('').map((str) => Number(str)))

const nRows = grid.length
const nCols = grid[0].length

/**
 * part 01
 */
const partOne = (() => {
  let n = 0
  const borderTrees = 2 * nRows + 2 * nCols - 4
  grid.forEach((row, rowIdx) => {
    if (rowIdx === 0 || rowIdx === nRows - 1) {
      return
    }
    row.forEach((tree, colIdx) => {
      if (colIdx === 0 || colIdx === nCols - 1) {
        return
      }
      let visible = true

      // ABOVE
      for (let i = rowIdx - 1; i >= 0; i--) {
        const neighbor = grid[i][colIdx]
        if (neighbor >= tree) {
          visible = false
          break
        }
      }
      if (visible) {
        n += 1
        return
      }
      visible = true

      // BELOW
      for (let i = rowIdx + 1; i < nRows; i++) {
        const neighbor = grid[i][colIdx]
        if (neighbor >= tree) {
          visible = false
          break
        }
      }
      if (visible) {
        n += 1
        return
      }
      visible = true

      // RIGHT
      for (let i = colIdx + 1; i < nCols; i++) {
        const neighbor = grid[rowIdx][i]
        if (neighbor >= tree) {
          visible = false
          break
        }
      }
      if (visible) {
        n += 1
        return
      }
      visible = true

      // LEFT
      for (let i = colIdx - 1; i >= 0; i--) {
        const neighbor = grid[rowIdx][i]
        if (neighbor >= tree) {
          visible = false
          break
        }
      }
      if (visible) {
        n += 1
      }
    })
  })
  return n + borderTrees
})()

/**
 * part 02
 */
const partTwo = (() => {
  let bestScore = 0
  grid.forEach((row, rowIdx) => {
    if (rowIdx === 0 || rowIdx === nRows - 1) {
      return
    }
    row.forEach((tree, colIdx) => {
      if (colIdx === 0 || colIdx === nCols - 1) {
        return
      }

      // ABOVE
      let scenicScore = 1
      for (let i = rowIdx - 1; i >= 0; i--) {
        const neighbor = grid[i][colIdx]
        if (i === 0 || neighbor >= tree) {
          scenicScore *= rowIdx - i
          break
        }
      }

      // BELOW
      for (let i = rowIdx + 1; i < nRows; i++) {
        const neighbor = grid[i][colIdx]
        if (i === nRows - 1 || neighbor >= tree) {
          scenicScore *= i - rowIdx
          break
        }
      }

      // RIGHT
      for (let i = colIdx + 1; i < nCols; i++) {
        const neighbor = grid[rowIdx][i]
        if (i === nCols - 1 || neighbor >= tree) {
          scenicScore *= i - colIdx
          break
        }
      }

      // // LEFT
      for (let i = colIdx - 1; i >= 0; i--) {
        const neighbor = grid[rowIdx][i]
        if (i === 0 || neighbor >= tree) {
          scenicScore *= colIdx - i
          break
        }
      }

      if (scenicScore > bestScore) {
        bestScore = scenicScore
      }
    })
  })
  return bestScore
})()

console.log(partOne)
console.log(partTwo)
