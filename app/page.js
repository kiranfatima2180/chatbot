"use client";

import { useEffect, useRef, useState } from "react";

const starterMessages = [
  {
    role: "assistant",
    content: "Hey! 👋 I’m Grok. What can I help you with?"
  }
];

export default function Home() {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function newChat() {
    setMessages(starterMessages);
    setInput("");
    setError("");
  }

  async function sendMessage(e) {
    e?.preventDefault();

    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [
      ...messages,
      { role: "user", content: text }
    ];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: nextMessages
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Grok request failed.");
      }

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.content
        }
      ]);
    } catch (err) {
      setError(err.message || "Unable to contact Grok.");
    } finally {
      setLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="app">
      <aside className="sidebar">
        <button className="new-chat" onClick={newChat}>
          ＋ New chat
        </button>

        <div className="sidebar-bottom">
          <div className="brand-mini">GROK AI</div>
          <div className="status">
            <span /> Grok online
          </div>
        </div>
      </aside>

      <section className="chat-area">
        <header className="topbar">
          <div className="top-title">
            <div className="avatar">G</div>
            <div>
              <strong>Grok</strong>
              <small>Grok AI Assistant</small>
            </div>
          </div>
        </header>

        <div className="messages">
          <div className="messages-inner">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-row ${message.role}`}
              >
                {message.role === "assistant" && (
                  <div className="message-avatar">G</div>
                )}

                <div className="bubble">
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="message-row assistant">
                <div className="message-avatar">G</div>
                <div className="bubble typing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}

            {error && (
              <div className="error">
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        <form
          className="composer-wrap"
          onSubmit={sendMessage}
        >
          <div className="composer">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Grok..."
              rows={1}
              disabled={loading}
            />

            <button
              className="send"
              type="submit"
              disabled={!input.trim() || loading}
            >
              ↑
            </button>
          </div>

          <p className="hint">
            Enter to send · Shift + Enter for a new line
          </p>
        </form>
      </section>
    </main>
  );
}