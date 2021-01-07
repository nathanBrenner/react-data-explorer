import styled from 'styled-components';
import { useClickAway } from '../hooks/use-click-anyway';

export function Tooltip({
  children,
  TooltipContent,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isVisible,
  setIsVisible,
  id,
}) {
  useClickAway(id, () => setIsVisible(false));
  return (
    <TooltipContainer
      id={id}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      {isVisible && <TooltipContent />}
    </TooltipContainer>
  );
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;
