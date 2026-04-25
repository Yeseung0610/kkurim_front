import { useRef, useState, useCallback, useEffect } from 'react';
import type { PlacedItem } from '../../types';
import { getItemById } from '../../data/items';

interface DraggableItemProps {
  placedItem: PlacedItem;
  canvasRef: React.RefObject<HTMLDivElement>;
  onPositionChange: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function DraggableItem({
  placedItem,
  canvasRef,
  onPositionChange,
  onDelete,
  isSelected,
  onSelect,
}: DraggableItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const item = getItemById(placedItem.iconId);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(placedItem.id);

    if (!itemRef.current || !canvasRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    };

    setIsDragging(true);
  }, [placedItem.id, onSelect, canvasRef]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    onSelect(placedItem.id);

    if (!itemRef.current || !canvasRef.current) return;

    const touch = e.touches[0];
    const rect = itemRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: touch.clientX - rect.left - rect.width / 2,
      y: touch.clientY - rect.top - rect.height / 2,
    };

    setIsDragging(true);
  }, [placedItem.id, onSelect, canvasRef]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number, clientY: number) => {
      if (!canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();

      const x = (clientX - canvasRect.left - dragOffset.current.x) / canvasRect.width;
      const y = (clientY - canvasRect.top - dragOffset.current.y) / canvasRect.height;

      // 0~1 범위로 제한
      const clampedX = Math.max(0.05, Math.min(0.95, x));
      const clampedY = Math.max(0.05, Math.min(0.95, y));

      onPositionChange(placedItem.id, clampedX, clampedY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, placedItem.id, onPositionChange, canvasRef]);

  if (!item) return null;

  return (
    <div
      ref={itemRef}
      className={`absolute cursor-grab select-none transition-transform ${
        isDragging ? 'cursor-grabbing scale-125 z-10' : ''
      } ${isSelected ? 'z-10' : ''}`}
      style={{
        left: `${placedItem.x * 100}%`,
        top: `${placedItem.y * 100}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <span className="text-4xl">{item.emoji}</span>

      {/* 삭제 버튼 */}
      {isSelected && !isDragging && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(placedItem.id);
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-accent-coral text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md hover:bg-accent-coral/80 transition-colors"
        >
          ×
        </button>
      )}
    </div>
  );
}
