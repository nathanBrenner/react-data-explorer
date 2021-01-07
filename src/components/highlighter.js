import React from 'react'
import styled from 'styled-components'

export default React.memo(Highlighter)

function Highlighter({ string = '', highlight = '' }) {
  const highlightStart = string.search(highlight)

  if (!highlight) {
    return <span>{string}</span>
  }

  const highlightString = string.substr(highlightStart, highlight.length)
  return (
    <span>
      {string.split(highlight).map((part, i) => (
        <span key={i}>
          {i > 0 ? (
            <HightlightedText>{highlightString}</HightlightedText>
          ) : null}
          {part}
        </span>
      ))}
    </span>
  )
}

const HightlightedText = styled.span`
  background: #8d8d8d;
  box-shadow: 0 -1px 0 2px #8d8d88;
  border-radius: 2px;
`
