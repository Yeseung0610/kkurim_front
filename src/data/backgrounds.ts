import type { Background } from '../types';

export const backgrounds: Background[] = [
  {
    id: 'bg-carrier',
    name: '캐리어',
    type: 'pattern',
    value: '/assets/캐리어-스텝1.svg',
  },
  {
    id: 'bg-briefcase',
    name: '서류가방',
    type: 'pattern',
    value: '/assets/서류가방-스텝1.svg',
  },
  {
    id: 'bg-ecobag',
    name: '에코백',
    type: 'pattern',
    value: '/assets/에코백-스텝1.svg',
  },
];

export function getBackgroundById(id: string): Background | undefined {
  return backgrounds.find(bg => bg.id === id);
}

export function getBackgroundStyle(background: Background): React.CSSProperties {
  if (background.type === 'solid') {
    return { backgroundColor: background.value };
  }
  if (background.type === 'gradient') {
    return { background: background.value };
  }
  // pattern - 이미지 배경
  return {
    backgroundImage: `url(${background.value})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#FDF9F5',
  };
}
