import React, { ReactNode } from 'react';
import { redBorderButtonStyle, whiteButtonStyle, greenBorderButtonStyle, blueBorderButtonStyle } from './styles';

export interface IButtonProps {
  color?: 'white' | 'red-border' | 'green-border' | 'red' | 'green' | 'blue-border';
  type?: 'normal' | 'circle' | 'big' | 'small';
  disabled?: boolean;
  additionalClasses?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: IButtonProps) => {
  const { color, type = 'normal', disabled, additionalClasses = '', children, onClick } = props;
  let buttonClasses;
  switch (color) {
    case 'white':
      buttonClasses = whiteButtonStyle(additionalClasses, type);
      break;
    case 'red-border':
      buttonClasses = redBorderButtonStyle(additionalClasses, type);
      break;
    case 'green-border':
      buttonClasses = greenBorderButtonStyle(additionalClasses, type);
      break;
    case 'blue-border':
      buttonClasses = blueBorderButtonStyle(additionalClasses, type);
      break;
    default:
      buttonClasses = whiteButtonStyle(additionalClasses, type);
  }
  if (disabled) {
    buttonClasses += ' disabled';
  }
  return (
    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => (onClick ? onClick(e) : null)} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
