import { useState } from 'react';
import { Tooltip } from './tooltip';

export function OverlayTrigger({
  event,
  Content,
  children,
  id,
  ignore = false,
}) {
  const [isVisible, setIsVisible] = useState(false);

  function onMouseEvent(state, trigger) {
    if (!ignore) {
      if (event === 'trigger') {
        setIsVisible(state);
      }
      if (event === trigger) {
        setIsVisible(state);
      }
    }
  }
  return (
    <Tooltip
      id={id}
      TooltipContent={Content}
      isVisible={isVisible}
      onClick={() => onMouseEvent(!isVisible, 'click')}
      onMouseEnter={() => onMouseEvent(true, 'hover')}
      onMouseLeave={() => onMouseEvent(false, 'hover')}
      setIsVisible={setIsVisible}
    >
      {children}
    </Tooltip>
  );
}
