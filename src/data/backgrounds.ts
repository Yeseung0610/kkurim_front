import type { Background } from '../types';

export const backgrounds: Background[] = [
  {
    id: 'bg-cream',
    name: '크림',
    type: 'solid',
    value: '#FDF9F5',
  },
  {
    id: 'bg-coral-gradient',
    name: '코랄 그라데이션',
    type: 'gradient',
    value: 'linear-gradient(135deg, #FDF9F5 0%, #E0A899 100%)',
  },
  {
    id: 'bg-sage-gradient',
    name: '세이지 그라데이션',
    type: 'gradient',
    value: 'linear-gradient(135deg, #FDF9F5 0%, #A3B396 100%)',
  },
  {
    id: 'bg-steel-gradient',
    name: '스틸 그라데이션',
    type: 'gradient',
    value: 'linear-gradient(135deg, #FDF9F5 0%, #8B9DAD 100%)',
  },
  {
    id: 'bg-warm-sunset',
    name: '따뜻한 석양',
    type: 'gradient',
    value: 'linear-gradient(180deg, #E5D5C5 0%, #E0A899 50%, #FDF9F5 100%)',
  },
];

export function getBackgroundById(id: string): Background | undefined {
  return backgrounds.find(bg => bg.id === id);
}

export function getBackgroundStyle(background: Background): React.CSSProperties {
  if (background.type === 'solid') {
    return { backgroundColor: background.value };
  }
  return { background: background.value };
}
