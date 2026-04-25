import type { ItemIcon, Category } from '../types';

const STORAGE_KEY = 'kkurim_assets';

// 기본 아이콘 데이터 (아이소메트릭 이미지)
const defaultItems: ItemIcon[] = [
  // 업무 카테고리
  { id: 'work-charger', name: '충전기', image: '/assets/items/충전기.png', category: '업무' },
  { id: 'work-headset', name: '헤드셋', image: '/assets/items/헤드셋.png', category: '업무' },
  { id: 'work-earphone', name: '블루투스이어폰', image: '/assets/items/블루투스이어폰.png', category: '업무' },
  { id: 'work-adapter', name: '어댑터', image: '/assets/items/어댑터.png', category: '업무' },
  { id: 'work-smartwatch', name: '스마트워치', image: '/assets/items/스마트워치.png', category: '업무' },
  { id: 'work-shirt', name: '셔츠', image: '/assets/items/셔츠.png', category: '업무' },
  { id: 'work-pouch', name: '파우치', image: '/assets/items/파우치.png', category: '업무' },

  // 생활 카테고리
  { id: 'life-umbrella', name: '우산', image: '/assets/items/우산.png', category: '생활' },
  { id: 'life-mask', name: '마스크', image: '/assets/items/마스크.png', category: '생활' },
  { id: 'life-handkerchief', name: '손수건', image: '/assets/items/손수건.png', category: '생활' },
  { id: 'life-vitamin', name: '비타민', image: '/assets/items/비타민.png', category: '생활' },
  { id: 'life-snack', name: '간식', image: '/assets/items/간식.png', category: '생활' },
  { id: 'life-tissue', name: '티슈', image: '/assets/items/티슈.png', category: '생활' },
  { id: 'life-medicine', name: '상비약', image: '/assets/items/상비약.png', category: '생활' },
  { id: 'life-bandaid', name: '데일밴드', image: '/assets/items/데일밴드.png', category: '생활' },
  { id: 'life-raincoat', name: '우비', image: '/assets/items/우비.png', category: '생활' },
  { id: 'life-boots', name: '장화', image: '/assets/items/장화.png', category: '생활' },

  // 여행 카테고리
  { id: 'travel-passport', name: '여권', image: '/assets/items/여권.png', category: '여행' },
  { id: 'travel-ticket', name: '항공권', image: '/assets/items/항공권.png', category: '여행' },
  { id: 'travel-carrier', name: '캐리어', image: '/assets/items/캐리어.png', category: '여행' },
  { id: 'travel-backpack', name: '배낭', image: '/assets/items/배낭.png', category: '여행' },
  { id: 'travel-hat', name: '모자', image: '/assets/items/모자.png', category: '여행' },
  { id: 'travel-sunhat', name: '챙있는 모자', image: '/assets/items/챙있는 모자.png', category: '여행' },
  { id: 'travel-swimsuit-m', name: '수영복(남)', image: '/assets/items/수영복(남).png', category: '여행' },
  { id: 'travel-swimsuit-f', name: '수영복(여)', image: '/assets/items/수영복(여).png', category: '여행' },
  { id: 'travel-swimcap', name: '수영모', image: '/assets/items/수영모.png', category: '여행' },
  { id: 'travel-goggles', name: '수경', image: '/assets/items/수경.png', category: '여행' },
  { id: 'travel-flipper', name: '오리발', image: '/assets/items/오리발.png', category: '여행' },
  { id: 'travel-slippers', name: '슬리퍼', image: '/assets/items/슬리퍼.png', category: '여행' },
  { id: 'travel-neckpillow', name: '목베게', image: '/assets/items/목베게.png', category: '여행' },
  { id: 'travel-eyemask', name: '안대', image: '/assets/items/안대.png', category: '여행' },
  { id: 'travel-tshirt', name: '티셔츠', image: '/assets/items/티셔츠.png', category: '여행' },
  { id: 'travel-pants', name: '바지', image: '/assets/items/바지.png', category: '여행' },
  { id: 'travel-socks', name: '양말', image: '/assets/items/양말.png', category: '여행' },
  { id: 'travel-pajama', name: '잠옷', image: '/assets/items/잠옷.png', category: '여행' },
  { id: 'travel-windbreaker', name: '바람막이', image: '/assets/items/바람막이.png', category: '여행' },
  { id: 'travel-scarf', name: '목도리', image: '/assets/items/목도리.png', category: '여행' },

  // 세면/뷰티
  { id: 'beauty-toothbrush', name: '칫솔세트', image: '/assets/items/칫솔세트.png', category: '여행' },
  { id: 'beauty-shampoo', name: '샴푸', image: '/assets/items/샴푸.png', category: '여행' },
  { id: 'beauty-rinse', name: '린스', image: '/assets/items/린스.png', category: '여행' },
  { id: 'beauty-soap', name: '비누', image: '/assets/items/비누.png', category: '여행' },
  { id: 'beauty-toiletries', name: '세면도구', image: '/assets/items/세면도구.png', category: '여행' },
  { id: 'beauty-razor', name: '면도기', image: '/assets/items/면도기.png', category: '여행' },
  { id: 'beauty-hairwax', name: '헤어왁스', image: '/assets/items/헤어왁스.png', category: '여행' },
  { id: 'beauty-comb', name: '빗', image: '/assets/items/빗.png', category: '여행' },
  { id: 'beauty-mirror', name: '거울', image: '/assets/items/거울.png', category: '여행' },
  { id: 'beauty-lipstick', name: '립스틱', image: '/assets/items/립스틱.png', category: '여행' },
  { id: 'beauty-powder', name: '파우더', image: '/assets/items/파우더.png', category: '여행' },
  { id: 'beauty-perfume', name: '향수', image: '/assets/items/향수.png', category: '여행' },

  // 캠핑/아웃도어 (생활로 분류)
  { id: 'camp-tent', name: '텐트', image: '/assets/items/텐트.png', category: '생활' },
  { id: 'camp-lantern', name: '랜턴', image: '/assets/items/랜턴.png', category: '생활' },
  { id: 'camp-sleepingbag', name: '침낭', image: '/assets/items/침낭.png', category: '생활' },
  { id: 'camp-chair', name: '캠핑의자', image: '/assets/items/캠핑의자.png', category: '생활' },
  { id: 'camp-table', name: '캠핑테이블', image: '/assets/items/캠핑테이블.png', category: '생활' },
  { id: 'camp-burner', name: '휴대용 버너', image: '/assets/items/휴대용 버너.png', category: '생활' },
  { id: 'camp-thermos', name: '보온병', image: '/assets/items/보온병.png', category: '생활' },
  { id: 'camp-lighter', name: '라이터', image: '/assets/items/라이터.png', category: '생활' },
  { id: 'camp-flashlight', name: '손전등', image: '/assets/items/손전등.png', category: '생활' },
  { id: 'camp-icebox', name: '아이스박스', image: '/assets/items/아이스박스.png', category: '생활' },
  { id: 'camp-match', name: '성냥', image: '/assets/items/성냥.png', category: '생활' },
  { id: 'camp-charcoal', name: '숯', image: '/assets/items/숯.png', category: '생활' },

  // 운동 (생활로 분류)
  { id: 'sport-sneakers', name: '운동화', image: '/assets/items/운동화.png', category: '생활' },
  { id: 'sport-mat', name: '운동매트', image: '/assets/items/운동매트.png', category: '생활' },
  { id: 'sport-jumprope', name: '줄넘기', image: '/assets/items/줄넘기.png', category: '생활' },
  { id: 'sport-shaker', name: '쉐이커', image: '/assets/items/쉐이커.png', category: '생활' },
  { id: 'sport-kneeguard', name: '무릎보호대', image: '/assets/items/무릎보호대.png', category: '생활' },
  { id: 'sport-gloves', name: '반장갑', image: '/assets/items/반장갑.png', category: '생활' },
  { id: 'sport-goggles', name: '스포츠고글', image: '/assets/items/스포츠고글.png', category: '생활' },
  { id: 'sport-bikehelmet', name: '자전거 헬멧', image: '/assets/items/자전거 헬멧.png', category: '생활' },

  // 등산 (생활로 분류)
  { id: 'hiking-hat', name: '등산모자', image: '/assets/items/등산모자.png', category: '생활' },
  { id: 'hiking-stick', name: '등산스틱', image: '/assets/items/등산스틱.png', category: '생활' },
  { id: 'hiking-boots', name: '등산화', image: '/assets/items/등산화.png', category: '생활' },
  { id: 'hiking-binoculars', name: '쌍안경', image: '/assets/items/쌍안경.png', category: '생활' },
];

// localStorage에서 아이템 불러오기 (없으면 기본값 저장 후 반환)
function loadItems(): ItemIcon[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // 저장된 데이터가 없으면 기본값 저장
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultItems));
    return defaultItems;
  } catch {
    console.error('Failed to load items from localStorage');
    return defaultItems;
  }
}

// 앱 시작 시 아이템 로드
export const items: ItemIcon[] = loadItems();

export function getItemsByCategory(category: Category): ItemIcon[] {
  return items.filter(item => item.category === category);
}

export function getItemById(id: string): ItemIcon | undefined {
  return items.find(item => item.id === id);
}

export const categories: Category[] = ['업무', '생활', '여행'];

// 아이템 저장 함수 (나중에 커스텀 아이콘 추가 시 사용)
export function saveItems(newItems: ItemIcon[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  } catch {
    console.error('Failed to save items to localStorage');
  }
}
