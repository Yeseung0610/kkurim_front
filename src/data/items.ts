import type { ItemIcon, Category } from '../types';

export const items: ItemIcon[] = [
  // 업무 카테고리 (10개)
  { id: 'work-laptop', name: '노트북', emoji: '💻', category: '업무' },
  { id: 'work-charger', name: '충전기', emoji: '🔌', category: '업무' },
  { id: 'work-mouse', name: '마우스', emoji: '🖱️', category: '업무' },
  { id: 'work-notebook', name: '노트', emoji: '📓', category: '업무' },
  { id: 'work-pen', name: '펜', emoji: '🖊️', category: '업무' },
  { id: 'work-headphones', name: '헤드폰', emoji: '🎧', category: '업무' },
  { id: 'work-usb', name: 'USB', emoji: '💾', category: '업무' },
  { id: 'work-card', name: '명함', emoji: '💳', category: '업무' },
  { id: 'work-glasses', name: '안경', emoji: '👓', category: '업무' },
  { id: 'work-coffee', name: '커피', emoji: '☕', category: '업무' },

  // 생활 카테고리 (10개)
  { id: 'life-wallet', name: '지갑', emoji: '👛', category: '생활' },
  { id: 'life-keys', name: '열쇠', emoji: '🔑', category: '생활' },
  { id: 'life-phone', name: '휴대폰', emoji: '📱', category: '생활' },
  { id: 'life-umbrella', name: '우산', emoji: '☂️', category: '생활' },
  { id: 'life-mask', name: '마스크', emoji: '😷', category: '생활' },
  { id: 'life-tissues', name: '휴지', emoji: '🧻', category: '생활' },
  { id: 'life-sanitizer', name: '손소독제', emoji: '🧴', category: '생활' },
  { id: 'life-snack', name: '간식', emoji: '🍪', category: '생활' },
  { id: 'life-water', name: '물병', emoji: '🧃', category: '생활' },
  { id: 'life-bag', name: '에코백', emoji: '👜', category: '생활' },

  // 여행 카테고리 (10개)
  { id: 'travel-passport', name: '여권', emoji: '🛂', category: '여행' },
  { id: 'travel-ticket', name: '티켓', emoji: '🎫', category: '여행' },
  { id: 'travel-luggage', name: '캐리어', emoji: '🧳', category: '여행' },
  { id: 'travel-camera', name: '카메라', emoji: '📷', category: '여행' },
  { id: 'travel-sunglasses', name: '선글라스', emoji: '🕶️', category: '여행' },
  { id: 'travel-sunscreen', name: '선크림', emoji: '🧴', category: '여행' },
  { id: 'travel-adapter', name: '어댑터', emoji: '🔌', category: '여행' },
  { id: 'travel-medicine', name: '상비약', emoji: '💊', category: '여행' },
  { id: 'travel-clothes', name: '옷', emoji: '👕', category: '여행' },
  { id: 'travel-map', name: '지도', emoji: '🗺️', category: '여행' },
];

export function getItemsByCategory(category: Category): ItemIcon[] {
  return items.filter(item => item.category === category);
}

export function getItemById(id: string): ItemIcon | undefined {
  return items.find(item => item.id === id);
}

export const categories: Category[] = ['업무', '생활', '여행'];
