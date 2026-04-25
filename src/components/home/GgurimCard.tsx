import { useNavigate } from 'react-router-dom';
import type { Ggurim } from '../../types';
import { getBackgroundById, getBackgroundStyle } from '../../data/backgrounds';
import { getItemById } from '../../data/items';

interface GgurimCardProps {
  ggurim: Ggurim;
}

export default function GgurimCard({ ggurim }: GgurimCardProps) {
  const navigate = useNavigate();
  const background = getBackgroundById(ggurim.backgroundId);

  const categoryClass = {
    '업무': 'category-badge-업무',
    '생활': 'category-badge-생활',
    '여행': 'category-badge-여행',
  }[ggurim.category];

  return (
    <div
      onClick={() => navigate(`/detail/${ggurim.id}`)}
      className="card cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      {/* 썸네일 */}
      <div
        className="aspect-square rounded-lg mb-3 relative overflow-hidden"
        style={background ? getBackgroundStyle(background) : { backgroundColor: '#FDF9F5' }}
      >
        {/* 배치된 아이콘들 미리보기 */}
        <div className="absolute inset-0 p-2">
          {ggurim.items.slice(0, 6).map((placedItem, index) => {
            const item = getItemById(placedItem.iconId);
            if (!item) return null;
            return (
              <img
                key={placedItem.id}
                src={item.image}
                alt={item.name}
                className="absolute w-8 h-8 object-contain"
                style={{
                  left: `${placedItem.x * 100}%`,
                  top: `${placedItem.y * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: index >= 4 ? 0.6 : 1,
                }}
              />
            );
          })}
          {ggurim.items.length > 6 && (
            <span className="absolute bottom-2 right-2 text-sm text-text-primary/60 font-medium">
              +{ggurim.items.length - 6}
            </span>
          )}
        </div>
      </div>

      {/* 정보 */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-text-primary truncate flex-1">
          {ggurim.name}
        </h3>
        <span className={`category-badge ${categoryClass} text-xs flex-shrink-0`}>
          {ggurim.category}
        </span>
      </div>

      {/* 아이템 개수 */}
      <p className="text-sm text-text-primary/50 mt-1">
        준비물 {ggurim.items.length}개
      </p>
    </div>
  );
}
