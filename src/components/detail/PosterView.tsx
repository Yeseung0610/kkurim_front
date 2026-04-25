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

    return (
      <div
        ref={ref}
        className="w-full rounded-xl overflow-hidden shadow-card bg-white"
      >
        {/* 썸네일 영역 - 배경 + 아이템 (타이틀 없음) */}
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

          {/* 워터마크 */}
          <div className="absolute top-4 right-4 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-xs font-medium text-text-primary/60 font-montserrat">
              KKURIM
            </span>
          </div>
        </div>

        {/* 타이틀 영역 - 썸네일 아래 */}
        <div className="px-5 py-4 border-b border-accent-cream/30">
          <h3 className="font-semibold text-text-primary text-xl">
            {ggurim.name}
          </h3>
          <p className="text-sm text-text-primary/60 mt-1">
            {ggurim.category} • 준비물 {ggurim.items.length}개
          </p>
        </div>

        {/* 준비물 목록 */}
        <div className="px-5 py-4">
          <p className="text-xs font-medium text-text-primary/50 mb-3">
            준비물 체크리스트
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ggurim.items.map((placedItem, index) => {
              const item = getItemById(placedItem.iconId);
              if (!item) return null;

              return (
                <div
                  key={placedItem.id}
                  className="flex items-center gap-2 py-1.5"
                >
                  <span className="w-5 h-5 rounded border border-accent-cream/50 flex items-center justify-center text-xs text-text-primary/30">
                    {index + 1}
                  </span>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-sm text-text-primary truncate">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 하단 푸터 */}
        <div className="px-5 py-3 bg-accent-cream/20 flex items-center justify-center gap-2">
          <img
            src="/assets/kkurim_logo.svg"
            alt="KKURIM"
            className="h-5 opacity-50"
          />
        </div>
      </div>
    );
  }
);

PosterView.displayName = 'PosterView';

export default PosterView;
