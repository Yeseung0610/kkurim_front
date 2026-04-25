import { backgrounds, getBackgroundStyle } from '../../data/backgrounds';

interface BackgroundPickerProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function BackgroundPicker({
  selectedId,
  onSelect,
}: BackgroundPickerProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      {backgrounds.map(bg => (
        <button
          key={bg.id}
          onClick={() => onSelect(bg.id)}
          className={`flex-shrink-0 w-12 h-12 rounded-lg border-2 transition-all ${
            selectedId === bg.id
              ? 'border-text-primary scale-110'
              : 'border-transparent hover:border-accent-cream'
          }`}
          style={getBackgroundStyle(bg)}
          title={bg.name}
        />
      ))}
    </div>
  );
}
