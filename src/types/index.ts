export type Category = '업무' | '생활' | '여행';

export interface PlacedItem {
  id: string;
  iconId: string;
  x: number;  // 0~1 비율 (캔버스 기준 상대 위치)
  y: number;  // 0~1 비율
}

export interface Ggurim {
  id: string;
  name: string;
  category: Category;
  backgroundId: string;
  items: PlacedItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Background {
  id: string;
  name: string;
  type: 'gradient' | 'solid' | 'pattern';
  value: string;  // CSS gradient, color, 또는 패턴 URL
  thumbnail?: string;
}

export interface ItemIcon {
  id: string;
  name: string;
  emoji: string;  // MVP에서는 이모지 사용
  category: Category;
}
