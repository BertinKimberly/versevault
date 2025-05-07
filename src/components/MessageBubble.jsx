import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MessageBubble = ({ message }) => {
  return (
    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-3/4 rounded-xl p-4 ${
          message.role === "user"
            ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
            : "bg-white/10 backdrop-blur-lg text-white"
        } shadow-md`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const isGospelCode = String(children).toLowerCase().includes("scripture") ||
                String(children).toLowerCase().includes("verse");
              if (!inline && !isGospelCode) {
                return (
                  <p>I'm here to assist with Bible-related questions and Christian living. Please ask about those topics.</p>
                );
              }
              return inline ? (
                <code className="bg-white/20 rounded px-1 py-0.5" {...props}>
                  {children}
                </code>
              ) : (
                <div className="rounded-lg p-3 bg-white/10 overflow-x-auto">
                  <code {...props}>{children}</code>
                </div>
              );
            },
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-md font-bold mb-2">{children}</h3>,
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-blue-200 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 pl-4 italic my-2 border-white/30">
                {children}
              </blockquote>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MessageBubble;