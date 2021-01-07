import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';

export default function ShowMoreArrow({ open, isPrimitive }) {
  return (
    !isPrimitive && (
      <Span open={open}>
        <FontAwesomeIcon icon={faGreaterThan} />
      </Span>
    )
  );
}

const Span = styled.span`
  display: inline-block;
  padding: 0 6px;
  transform: ${(props) => (props.open ? 'rotate(90deg)' : '')};
  transition-duration: 500ms;
  cursor: pointer;
`;
