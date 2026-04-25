import { useRef } from 'react';
import type { PlacedItem } from '../../types';
import { getBackgroundById, getBackgroundStyle } from '../../data/backgrounds';
import DraggableItem from './DraggableItem';

interface CanvasProps {
  backgroundId: string;
  items: PlacedItem[];
  selectedItemId: string | null;
  onItemPositionChange: (id: string, x: number, y: number) => void;
  onItemDelete: (id: string) => void;
  onItemSelect: (id: string | null) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export default function Canvas({
  backgroundId,
  items,
  selectedItemId,
  onItemPositionChange,
  onItemDelete,
  onItemSelect,
  canvasRef,
}: CanvasProps) {
  const background = getBackgroundById(backgroundId);
  const innerCanvasRef = useRef<HTMLDivElement>(null);
  const actualRef = canvasRef || innerCanvasRef;

  const handleCanvasClick = (e: React.MouseEvent) => {
    // 캔버스 직접 클릭 시 선택 해제
    if (e.target === e.currentTarget) {
      onItemSelect(null);
    }
  };

  return (
    <div
      ref={actualRef}
      className="aspect-square w-full rounded-xl relative overflow-hidden shadow-card"
      style={background ? getBackgroundStyle(background) : { backgroundColor: '#FDF9F5' }}
      onClick={handleCanvasClick}
    >
      {/* 배치된 아이템들 */}
      {items.map(placedItem => (
        <DraggableItem
          key={placedItem.id}
          placedItem={placedItem}
          canvasRef={actualRef as React.RefObject<HTMLDivElement>}
          onPositionChange={onItemPositionChange}
          onDelete={onItemDelete}
          isSelected={selectedItemId === placedItem.id}
          onSelect={onItemSelect}
        />
      ))}

      {/* 빈 상태 */}
      {items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-text-primary/30">
          <div className="text-center">
            <span className="text-5xl">📦</span>
            <p className="mt-2 text-sm">아래에서 준비물을 선택하세요</p>
          </div>
        </div>
      )}
    </div>
  );
}
