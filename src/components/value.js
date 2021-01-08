import styled from 'styled-components';
import Highlighter from './highlighter';
import { inQuery, items, type } from '../utils';

export default function Value({ data, query, path }) {
  const t = type(data);

  switch (t) {
    case 'Array':
      return rootCount({ query, data, path });
    case 'Object':
      return (
        <TitleContainer>
          {`{ } ${items(
            Object.entries(data).filter(inQuery({ query, path })).length,
            'field',
          )}`}
        </TitleContainer>
      );
    default:
      return (
        <LiteralContainer>
          "<Highlighter string={String(data)} highlight={query} />"
        </LiteralContainer>
      );
  }
}

function rootCount({ query, data, path }) {
  const length =
    query !== ''
      ? data.reduce((a, d) => {
          const isValid =
            Object.entries(d).filter(inQuery({ query, path })).length > 0
              ? 1
              : 0;
          return a + isValid;
        }, 0)
      : data.length;

  return <TitleContainer>[ ] {items(length)}</TitleContainer>;
}

const TitleContainer = styled.span`
  margin-left: 5px;
`;

const LiteralContainer = styled(TitleContainer)`
  color => ${(props) => props.color || '#fff'}
`;
