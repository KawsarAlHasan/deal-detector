import React, { useState, useRef, useEffect } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { GoArrowLeft } from "react-icons/go";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useChatHistory } from "../../api-services/aiServices";
import { fetcherWithTokenPost } from "../../api-services/api";

// ─── Types ─────────────────────────────────────────────────────────────────
interface RecipeResponse {
  dish: string;
  style: string;
  items: string[];
  steps: string[];
  image_url?: string;
}

interface ChatEntry {
  id: number;
  request_data: string;
  response_data: {
    flag?: "list_generated" | "normal_response";
    response?: string | RecipeResponse;
    error?: string;
  };
  created_at: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────
const isRecipe = (r: unknown): r is RecipeResponse =>
  typeof r === "object" && r !== null && "dish" in r;

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ─── Recipe Card ─────────────────────────────────────────────────────────────
const RecipeCard = ({ recipe }: { recipe: RecipeResponse }) => (
  <div className="recipe-card">
    <div className="recipe-card__header">
      <MdOutlineRestaurantMenu className="recipe-card__icon" />
      <span className="recipe-card__title">{recipe.dish}</span>
      <span className="recipe-card__badge">{recipe.style}</span>
    </div>

    <div className="recipe-card__section">
      <p className="recipe-card__label">🧂 Ingredients</p>
      <ul className="recipe-card__chips">
        {recipe.items.map((item) => (
          <li key={item} className="recipe-card__chip">{item}</li>
        ))}
      </ul>
    </div>

    <div className="recipe-card__section">
      <p className="recipe-card__label">👨‍🍳 Steps</p>
      <ol className="recipe-card__steps">
        {recipe.steps.map((step, i) => (
          <li key={i} className="recipe-card__step">
            <span className="recipe-card__step-num">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

// ─── Avatars ─────────────────────────────────────────────────────────────────
const BotAvatar = () => <div className="avatar avatar--bot">🍴</div>;
const UserAvatar = () => <div className="avatar avatar--user">L</div>;

// ─── Typing Indicator ────────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="bubble-wrapper bubble-wrapper--bot">
    <BotAvatar />
    <div className="bubble bubble--bot bubble--typing">
      <span /><span /><span />
    </div>
  </div>
);

// ─── Bot Bubble ───────────────────────────────────────────────────────────────
const BotBubble = ({ entry }: { entry: ChatEntry }) => {
  const { flag, response, error } = entry.response_data;

  if (error)
    return (
      <div className="bubble-wrapper bubble-wrapper--bot">
        <BotAvatar />
        <div className="bubble bubble--bot bubble--error">
          ⚠️ Something went wrong. Please try again.
        </div>
      </div>
    );

  if (!flag || !response) return null;

  if (flag === "list_generated" && isRecipe(response)) {
    return (
      <div className="bubble-wrapper bubble-wrapper--bot">
        <BotAvatar />
        <RecipeCard recipe={response} />
      </div>
    );
  }

  return (
    <div className="bubble-wrapper bubble-wrapper--bot">
      <BotAvatar />
      <div className="bubble bubble--bot">{response as string}</div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ChatModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // ✅ তোমার actual hook
  const { chatHistory, isLoading, isError, mutate } = useChatHistory();

  // ✅ তোমার actual send function
  const handleSendMessage = async () => {
    const message = input.trim();
    if (!message || sending) return;
    setInput("");
    setSending(true);
    try {
      await fetcherWithTokenPost("/api/ai/generate-recipe/", {
        request_data: message,
      });
      mutate(); // refetch latest chat history
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, sending]);

  if (!open) return null;

  const messages: ChatEntry[] = chatHistory ?? [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@400;500;600&display=swap');

        .chat-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

        .chat-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.55);
          backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex; align-items: flex-end; justify-content: center;
        }
        @media (min-width: 768px) {
          .chat-overlay { align-items: flex-end; justify-content: flex-end; padding: 24px; }
        }

        .chat-panel {
          width: 100%; max-width: 440px;
          height: 90dvh; max-height: 700px;
          background: #FAFAF8;
          border-radius: 20px 20px 0 0;
          display: flex; flex-direction: column;
          overflow: hidden;
          box-shadow: 0 -8px 60px rgba(0,0,0,.3);
          animation: slideUp .35s cubic-bezier(.16,1,.3,1);
        }
        @media (min-width: 768px) {
          .chat-panel { border-radius: 20px; }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }

        /* Header */
        .chat-header {
          background: linear-gradient(135deg, #1A3A2E 0%, #0D2218 100%);
          padding: 16px 18px;
          display: flex; align-items: center; gap: 12px;
          flex-shrink: 0;
        }
        .chat-header__back {
          background: rgba(255,255,255,.12); border: none; cursor: pointer;
          color: #fff; width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; transition: background .2s; flex-shrink: 0;
        }
        .chat-header__back:hover { background: rgba(255,255,255,.22); }
        .chat-header__info { flex: 1; }
        .chat-header__name {
          font-family: 'Playfair Display', serif;
          color: #fff; font-size: 17px; margin: 0;
        }
        .chat-header__status {
          color: #7FD4A8; font-size: 12px;
          display: flex; align-items: center; gap: 5px; margin-top: 2px;
        }
        .chat-header__dot {
          width: 6px; height: 6px; border-radius: 50%; background: #7FD4A8;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }

        /* Messages */
        .chat-messages {
          flex: 1; overflow-y: auto; padding: 18px 14px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb { background: #D4C9B0; border-radius: 4px; }

        /* Empty state */
        .chat-empty {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          color: #aaa; gap: 8px; font-size: 14px; text-align: center;
          padding: 40px 20px;
        }
        .chat-empty__icon { font-size: 42px; }

        /* Bubble wrappers */
        .bubble-wrapper { display: flex; align-items: flex-end; gap: 8px; }
        .bubble-wrapper--user { flex-direction: row-reverse; }

        /* Avatars */
        .avatar {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; flex-shrink: 0;
        }
        .avatar--bot { background: linear-gradient(135deg, #1A3A2E, #2E7D52); color: #fff; }
        .avatar--user {
          background: linear-gradient(135deg, #C8860A, #E8A21A);
          color: #fff; font-weight: 700; font-size: 13px;
        }

        /* Bubbles */
        .bubble {
          padding: 10px 14px; border-radius: 18px;
          max-width: 78%; font-size: 14px; line-height: 1.55;
          animation: fadeIn .2s ease;
        }
        @keyframes fadeIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:none} }
        .bubble--user {
          background: linear-gradient(135deg, #1A3A2E, #2E7D52);
          color: #fff; border-bottom-right-radius: 4px;
        }
        .bubble--bot {
          background: #fff; color: #2D2D2D;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 12px rgba(0,0,0,.07);
        }
        .bubble--error { background: #FFF0F0 !important; color: #C0392B; }

        /* Typing dots */
        .bubble--typing {
          display: flex; align-items: center; gap: 5px; padding: 14px 18px;
        }
        .bubble--typing span {
          width: 7px; height: 7px; border-radius: 50%; background: #A0B4AA;
          animation: bounce 1.2s infinite;
        }
        .bubble--typing span:nth-child(2) { animation-delay: .2s; }
        .bubble--typing span:nth-child(3) { animation-delay: .4s; }
        @keyframes bounce {
          0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-7px)}
        }

        /* Recipe Card */
        .recipe-card {
          background: #fff; border-radius: 16px; overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,.09); max-width: 310px;
          border: 1px solid #EDE8E0; animation: fadeIn .3s ease;
        }
        .recipe-card__header {
          background: linear-gradient(135deg, #1A3A2E, #2E7D52);
          padding: 12px 14px; display: flex; align-items: center; gap: 8px;
        }
        .recipe-card__icon { color: #7FD4A8; font-size: 18px; flex-shrink: 0; }
        .recipe-card__title {
          font-family: 'Playfair Display', serif;
          color: #fff; font-size: 15px; flex: 1;
        }
        .recipe-card__badge {
          background: rgba(255,255,255,.18); color: #D4F5E6;
          font-size: 10px; padding: 2px 8px; border-radius: 20px;
          text-transform: uppercase; letter-spacing: .6px;
        }
        .recipe-card__section { padding: 10px 14px; border-bottom: 1px solid #F0EDE8; }
        .recipe-card__section:last-child { border-bottom: none; }
        .recipe-card__label {
          font-size: 10px; font-weight: 600; color: #888;
          text-transform: uppercase; letter-spacing: .6px; margin-bottom: 7px;
        }
        .recipe-card__chips {
          display: flex; flex-wrap: wrap; gap: 5px; list-style: none; padding: 0; margin: 0;
        }
        .recipe-card__chip {
          background: #F0F7F3; color: #1A3A2E;
          font-size: 11px; padding: 3px 9px; border-radius: 20px;
          border: 1px solid #C8E8D8;
        }
        .recipe-card__steps {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 7px;
        }
        .recipe-card__step { display: flex; gap: 9px; align-items: flex-start; font-size: 12px; color: #444; }
        .recipe-card__step-num {
          background: #1A3A2E; color: #fff;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 700; flex-shrink: 0; margin-top: 1px;
        }

        /* Timestamp */
        .chat-time { font-size: 10px; color: #B0A898; text-align: right; margin-top: -6px; }
        .chat-time--left { text-align: left; margin-left: 40px; }

        /* Footer */
        .chat-footer {
          background: #fff; border-top: 1px solid #EDE8E0;
          padding: 10px 12px; display: flex; flex-direction: column; gap: 8px;
          flex-shrink: 0;
        }
        .chat-quick-action {
          background: #F3F7F5; border: 1.5px dashed #A8C8B8;
          border-radius: 10px; padding: 7px 12px;
          font-size: 12px; color: #2E7D52; cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: background .2s; width: fit-content;
        }
        .chat-quick-action:hover { background: #E8F3EE; }
        .chat-input-row { display: flex; align-items: center; gap: 8px; }
        .chat-input {
          flex: 1; border: 1.5px solid #E0DBD3; border-radius: 12px;
          padding: 10px 14px; font-size: 14px; outline: none;
          background: #FAFAF8; transition: border .2s;
          font-family: 'DM Sans', sans-serif;
        }
        .chat-input:focus { border-color: #2E7D52; }
        .chat-input::placeholder { color: #B0A898; }
        .chat-send {
          width: 42px; height: 42px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, #1A3A2E, #2E7D52);
          color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; transition: transform .15s, opacity .15s; flex-shrink: 0;
        }
        .chat-send:hover { transform: scale(1.06); }
        .chat-send:disabled { opacity: .4; cursor: not-allowed; transform: none; }
      `}</style>

      <div
        className="chat-root chat-overlay"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="chat-panel">

          {/* ── Header ── */}
          <div className="chat-header">
            <button className="chat-header__back" onClick={onClose}>
              <GoArrowLeft />
            </button>
            <div className="chat-header__info">
              <h2 className="chat-header__name">Chef AI 🍴</h2>
              <div className="chat-header__status">
                <span className="chat-header__dot" />
                {isLoading ? "Loading..." : "Online – Ready to cook"}
              </div>
            </div>
            <span style={{ fontSize: 26 }}>🥗</span>
          </div>

          {/* ── Messages ── */}
          <div className="chat-messages">

            {isLoading && (
              <div className="chat-empty">
                <span className="chat-empty__icon">⏳</span>
                <span>Loading chat history...</span>
              </div>
            )}

            {isError && (
              <div className="chat-empty">
                <span className="chat-empty__icon">⚠️</span>
                <span>Failed to load history. Try again.</span>
              </div>
            )}

            {!isLoading && !isError && messages.length === 0 && (
              <div className="chat-empty">
                <span className="chat-empty__icon">🍽️</span>
                <span>Tell me what ingredients you have<br />and I'll suggest a recipe!</span>
              </div>
            )}

            {messages.map((entry) => (
              <React.Fragment key={entry.id}>
                {/* User */}
                <div className="bubble-wrapper bubble-wrapper--user">
                  <UserAvatar />
                  <div className="bubble bubble--user">{entry.request_data}</div>
                </div>
                <div className="chat-time">{formatTime(entry.created_at)}</div>

                {/* Bot */}
                {Object.keys(entry.response_data).length > 0 && (
                  <>
                    <BotBubble entry={entry} />
                    <div className="chat-time chat-time--left">
                      {formatTime(entry.created_at)}
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}

            {sending && <TypingIndicator />}

            <div ref={bottomRef} />
          </div>

          {/* ── Footer ── */}
          <div className="chat-footer">
            <button
              className="chat-quick-action"
              onClick={() => setInput("Generate a shopping list for me")}
            >
              🛒 + Generate Shopping List
            </button>

            <div className="chat-input-row">
              <input
                className="chat-input"
                type="text"
                placeholder="Type ingredients or ask for a recipe..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className="chat-send"
                onClick={handleSendMessage}
                disabled={!input.trim() || sending}
                aria-label="Send"
              >
                <BsFillSendFill />
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ChatModal;