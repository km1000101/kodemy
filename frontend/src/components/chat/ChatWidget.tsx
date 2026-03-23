"use client";

import { useState } from "react";

// Official Gradio demo - working chat interface (echo demo); many other Spaces have runtime/API issues
const DEFAULT_SPACE_URL =
  process.env.NEXT_PUBLIC_HF_CHAT_SPACE_URL ??
  "https://gradio-chatinterface-streaming-echo.hf.space";

const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Toggle button with label */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {!isOpen && (
          <span className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs font-medium text-white shadow-lg animate-fade-in">
            Chat with AI
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            if (next) setIsLoading(true);
          }}
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#a435f0]/50 focus:ring-offset-2 focus:ring-offset-[#f7f9fa] ${
            isOpen
              ? "bg-zinc-700 hover:bg-zinc-600"
              : "bg-[#a435f0] hover:scale-105 hover:bg-[#8710d8] hover:shadow-xl hover:shadow-[#a435f0]/25 animate-pulse-glow"
          }`}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </button>
      </div>

      {/* Slide-up panel */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex items-end justify-end p-0 sm:p-4 sm:pt-16"
          role="dialog"
          aria-label="Chat window"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm sm:bg-black/20"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />
          <div
            className="animate-scale-in relative flex h-[90vh] w-full max-w-[100vw] flex-col overflow-hidden rounded-t-3xl border border-zinc-200/80 bg-white shadow-2xl sm:h-[640px] sm:max-h-[85vh] sm:w-[420px] sm:rounded-2xl sm:rounded-br-2xl"
            style={{ boxShadow: "0 -4px 24px -4px rgb(0 0 0 / 0.1), 0 0 0 1px rgb(0 0 0 / 0.04)" }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-100 bg-gradient-to-r from-[#a435f0]/5 to-transparent px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#a435f0] text-white shadow-sm">
                  <ChatIcon />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">
                    Kodemy AI Assistant
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Powered by Hugging Face
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={DEFAULT_SPACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-[#a435f0]"
                >
                  <ExternalIcon />
                  <span className="hidden sm:inline">Open in tab</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                  aria-label="Close"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="relative min-h-0 flex-1 bg-zinc-50/50">
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#a435f0]" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#a435f0]" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#a435f0]" style={{ animationDelay: "300ms" }} />
                  </div>
                  <p className="text-sm font-medium text-zinc-600">
                    Connecting to AI assistant...
                  </p>
                </div>
              )}
              <iframe
                src={DEFAULT_SPACE_URL}
                title="Hugging Face Chat"
                className="absolute inset-0 min-h-0 w-full border-0"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
