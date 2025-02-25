const Button = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      className={
        "w-full px-4 py-2 text-white bg-purple-500 rounded-lg disabled:bg-neutral-200" +
        (className ? ` ${className}` : "")
      }
      {...props}
    />
  );
};

export default Button;
