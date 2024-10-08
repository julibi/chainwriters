import React, { ReactElement, Ref } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { useDarkMode } from '../hooks/useDarkMode';
import { isValidUrl } from '../utils/isValidUrl';
import LinkWrapper from './LinkWrapper';

const TOOLTIPTHEMES = ['light', 'dark'] as const;
export const TooltipThemes = TOOLTIPTHEMES;
export type TooltipTheme = typeof TOOLTIPTHEMES[number];

const TOOLTIPPLACEMENTTYPES = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'auto',
  'auto-start',
  'auto-end',
] as const;
export const TooltipPlacementTypes = TOOLTIPPLACEMENTTYPES;
export type TooltipPlacementType = typeof TOOLTIPPLACEMENTTYPES[number];

export interface TooltipProps {
  children?: ReactElement;
  content?: string | ReactElement;
  className?: string;
  forwardedRef?: Ref<HTMLButtonElement>;
  placement?: TooltipPlacementType;
  isArrow?: boolean;
  theme?: TooltipTheme;
}

const TooltipComponent = ({
  children,
  content,
  className = '',
  theme,
  placement = 'auto',
  isArrow = true,
  forwardedRef,
  ...props
}: TooltipProps) => {
  const isDarkMode = useDarkMode();
  const renderContent = () => {
    if (typeof content === 'string') {
      const splitString = content.split(' ');
      const stringWithLink = splitString.map((morphem) =>
        isValidUrl(morphem) ? (
          <LinkWrapper url={morphem} color="#FFF">
            {morphem}
          </LinkWrapper>
        ) : (
          morphem + ' '
        )
      );
      return <div>{stringWithLink}</div>;
    }
    return <div>{content}</div>;
  };

  return (
    <Tippy
      content={renderContent()}
      interactive
      arrow={isArrow}
      theme={theme ? theme : isDarkMode ? 'light' : 'dark'}
      placement={placement}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </Tippy>
  );
};

export const Tooltip = React.forwardRef<HTMLButtonElement, TooltipProps>(
  ({ children, ...props }, ref) => (
    <TooltipComponent forwardedRef={ref} {...props}>
      {children}
    </TooltipComponent>
  )
);
