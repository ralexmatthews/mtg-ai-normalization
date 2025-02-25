const TextArea = ({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={
        "w-full resize-none rounded-lg px-4 py-2 border border-neutral-300 h-96" +
        (className ? ` ${className}` : "")
      }
      {...props}
    />
  );
};

export default TextArea;
