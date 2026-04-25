import { items } from '../data/items';
import type { Category, PlacedItem } from '../types';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface GgurimSuggestion {
  name: string;
  category: Category;
  itemIds: string[];
  message: string;
}

// 사용 가능한 아이템 목록을 문자열로 변환
function getAvailableItemsPrompt(): string {
  const itemsByCategory = {
    '업무': items.filter(i => i.category === '업무').map(i => i.id).join(', '),
    '생활': items.filter(i => i.category === '생활').map(i => i.id).join(', '),
    '여행': items.filter(i => i.category === '여행').map(i => i.id).join(', '),
  };

  return `
[업무]: ${itemsByCategory['업무']}
[생활]: ${itemsByCategory['생활']}
[여행]: ${itemsByCategory['여행']}
`;
}

const SYSTEM_PROMPT = `당신은 "꾸림" 앱의 AI 어시스턴트입니다. 사용자가 어떤 상황이나 활동을 설명하면, 그에 맞는 준비물 꾸러미를 추천해주세요.

⚠️ 중요: 아래 목록에 있는 아이템만 추천할 수 있습니다. 목록에 없는 아이템은 절대 추천하지 마세요!

사용 가능한 준비물 (이 중에서만 선택하세요):
${getAvailableItemsPrompt()}

응답 규칙:
1. 사용자의 상황을 이해하고 적절한 준비물을 추천하세요
2. 친근하고 도움이 되는 톤으로 응답하세요
3. 준비물을 추천할 때는 반드시 아래 JSON 형식을 응답 끝에 포함하세요:

\`\`\`json
{
  "name": "꾸러미 이름 (10자 이내)",
  "category": "업무" 또는 "생활" 또는 "여행",
  "itemIds": ["아이템ID1", "아이템ID2", ...]
}
\`\`\`

4. ⚠️ itemIds에는 위 목록에 있는 정확한 ID만 사용하세요! (예: "여권", "충전기", "우산" 등)
5. 목록에 없는 아이템(카메라, 선글라스, 지도, 옷 등)은 포함하지 마세요
6. 추천 이유도 간단히 설명해주세요
7. 사용자가 추가/삭제를 요청하면 수정된 JSON을 다시 제공하세요`;

export async function sendChatMessage(
  messages: ChatMessage[]
): Promise<{ content: string; suggestion: GgurimSuggestion | null }> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API 키가 설정되지 않았습니다.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API 요청에 실패했습니다.');
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content || '';

  // JSON 블록 파싱
  const suggestion = parseGgurimSuggestion(content);

  return { content, suggestion };
}

function parseGgurimSuggestion(content: string): GgurimSuggestion | null {
  try {
    // ```json ... ``` 블록 찾기
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    if (!jsonMatch) return null;

    const jsonStr = jsonMatch[1];
    const parsed = JSON.parse(jsonStr);

    // 유효성 검증
    if (!parsed.name || !parsed.category || !Array.isArray(parsed.itemIds)) {
      return null;
    }

    // 유효한 카테고리인지 확인
    const validCategories: Category[] = ['업무', '생활', '여행'];
    if (!validCategories.includes(parsed.category)) {
      return null;
    }

    // 유효한 아이템 ID만 필터링 (id 또는 name으로 매칭)
    const validItemIds = parsed.itemIds.filter((id: string) =>
      items.some(item => item.id === id || item.name === id)
    ).map((id: string) => {
      // name으로 매칭된 경우 id로 변환
      const item = items.find(i => i.id === id) || items.find(i => i.name === id);
      return item?.id || id;
    });

    return {
      name: parsed.name,
      category: parsed.category as Category,
      itemIds: validItemIds,
      message: content.replace(/```json[\s\S]*?```/, '').trim(),
    };
  } catch {
    return null;
  }
}

// 아이템 ID 배열을 PlacedItem 배열로 변환 (랜덤 배치)
export function itemIdsToPlacedItems(itemIds: string[]): PlacedItem[] {
  return itemIds.map((iconId, index) => {
    // 그리드 형태로 배치 (겹치지 않게)
    const cols = Math.ceil(Math.sqrt(itemIds.length));
    const row = Math.floor(index / cols);
    const col = index % cols;

    // 0.15 ~ 0.85 범위 내에서 균등 배치
    const xStep = 0.7 / cols;
    const yStep = 0.7 / Math.ceil(itemIds.length / cols);

    return {
      id: `item-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 5)}`,
      iconId,
      x: 0.15 + col * xStep + xStep / 2 + (Math.random() - 0.5) * 0.05,
      y: 0.15 + row * yStep + yStep / 2 + (Math.random() - 0.5) * 0.05,
    };
  });
}
