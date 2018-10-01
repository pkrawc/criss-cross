class Cell {
  constructor(letter) {
    this.letter = letter
    this.across = null
    this.down = null
  }
}

class CellNode {
  constructor(isFirst, index) {
    this.isFirst = isFirst
    this.index = index
  }
}

class CrosswordBuilder {
  constructor(rowNumber, colNumber) {
    this.grid = [...Array(rowNumber)].map(() =>
      [...Array(colNumber)].map(() => null)
    )
    // {a: [{row: 1, column: 1}]}
    this.charIndex = {}
  }
  getDirection() {
    return Math.floor(Math.random() * 2) ? "across" : "down"
  }
  canPlaceChar(letter, row, column) {
    // no intersection
    if (this.grid[row][column] == null) return 0
    // intersection
    if (this.grid[row][column]["char"] === letter) return 1
    // collision and can't place
    return false
  }
  placeChar(letter, row, column) {
    const cell = new Cell(letter)
    this.grid[row][column] = cell
    if (!this.charIndex[letter]) this.charIndex[letter] = []
    this.charIndex[letter].push({ row, column })
  }
  canPlaceWord(word, row, column, direction) {
    let intersections = 0
    if (direction === "across") {
      // check if out of bounds
      if (
        row < 0 ||
        row >= this.grid.length ||
        column < 0 ||
        column >= this.grid[row].length
      )
        return false

      word.split("").forEach((letter, i) => {
        const result = this.canPlaceChar(letter, row, column + i)
        if (result === false) return false
        intersections += result
      })
    } else {
      // check if out of bounds
      if (row + word.length > this.grid.length) return false

      word.split("").forEach((letter, i) => {
        const result = this.canPlaceChar(letter, row + i, column)
        if (result === false) return false
        intersections += result
      })
    }
    return intersections
  }
  placeWord(word, wordIndex, row, column, direction) {
    word.split("").forEach((letter, letterIndex) => {
      const cellNode = new CellNode(letterIndex === 0, wordIndex)
      if (direction === "across") {
        this.placeChar(letter, row, column + letterIndex)
        this.grid[row][column + letterIndex][direction] = cellNode
      } else {
        this.placeChar(letter, row + letterIndex, column)
        this.grid[row + letterIndex][column][direction] = cellNode
      }
    })
  }
  getBestFit(word) {
    let options = []
    word.split("").forEach((letter, letterIndex) => {
      const possibilities = this.charIndex[letter]
      if (!possibilities) return
      // returns either false or a number of options
      possibilities.forEach(({ row, column }) => {
        const canBeAcross = this.canPlaceWord(
          word,
          row,
          column - letterIndex,
          "across"
        )
        const canBeDown = this.canPlaceWord(
          word,
          row - letterIndex,
          column,
          "down"
        )
        if (canBeAcross !== false)
          options.push({
            row: row - letterIndex,
            column: column,
            direction: "across"
          })
        if (canBeDown !== false)
          options.push({
            row: row,
            column: column - letterIndex,
            direction: "down"
          })
      })
    })
    if (options.length < 1) return false
    return options[Math.floor(Math.random() * options.length)]
  }
  set entries(entries) {
    this.wordElements = entries.map(({ word, clue }, index) => ({
      word,
      clue,
      index
    }))
  }
  get crossword() {
    // Get the first word, a direction, and the row and column for
    // the middle of the board
    const { word, index: wordIndex } = this.wordElements[0]
    const direction = this.getDirection()
    let row = this.grid.length / 2
    let column = this.grid[0].length / 2

    if (direction === "across") {
      row = row - Math.floor(word.length / 2)
    } else {
      column = column - Math.floor(word.length / 2)
    }

    if (this.canPlaceWord(word, wordIndex, row, column, direction) !== false) {
      this.placeWord(word, wordIndex, row, column, direction)
    }

    const groups = [this.wordElements.slice(1)]

    groups.forEach((group, groupIndex) => {
      // record whether we can place any words in the group or not
      let added = false
      group.forEach(wordElement => {
        const fit = this.getBestFit(wordElement.word)
        if (!fit) {
          if (groups.length - 1 === groupIndex) groups.push([])
          groups[groupIndex + 1].push(wordElement)
        } else {
          this.placeWord(
            wordElement.word,
            wordElement.index,
            fit.row,
            fit.column,
            fit.direction
          )
          added = true
        }
      })
      // if no words have been added it's pointless to continue
      if (!added) return
    })

    return this.grid.flatMap(row => row.map(cell => cell))
  }
}

export default CrosswordBuilder
