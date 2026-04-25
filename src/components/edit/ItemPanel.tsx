import { useState } from 'react';
import type { Category, ItemIcon } from '../../types';
import { categories, getItemsByCategory } from '../../data/items';

interface ItemPanelProps {
  onItemSelect: (item: ItemIcon) => void;
}

export default function ItemPanel({ onItemSelect }: ItemPanelProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('업무');

  const items = getItemsByCategory(activeCategory);

  const categoryColors = {
    '업무': 'bg-accent-steel',
    '생활': 'bg-accent-sage',
    '여행': 'bg-accent-coral',
  };

  return (
    <div className="bg-white rounded-t-2xl shadow-lg p-4">
      {/* 카테고리 탭 */}
      <div className="flex gap-2 mb-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex-1 py-2 px-3 rounded-button text-sm font-medium transition-all ${
              activeCategory === category
                ? `${categoryColors[category]} text-white`
                : 'bg-accent-cream/30 text-text-primary/70 hover:bg-accent-cream/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 아이템 그리드 */}
      <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onItemSelect(item)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent-cream/30 transition-colors"
            title={item.name}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-10 h-10 object-contain"
            />
            <span className="text-[10px] text-text-primary/60 truncate w-full text-center">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
