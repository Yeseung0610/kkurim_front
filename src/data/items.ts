import type { ItemIcon, Category } from '../types';

// 실제 존재하는 이미지 파일 기반 아이템 목록
export const items: ItemIcon[] = [
  // 업무 카테고리
  { id: '충전기', name: '충전기', image: '/assets/items/충전기.png', category: '업무' },
  { id: '헤드셋', name: '헤드셋', image: '/assets/items/헤드셋.png', category: '업무' },
  { id: '블루투스이어폰', name: '블루투스이어폰', image: '/assets/items/블루투스이어폰.png', category: '업무' },
  { id: '어댑터', name: '어댑터', image: '/assets/items/어댑터.png', category: '업무' },
  { id: '스마트워치', name: '스마트워치', image: '/assets/items/스마트워치.png', category: '업무' },
  { id: '셔츠', name: '셔츠', image: '/assets/items/셔츠.png', category: '업무' },
  { id: '파우치', name: '파우치', image: '/assets/items/파우치.png', category: '업무' },
  { id: '삼각대', name: '삼각대', image: '/assets/items/삼각대.png', category: '업무' },

  // 생활 카테고리
  { id: '우산', name: '우산', image: '/assets/items/우산.png', category: '생활' },
  { id: '마스크', name: '마스크', image: '/assets/items/마스크.png', category: '생활' },
  { id: '손수건', name: '손수건', image: '/assets/items/손수건.png', category: '생활' },
  { id: '비타민', name: '비타민', image: '/assets/items/비타민.png', category: '생활' },
  { id: '간식', name: '간식', image: '/assets/items/간식.png', category: '생활' },
  { id: '티슈', name: '티슈', image: '/assets/items/티슈.png', category: '생활' },
  { id: '상비약', name: '상비약', image: '/assets/items/상비약.png', category: '생활' },
  { id: '데일밴드', name: '데일밴드', image: '/assets/items/데일밴드.png', category: '생활' },
  { id: '우비', name: '우비', image: '/assets/items/우비.png', category: '생활' },
  { id: '장화', name: '장화', image: '/assets/items/장화.png', category: '생활' },
  { id: '빗자루', name: '빗자루', image: '/assets/items/빗자루.png', category: '생활' },
  { id: '스펀지', name: '스펀지', image: '/assets/items/스펀지.png', category: '생활' },
  { id: '주방세제', name: '주방세제', image: '/assets/items/주방세제.png', category: '생활' },
  { id: '주방장갑', name: '주방장갑', image: '/assets/items/주방장갑.png', category: '생활' },
  { id: '섬유유연제', name: '섬유유연제', image: '/assets/items/섬유유연제.png', category: '생활' },
  { id: '옷걸이', name: '옷걸이', image: '/assets/items/옷걸이.png', category: '생활' },
  { id: '행주', name: '행주', image: '/assets/items/행주.png', category: '생활' },
  { id: '집게', name: '집게', image: '/assets/items/집게.png', category: '생활' },
  { id: '알루미늄호일', name: '알루미늄 호일', image: '/assets/items/알루미늄 호일.png', category: '생활' },

  // 주방 (생활)
  { id: '냄비', name: '냄비', image: '/assets/items/냄비.png', category: '생활' },
  { id: '후라이팬', name: '후라이팬', image: '/assets/items/후라이팬.png', category: '생활' },
  { id: '식칼', name: '식칼', image: '/assets/items/식칼.png', category: '생활' },
  { id: '접시', name: '접시', image: '/assets/items/접시.png', category: '생활' },
  { id: '젓가락', name: '젓가락', image: '/assets/items/젓가락.png', category: '생활' },
  { id: '바구니', name: '바구니', image: '/assets/items/바구니.png', category: '생활' },
  { id: '공구함', name: '공구함', image: '/assets/items/공구함.png', category: '생활' },

  // 캠핑/아웃도어 (생활)
  { id: '텐트', name: '텐트', image: '/assets/items/텐트.png', category: '생활' },
  { id: '랜턴', name: '랜턴', image: '/assets/items/랜턴.png', category: '생활' },
  { id: '침낭', name: '침낭', image: '/assets/items/침낭.png', category: '생활' },
  { id: '캠핑의자', name: '캠핑의자', image: '/assets/items/캠핑의자.png', category: '생활' },
  { id: '캠핑테이블', name: '캠핑테이블', image: '/assets/items/캠핑테이블.png', category: '생활' },
  { id: '휴대용버너', name: '휴대용 버너', image: '/assets/items/휴대용 버너.png', category: '생활' },
  { id: '보온병', name: '보온병', image: '/assets/items/보온병.png', category: '생활' },
  { id: '라이터', name: '라이터', image: '/assets/items/라이터.png', category: '생활' },
  { id: '손전등', name: '손전등', image: '/assets/items/손전등.png', category: '생활' },
  { id: '아이스박스', name: '아이스박스', image: '/assets/items/아이스박스.png', category: '생활' },
  { id: '성냥', name: '성냥', image: '/assets/items/성냥.png', category: '생활' },
  { id: '숯', name: '숯', image: '/assets/items/숯.png', category: '생활' },

  // 운동 (생활)
  { id: '운동화', name: '운동화', image: '/assets/items/운동화.png', category: '생활' },
  { id: '운동매트', name: '운동매트', image: '/assets/items/운동매트.png', category: '생활' },
  { id: '줄넘기', name: '줄넘기', image: '/assets/items/줄넘기.png', category: '생활' },
  { id: '쉐이커', name: '쉐이커', image: '/assets/items/쉐이커.png', category: '생활' },
  { id: '무릎보호대', name: '무릎보호대', image: '/assets/items/무릎보호대.png', category: '생활' },
  { id: '반장갑', name: '반장갑', image: '/assets/items/반장갑.png', category: '생활' },
  { id: '스포츠고글', name: '스포츠고글', image: '/assets/items/스포츠고글.png', category: '생활' },
  { id: '자전거헬멧', name: '자전거 헬멧', image: '/assets/items/자전거 헬멧.png', category: '생활' },

  // 등산 (생활)
  { id: '등산모자', name: '등산모자', image: '/assets/items/등산모자.png', category: '생활' },
  { id: '등산스틱', name: '등산스틱', image: '/assets/items/등산스틱.png', category: '생활' },
  { id: '등산화', name: '등산화', image: '/assets/items/등산화.png', category: '생활' },
  { id: '쌍안경', name: '쌍안경', image: '/assets/items/쌍안경.png', category: '생활' },

  // 여행 카테고리
  { id: '여권', name: '여권', image: '/assets/items/여권.png', category: '여행' },
  { id: '항공권', name: '항공권', image: '/assets/items/항공권.png', category: '여행' },
  { id: '캐리어', name: '캐리어', image: '/assets/items/캐리어.png', category: '여행' },
  { id: '배낭', name: '배낭', image: '/assets/items/배낭.png', category: '여행' },
  { id: '모자', name: '모자', image: '/assets/items/모자.png', category: '여행' },
  { id: '챙있는모자', name: '챙있는 모자', image: '/assets/items/챙있는 모자.png', category: '여행' },
  { id: '수영복남', name: '수영복(남)', image: '/assets/items/수영복(남).png', category: '여행' },
  { id: '수영복여', name: '수영복(여)', image: '/assets/items/수영복(여).png', category: '여행' },
  { id: '수영모', name: '수영모', image: '/assets/items/수영모.png', category: '여행' },
  { id: '수경', name: '수경', image: '/assets/items/수경.png', category: '여행' },
  { id: '오리발', name: '오리발', image: '/assets/items/오리발.png', category: '여행' },
  { id: '슬리퍼', name: '슬리퍼', image: '/assets/items/슬리퍼.png', category: '여행' },
  { id: '목베게', name: '목베게', image: '/assets/items/목베게.png', category: '여행' },
  { id: '베게', name: '베게', image: '/assets/items/베게.png', category: '여행' },
  { id: '안대', name: '안대', image: '/assets/items/안대.png', category: '여행' },
  { id: '티셔츠', name: '티셔츠', image: '/assets/items/티셔츠.png', category: '여행' },
  { id: '바지', name: '바지', image: '/assets/items/바지.png', category: '여행' },
  { id: '양말', name: '양말', image: '/assets/items/양말.png', category: '여행' },
  { id: '잠옷', name: '잠옷', image: '/assets/items/잠옷.png', category: '여행' },
  { id: '바람막이', name: '바람막이', image: '/assets/items/바람막이.png', category: '여행' },
  { id: '목도리', name: '목도리', image: '/assets/items/목도리.png', category: '여행' },

  // 세면/뷰티 (여행)
  { id: '칫솔세트', name: '칫솔세트', image: '/assets/items/칫솔세트.png', category: '여행' },
  { id: '샴푸', name: '샴푸', image: '/assets/items/샴푸.png', category: '여행' },
  { id: '린스', name: '린스', image: '/assets/items/린스.png', category: '여행' },
  { id: '비누', name: '비누', image: '/assets/items/비누.png', category: '여행' },
  { id: '세면도구', name: '세면도구', image: '/assets/items/세면도구.png', category: '여행' },
  { id: '면도기', name: '면도기', image: '/assets/items/면도기.png', category: '여행' },
  { id: '헤어왁스', name: '헤어왁스', image: '/assets/items/헤어왁스.png', category: '여행' },
  { id: '빗', name: '빗', image: '/assets/items/빗.png', category: '여행' },
  { id: '거울', name: '거울', image: '/assets/items/거울.png', category: '여행' },
  { id: '립스틱', name: '립스틱', image: '/assets/items/립스틱.png', category: '여행' },
  { id: '파우더', name: '파우더', image: '/assets/items/파우더.png', category: '여행' },
  { id: '향수', name: '향수', image: '/assets/items/향수.png', category: '여행' },
];

export function getItemsByCategory(category: Category): ItemIcon[] {
  return items.filter(item => item.category === category);
}

export function getItemById(id: string): ItemIcon | undefined {
  // id로 먼저 찾고, 없으면 name으로도 찾기 (AI 호환성)
  return items.find(item => item.id === id) || items.find(item => item.name === id);
}

export const categories: Category[] = ['업무', '생활', '여행'];
