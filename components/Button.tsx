import Image from 'next/image';
import { MouseEventHandler } from 'react';

type ButtonProps = {
  title: string;
  type: 'button' | 'submit' | 'reset';
  leftIcon?: string | null;
  rightIcon?: string | null;
  isSubmitting?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  textColor?: string;
  bgColor?: string;
};

function Button({
  title,
  type,
  bgColor,
  handleClick,
  isSubmitting,
  leftIcon,
  rightIcon,
  textColor,
}: ButtonProps) {
  return (
    <button
      type={type || 'button'}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4  py-3
        ${textColor ? textColor : 'text-white'}
        ${
          isSubmitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'
        } rounded text-sm font-medium max-md:w-full`}
      onClick={handleClick}
    >
      {leftIcon && (
        <Image src={leftIcon} alt="left icon" width={14} height={14} />
      )}
      {title}
      {rightIcon && (
        <Image src={rightIcon} alt="right icon" width={14} height={14} />
      )}
    </button>
  );
}

export default Button;
