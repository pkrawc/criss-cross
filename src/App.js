import React, { Component } from "react"
import styled from "styled-components"

const colors = {
  blue_500: "#0984e3",

  grey_100: "#f7f7f7",
  grey_500: "#dfe6e9",
  grey_900: "#2d2d2d",

  alert_500: "#ff7675"
}

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
  state = {
    currentWord: "",
    currentClue: "",
    entries: []
  }
  handleAddEntry = () => {
    if (!this.state.currentWord.length || !this.state.currentClue.length) {
      return this.setState({ error: "Word and Clue cannot be empty" })
    }
    this.setState(state => ({
      error: null,
      currentWord: "",
      currentClue: "",
      entries: [
        ...state.entries,
        { word: state.currentWord, clue: state.currentClue }
      ]
    }))
  }
  handleChange = (key, e) => {
    const value = e.target.value
    this.setState({ [key]: value })
  }
  render() {
    return (
      <AppWrapper>
        <div className="grid__container">
          {this.state.entries.map(buildCrossword)}
        </div>
        <div className="entries__container">
          <ul className="entries-list">
            {this.state.entries.map((entry, i) => (
              <li className="entry" key={i}>
                <span>{entry.word}</span>
                <span>/</span>
                <span>{entry.clue}</span>
              </li>
            ))}
          </ul>
          <div className="add-entry">
            {this.state.error && <p className="error">{this.state.error}</p>}
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Word"
                value={this.state.currentWord}
                onChange={e => this.handleChange("currentWord", e)}
              />
              <input
                type="text"
                placeholder="Clue"
                value={this.state.currentClue}
                onChange={e => this.handleChange("currentClue", e)}
              />
            </div>
            <button onClick={this.handleAddEntry}>add entry</button>
          </div>
        </div>
      </AppWrapper>
    )
  }
}

const AppWrapper = styled.main`
  position: relative;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  min-height: 100vh;
  background: ${colors.grey_100};
  .grid__container {
    display: grid;
    grid: repeat(10, 10vmin) / repeat(10, 10vmin);
    align-self: start;
    justify-self: center;
    background: ${colors.grey_500};
    border: none;
    @media (min-width: 60rem) {
      grid: repeat(10, 5rem) / repeat(10, 5rem);
      border: 2px solid ${colors.grey_500};
      grid-gap: 2px;
      align-self: center;
      justify-self: center;
    }
  }
  .entries__container {
    padding: 2rem;
    padding-bottom: 0;
    align-self: end;
    .entries-list {
      margin: 0;
      padding: 0;
      .entry {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
      }
    }
    .add-entry {
      .error {
        color: ${colors.alert_500};
      }
      .input-wrapper {
        display: flex;
        input {
          display: block;
          flex: 2;
          max-width: 100%;
          padding: 1rem 2rem;
          font-size: 1.5rem;
          font-family: "IBM Plex Mono", "Courier New", Courier, monospace;
          outline: none;
          &:not(:last-of-type) {
            margin-right: 2rem;
            flex: 1;
          }
        }
      }
      button {
        display: block;
        margin-top: 2rem;
        padding: 1rem 2rem;
        background: ${colors.blue_500};
        border: none;
        color: ${colors.grey_100};
        font-size: 1.5rem;
        font-family: "IBM Plex Mono", "Courier New", Courier, monospace;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        width: 100%;
        outline: none;
      }
    }
  }
  @media (min-width: 60rem) {
    grid-template-columns: repeat(2, 1fr);
    align-content: center;
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
  background: ${colors.grey_100};
  font-size: 2rem;
  &.blank {
    background: #dfe6e9;
  }
  .first-letter {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    color: ${colors.blue_500};
    font-size: 1rem;
  }
`

export default App
