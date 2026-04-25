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
        className="aspect-square w-full rounded-xl relative overflow-hidden shadow-card"
        style={background ? getBackgroundStyle(background) : { backgroundColor: '#FDF9F5' }}
      >
        {/* 배치된 아이템들 */}
        {ggurim.items.map(placedItem => {
          const item = getItemById(placedItem.iconId);
          if (!item) return null;

          return (
            <div
              key={placedItem.id}
              className="absolute text-4xl"
              style={{
                left: `${placedItem.x * 100}%`,
                top: `${placedItem.y * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {item.emoji}
            </div>
          );
        })}

        {/* 하단 라벨 */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3">
            <h3 className="font-semibold text-text-primary text-lg">
              {ggurim.name}
            </h3>
            <p className="text-sm text-text-primary/60">
              {ggurim.category} • 준비물 {ggurim.items.length}개
            </p>
          </div>
        </div>

        {/* 워터마크 */}
        <div className="absolute top-4 right-4 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-xs font-medium text-text-primary/60 font-montserrat">
            KKURIM
          </span>
        </div>
      </div>
    );
  }
);

PosterView.displayName = 'PosterView';

export default PosterView;
