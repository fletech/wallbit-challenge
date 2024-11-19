export function Headline({ children, ...props }) {
  const { hierarchy, cn } = props;
  const classNames = " uppercase font-extrabold tracking-wider";
  const hierarchyClasses = {
    main: { className: `${classNames} ${cn}  text-lg tracking-wider` },
    secondary: { className: `${classNames} ${cn}  text-sm tracking-lg` },
  };

  return <h3 className={hierarchyClasses[hierarchy].className}>{children}</h3>;
}
