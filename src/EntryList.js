import React from "react"
import styled from "styled-components"
import { colors } from "./constants"

const EntryList = props => (
  <EntriesWrapper>
    <ul className="entries-list">
      {props.entries.map((entry, i) => (
        <li className="entry" key={i}>
          <span>{entry.word}</span>
          <span>/</span>
          <span>{entry.clue}</span>
        </li>
      ))}
    </ul>
    <div className="add-entry">
      {props.error && <p className="error">{props.error}</p>}
      <input
        type="text"
        placeholder="Word"
        className="word"
        value={props.currentWord}
        onChange={e => props.handleChange("currentWord", e)}
      />
      <input
        type="text"
        placeholder="Clue"
        className="clue"
        value={props.currentClue}
        onChange={e => props.handleChange("currentClue", e)}
      />
      <button onClick={props.handleAddEntry}>add entry</button>
    </div>
  </EntriesWrapper>
)

const EntriesWrapper = styled.section`
  padding: 2rem;
  align-self: end;
  .entries-list {
    margin: 0;
    padding: 0;
    padding-bottom: 1rem;
    .entry {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
    }
  }
  .add-entry {
    display: flex;
    flex-wrap: wrap;
  }
  .error {
    color: ${colors.alert_500};
    width: 100%;
  }
  input.word,
  input.clue {
    display: block;
    padding: 1rem 2rem;
    font-family: "IBM Plex Mono", "Courier New", Courier, monospace;
    font-size: 1.5rem;
    outline: none;
  }
  input.word {
    flex: 1;
  }
  input.clue {
    flex: 2;
    margin-top: 1rem;
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

  @media (min-width: 50rem) {
    input.word {
      margin-right: 1rem;
    }
    input.clue {
      margin-top: 0;
    }
  }
`

export default EntryList
