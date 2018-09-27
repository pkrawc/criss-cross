import React, { Component } from "react"
import styled from "styled-components"

const words = [
  { word: "space", clue: "Something in a room and above your head" },
  { word: "knife", clue: "Something in a room and above your head" },
  { word: "chocolate", clue: "Something in a room and above your head" },
  { word: "collander", clue: "Something in a room and above your head" },
  { word: "computer", clue: "Something in a room and above your head" },
  { word: "phone", clue: "Something in a room and above your head" },
  { word: "graph", clue: "Something in a room and above your head" },
  { word: "sneaker", clue: "Something in a room and above your head" },
  { word: "ribeye", clue: "Something in a room and above your head" },
  { word: "lawnmower", clue: "Something in a room and above your head" },
  { word: "grass", clue: "Something in a room and above your head" },
  { word: "landlord", clue: "Something in a room and above your head" }
]

const randomDirection = () =>
  Math.floor(Math.random() * 2) ? "across" : "down"

const buildCrossword = (entry, wordIndex) => {
  console.log(randomDirection())
  const letters = entry.word.split("")
  let cellArray = []
  for (let i = 0; i < letters.length + 1; i++) {
    if (letters[i])
      cellArray.push({
        letter: letters[i],
        wordIndex,
        first_letter: i === 0 ? true : false
      })
    else cellArray.push({ letter: false, wordIndex, first_letter: false })
  }
  return cellArray.map((letter, i) => (
    <Cell key={i} letter={letter}>
      {letter.first_letter && (
        <span className="first-letter">{letter.wordIndex + 1}</span>
      )}
    </Cell>
  ))
}

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <h1 className="app-title">Crossword</h1>
        <div className="grid__container">{words.map(buildCrossword)}</div>
      </AppWrapper>
    )
  }
}

const AppWrapper = styled.main`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f7f7f7;
  .app-title {
    margin: 0;
    position: absolute;
    top: calc(100% - 2rem);
    left: 2rem;
    font-size: 3rem;
    font-style: italic;
    color: #0984e3;
    transform: rotate(270deg);
    transform-origin: left top 0;
  }
  .grid__container {
    display: grid;
    grid: repeat(10, 5rem) / repeat(10, 5rem);
    justify-content: center;
    align-content: center;
    grid-gap: 2px;
    background: #dfe6e9;
    border: 2px solid #dfe6e9;
  }
`

const Cell = styled.div.attrs({
  className: ({ letter: { letter, first_letter } }) =>
    !letter ? "blank" : first_letter ? "first-letter" : ""
})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  font-size: 2rem;
  &.blank {
    background: #dfe6e9;
  }
  .first-letter {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    color: #0984e3;
    font-size: 1rem;
  }
`

export default App
