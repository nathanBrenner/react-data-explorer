import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressArrowsAlt,
  faExpandArrowsAlt,
  faFileDownload,
} from '@fortawesome/free-solid-svg-icons';

import { OverlayTrigger } from './overlay-trigger';

export default function Toolbar({ onChange, onAllExpand, onDownload }) {
  const [isExpanded, setExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    onAllExpand(isExpanded);
    if (!isExpanded) {
      setSearch('');
      onChange('');
    }
  }, [isExpanded]);

  useEffect(() => {
    const timer = setInterval(handleSearch, 200);
    return () => clearInterval(timer);
  }, [search]);

  function onSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
    if (!e.target.value) {
      onAllExpand(false);
      setExpanded(false);
    }
  }

  function onKeyPress(e) {
    if (e.keyCode === 13) {
      handleSearch();
    }
  }

  function handleSearch() {
    if (search !== currentQuery) {
      onChange(search);
      setCurrentQuery(search);
    }
  }

  return (
    <OuterContainer>
      <Icons>
        <OverlayTrigger
          event='hover'
          Content={() => (
            <TooltipContents position={{ top: '-30px', right: '-33px' }}>
              {isExpanded ? 'collapse' : 'expand'} data
            </TooltipContents>
          )}
        >
          <IconContainer onClick={() => setExpanded((b) => !b)}>
            <FontAwesomeIcon
              icon={isExpanded ? faCompressArrowsAlt : faExpandArrowsAlt}
            />
          </IconContainer>
        </OverlayTrigger>

        <OverlayTrigger
          event='hover'
          Content={() => (
            <TooltipContents position={{ top: '-23px', right: '-40px' }}>
              download data
            </TooltipContents>
          )}
        >
          <IconContainer marginTop='5px' onClick={onDownload}>
            <FontAwesomeIcon icon={faFileDownload} />
          </IconContainer>
        </OverlayTrigger>
      </Icons>
      <Container>
        <StyledInput
          type='search'
          placeholder='search'
          value={search}
          onChange={onSearch}
          onKeyPress={onKeyPress}
        />
      </Container>
    </OuterContainer>
  );
}

const TooltipContents = styled.div`
  white-space: nowrap;
  width: auto;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  ${(props) => props.position};
  &::after {
    content: ' ';
    border-style: solid;
    position: absolute;
    border-color: transparent;
    ${(props) => props.arrowStyles}
  }

  background: #fff;
  color: rgb(61, 61, 107);
  font-size: 14px;
`;

const OuterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 22px;
  padding-left: 20px;
`;

const IconContainer = styled.div`
  width: 30px;
  margin-top: ${(props) => props.marginTop || 0};
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-flow: column;
  max-width: 304px;
`;
const StyledInput = styled.input`
  // overrides the accessibility background color of an input box... :/
  background-color: rgb(254, 254, 254);
  box-shadow: rgb(254, 254, 254) 0 0 0 30px inset;
  // ================================================================:/

  border: 3px solid #ececec;
  font-size: 14px;
  flex: 0 0 auto;
  height: 40px;
  width: 100%;
  min-width: 300px;
  margin: 0 10px 10px 0;
  padding: 2px;
  padding-left: 10px;
`;

// const BlueTooltipContents = styled.div`
// white-space: nowrap;
// width: auto;
// background: #2d2e56;
// color: white;
// text-align: center;
// padding: 5px;
// border-radius: 6px;
// position: absolute;
// z-index: ${({ theme }) => theme.zIndex.one};
// ${(props) => props.position};
// &::after {
//   content: ' ';
//   border-style: solid;
//   position: absolute;
//   border-color: transparent;
//   ${(props) => props.arrowStyles}
// }
// `;
