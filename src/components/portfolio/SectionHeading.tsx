import { memo, type ReactNode } from 'react';

type SectionHeadingProps = {
  kicker: string;
  title: string;
  text?: string;
  className?: string;
  titleTag?: 'h1' | 'h2';
  titleClassName?: string;
  textClassName?: string;
  children?: ReactNode;
};

export const SectionHeading = memo(function SectionHeading({
  kicker,
  title,
  text,
  className,
  titleTag = 'h2',
  titleClassName,
  textClassName,
  children,
}: SectionHeadingProps) {
  const TitleTag = titleTag;

  return (
    <div className={className ? `section-heading ${className}` : 'section-heading'}>
      <p className="section-kicker">{kicker}</p>
      <TitleTag className={titleClassName ?? 'section-title'}>{title}</TitleTag>
      {text ? <p className={textClassName ?? 'section-text'}>{text}</p> : null}
      {children}
    </div>
  );
});
