import React, { Component } from "react"
import styled from "styled-components"
import { colors } from "./constants"
import Crossword from "./Crossword"
import EntryList from "./EntryList"

class App extends Component {
  state = {
    currentWord: "",
    currentClue: "",
    entries: [{ word: "example", clue: "A working test" }]
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
        {
          word: state.currentWord.trim().toLowerCase(),
          clue: state.currentClue
        }
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
        <Crossword entries={this.state.entries} rows={20} columns={20} />
        <EntryList
          entries={this.state.entries}
          error={this.state.error}
          currentClue={this.state.currentClue}
          currentWord={this.state.currentWord}
          handleChange={this.handleChange}
          handleAddEntry={this.handleAddEntry}
        />
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
  @media (min-width: 60rem) {
    grid-template-columns: repeat(2, 1fr);
    align-content: center;
  }
`

export default App
