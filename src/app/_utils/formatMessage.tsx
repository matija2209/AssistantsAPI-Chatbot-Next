export const formatMessage = (text: string) => {
  const parts = text.split(/(".*?")/);
  return parts.map((part, index) => {
    // Check if the part is within quotes
    if (part.startsWith('"') && part.endsWith('"')) {
      return (
        <span key={index} className="italic">
          {part}
        </span>
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });
};
