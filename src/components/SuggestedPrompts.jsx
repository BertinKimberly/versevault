import { useEffect, useRef } from "react";

const SuggestedPrompts = ({ prompts, onPromptClick, hasSidebar }) => {
  const suggestedPromptsRef = useRef(null);

  useEffect(() => {
    if (suggestedPromptsRef.current) {
      const container = suggestedPromptsRef.current;
      const handleWheel = (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      };
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, []);

  return (
    <div className={`px-6 py-4 ${hasSidebar ? 'md:ml-64' : ''}`}>
      <div ref={suggestedPromptsRef} className="flex overflow-x-scroll gap-2 hide-scrollbar">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt)}
            className="bg-blue-600/50 hover:bg-blue-600/70 text-white text-sm px-4 py-2 rounded-full transition-colors duration-300 w-fit flex items-center justify-center whitespace-nowrap"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;