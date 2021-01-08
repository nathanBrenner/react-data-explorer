import styled from 'styled-components';
import { isPrimitive } from '../utils';

export default function StyledLeaf({ data, children }) {
  let Component = LeafContainer;

  if (!isPrimitive(data)) {
    Component = LeafComposite;
  }
  return <Component>{children}</Component>;
}

const LeafContainer = styled.div`
  padding-left: 40px;
`;

const LeafComposite = styled(LeafContainer)`
  cursor: pointer;
`;
