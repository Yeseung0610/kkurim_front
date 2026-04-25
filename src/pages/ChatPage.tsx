import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { useGgurimStore } from '../hooks/useGgurimStore';
import { sendChatMessage, itemIdsToPlacedItems } from '../utils/openai';
import { backgrounds } from '../data/backgrounds';
import { getItemById } from '../data/items';
import type { Category } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestion?: {
    name: string;
    category: Category;
    itemIds: string[];
  };
}

export default function ChatPage() {
  const navigate = useNavigate();
  const { create } = useGgurimStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '안녕하세요! 꾸림 AI입니다 🎒\n\n어떤 상황을 위한 준비물을 챙기고 싶으신가요?\n\n예시:\n• "내일 제주도 2박 3일 여행 가는데 뭐 챙겨야 할까?"\n• "재택근무하는데 필요한 것들 추천해줘"\n• "비 오는 날 외출할 때 챙길 것들"',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState<Message['suggestion'] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 스크롤 맨 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 메시지 전송
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 대화 히스토리 구성
      const chatHistory = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.content }));
      chatHistory.push({ role: 'user', content: userMessage.content });

      const { content, suggestion } = await sendChatMessage(chatHistory);

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: suggestion?.message || content,
        suggestion: suggestion ? {
          name: suggestion.name,
          category: suggestion.category,
          itemIds: suggestion.itemIds,
        } : undefined,
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (suggestion) {
        setCurrentSuggestion(assistantMessage.suggestion);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `죄송합니다. 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // 꾸러미 생성
  const handleCreateGgurim = () => {
    if (!currentSuggestion) return;

    const placedItems = itemIdsToPlacedItems(currentSuggestion.itemIds);

    const newGgurim = create({
      name: currentSuggestion.name,
      category: currentSuggestion.category,
      backgroundId: backgrounds[0].id,
      items: placedItems,
    });

    // 편집 화면으로 이동
    navigate(`/edit/${newGgurim.id}`);
  };

  // 키보드 이벤트
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header
        title="AI와 짐 꾸리기"
        showBack
        rightElement={
          currentSuggestion && (
            <button
              onClick={() => navigate('/edit/new')}
              className="text-sm text-text-primary/60 hover:text-text-primary"
            >
              직접 만들기
            </button>
          )
        }
      />

      {/* 메시지 영역 */}
      <main className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        <div className="max-w-lg mx-auto space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-text-primary text-white rounded-br-md'
                    : 'bg-white shadow-card rounded-bl-md'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </p>

                {/* 추천 아이템 미리보기 */}
                {message.suggestion && (
                  <div className="mt-3 pt-3 border-t border-accent-cream/30">
                    <p className="text-xs font-medium text-text-primary/60 mb-2">
                      추천 준비물 ({message.suggestion.itemIds.length}개)
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {message.suggestion.itemIds.map(itemId => {
                        const item = getItemById(itemId);
                        return item ? (
                          <span
                            key={itemId}
                            className="inline-flex items-center gap-1 bg-accent-cream/30 rounded-full px-2 py-1 text-xs"
                          >
                            <img src={item.image} alt={item.name} className="w-5 h-5 object-contain" />
                            <span>{item.name}</span>
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* 로딩 표시 */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white shadow-card rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-accent-sage rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-accent-sage rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-accent-sage rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* 하단 입력 영역 */}
      <div className="fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-accent-cream/30">
        <div className="max-w-lg mx-auto p-4">
          {/* 꾸러미 생성 버튼 */}
          {currentSuggestion && (
            <button
              onClick={handleCreateGgurim}
              className="w-full mb-3 btn-primary flex items-center justify-center gap-2"
            >
              <span>✨</span>
              <span>"{currentSuggestion.name}" 꾸러미 만들기</span>
            </button>
          )}

          {/* 입력 필드 */}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="어떤 상황인지 알려주세요..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-white rounded-full border border-accent-cream focus:outline-none focus:border-text-primary transition-colors text-sm disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="w-12 h-12 bg-text-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-opacity"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
