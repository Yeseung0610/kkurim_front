import { forwardRef } from 'react';
import type { Ggurim } from '../../types';
import { getBackgroundById, getBackgroundStyle } from '../../data/backgrounds';
import { getItemById } from '../../data/items';

interface PosterViewProps {
  ggurim: Ggurim;
}

const PosterView = forwardRef<HTMLDivElement, PosterViewProps>(
  ({ ggurim }, ref) => {
    const background = getBackgroundById(ggurim.backgroundId);

    // 카테고리별 액센트 색상
    const categoryColor = {
      '업무': '#8B9DAD',
      '생활': '#A3B396',
      '여행': '#E0A899',
    }[ggurim.category] || '#E0A899';

    return (
      <div
        ref={ref}
        className="w-full rounded-2xl overflow-hidden shadow-lg bg-white"
        style={{ maxWidth: '480px' }}
      >
        {/* 썸네일 영역 - 배경 + 아이템 */}
        <div
          className="aspect-square w-full relative"
          style={background ? getBackgroundStyle(background) : { backgroundColor: '#FDF9F5' }}
        >
          {/* 배치된 아이템들 */}
          {ggurim.items.map(placedItem => {
            const item = getItemById(placedItem.iconId);
            if (!item) return null;

            return (
              <img
                key={placedItem.id}
                src={item.image}
                alt={item.name}
                className="absolute w-16 h-16 object-contain"
                style={{
                  left: `${placedItem.x * 100}%`,
                  top: `${placedItem.y * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}

          {/* 워터마크 - 더 크고 눈에 띄게 */}
          <div
            className="absolute top-5 right-5 bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm"
          >
            <span className="text-sm font-semibold text-text-primary/70 font-montserrat tracking-wider">
              KKURIM
            </span>
          </div>
        </div>

        {/* 타이틀 영역 - 더 넓은 패딩 */}
        <div className="px-6 py-5 border-b-2 border-accent-cream/40">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-text-primary text-2xl leading-tight">
              {ggurim.name}
            </h3>
            {/* 카테고리 뱃지 */}
            <span
              className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {ggurim.category}
            </span>
          </div>
          <p className="text-sm text-text-primary/60 mt-2">
            준비물 {ggurim.items.length}개
          </p>
        </div>

        {/* 준비물 체크리스트 - 더 넓은 간격과 큰 요소 */}
        <div className="px-6 py-5">
          <p className="text-xs font-semibold text-text-primary/50 uppercase tracking-wider mb-4">
            📋 준비물 체크리스트
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {ggurim.items.map((placedItem, index) => {
              const item = getItemById(placedItem.iconId);
              if (!item) return null;

              return (
                <div
                  key={placedItem.id}
                  className="flex items-center gap-3 py-2 px-2 rounded-lg bg-accent-cream/10 hover:bg-accent-cream/20 transition-colors"
                >
                  {/* 번호 체크박스 - 더 크게 */}
                  <span
                    className="w-7 h-7 rounded-md border-2 flex items-center justify-center text-sm font-medium shrink-0"
                    style={{
                      borderColor: categoryColor + '60',
                      color: categoryColor,
                    }}
                  >
                    {index + 1}
                  </span>
                  {/* 아이콘 - 더 크게 */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-8 h-8 object-contain shrink-0"
                  />
                  {/* 이름 */}
                  <span className="text-sm font-medium text-text-primary truncate">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 하단 푸터 - 더 눈에 띄는 로고 */}
        <div
          className="px-6 py-4 flex items-center justify-center gap-3"
          style={{ backgroundColor: categoryColor + '15' }}
        >
          <img
            src="/assets/kkurim_logo.svg"
            alt="KKURIM"
            className="h-7 opacity-70"
          />
          <span className="text-xs text-text-primary/40 font-medium">
            나만의 짐꾸러미
          </span>
        </div>
      </div>
    );
  }
);

PosterView.displayName = 'PosterView';

export default PosterView;
