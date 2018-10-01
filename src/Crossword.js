import React from "react"
import styled, { css } from "styled-components"
import { colors } from "./constants"
import CrosswordBuilder from "./CrosswordBuilder"

class Crossword extends React.PureComponent {
  crossword = new CrosswordBuilder(this.props.rows, this.props.columns)
  render() {
    const { entries } = this.props
    this.crossword.entries = entries
    return entries ? (
      <CrosswordWrapper>
        {this.crossword.crossword.map((letter, i) => {
          if (!letter) return <CellWrapper blank key={i} />
          return <CellWrapper key={i} letter={letter} />
        })}
      </CrosswordWrapper>
    ) : (
      <div className="empty-state">enter a word and clue to get started</div>
    )
  }
}

const CrosswordWrapper = styled.section`
  display: grid;
  grid: repeat(20, calc(5vmin - 2px)) / repeat(20, calc(5vmin - 2px));
  align-self: start;
  justify-self: center;
  background: ${colors.grey_500};
  grid-gap: 2px;
  @media (min-width: 60rem) {
    grid: repeat(20, 2.5rem) / repeat(20, 2.5rem);
    align-self: center;
  }
`

const isBlank = css`
  background: ${colors.grey_500};
`

const CellWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.grey_100};
  font-size: 2rem;
  ${({ blank }) => blank && isBlank};
  .first-letter {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    color: ${colors.blue_500};
    font-size: 1rem;
  }
`

export default Crossword
