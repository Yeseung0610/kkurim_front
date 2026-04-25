import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import type { Category, PlacedItem, ItemIcon } from '../types';
import { categories } from '../data/items';
import { backgrounds } from '../data/backgrounds';
import { useGgurimStore } from '../hooks/useGgurimStore';
import Header from '../components/common/Header';
import ConfirmModal from '../components/common/ConfirmModal';
import Canvas from '../components/edit/Canvas';
import BackgroundPicker from '../components/edit/BackgroundPicker';
import ItemPanel from '../components/edit/ItemPanel';

function generateItemId(): string {
  return `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

interface LocationState {
  initialData?: {
    name: string;
    category: Category;
    backgroundId: string;
    items: PlacedItem[];
  };
}

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getById, create, update, isLoaded } = useGgurimStore();
  const canvasRef = useRef<HTMLDivElement>(null);

  const isNewMode = !id || id === 'new';
  const locationState = location.state as LocationState | null;

  // 폼 상태 - AI 채팅에서 전달된 초기 데이터 적용
  const [name, setName] = useState(locationState?.initialData?.name || '');
  const [category, setCategory] = useState<Category>(locationState?.initialData?.category || '업무');
  const [backgroundId, setBackgroundId] = useState(locationState?.initialData?.backgroundId || backgrounds[0].id);
  const [items, setItems] = useState<PlacedItem[]>(locationState?.initialData?.items || []);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // UI 상태
  const [showExitModal, setShowExitModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // 기존 데이터 로드
  useEffect(() => {
    if (!isNewMode && isLoaded) {
      const existing = getById(id!);
      if (existing) {
        setName(existing.name);
        setCategory(existing.category);
        setBackgroundId(existing.backgroundId);
        setItems(existing.items);
      } else {
        navigate('/');
      }
    }
  }, [id, isNewMode, isLoaded, getById, navigate]);

  // 변경 감지
  useEffect(() => {
    if (name || items.length > 0) {
      setHasChanges(true);
    }
  }, [name, category, backgroundId, items]);

  // 아이템 추가
  const handleItemSelect = useCallback((item: ItemIcon) => {
    const newItem: PlacedItem = {
      id: generateItemId(),
      iconId: item.id,
      x: 0.5,
      y: 0.5,
    };
    setItems(prev => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  }, []);

  // 아이템 위치 변경
  const handleItemPositionChange = useCallback((itemId: string, x: number, y: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, x, y } : item
      )
    );
  }, []);

  // 아이템 삭제
  const handleItemDelete = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItemId(null);
  }, []);

  // 저장
  const handleSave = () => {
    if (!name.trim()) {
      alert('꾸러미 이름을 입력해주세요.');
      return;
    }

    if (isNewMode) {
      create({
        name: name.trim(),
        category,
        backgroundId,
        items,
      });
    } else {
      update(id!, {
        name: name.trim(),
        category,
        backgroundId,
        items,
      });
    }

    navigate('/');
  };

  // 뒤로가기
  const handleBack = () => {
    if (hasChanges) {
      setShowExitModal(true);
    } else {
      navigate(-1);
    }
  };

  const categoryColors = {
    '업무': 'bg-accent-steel',
    '생활': 'bg-accent-sage',
    '여행': 'bg-accent-coral',
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-4xl animate-bounce">🎒</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header
        title={isNewMode ? '새 꾸러미' : '꾸러미 편집'}
        showBack
        onBack={handleBack}
        rightElement={
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-text-primary text-white rounded-button text-sm font-medium hover:bg-text-primary/90 transition-colors"
          >
            저장
          </button>
        }
      />

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 pb-48">
        {/* 이름 입력 */}
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value.slice(0, 20))}
            placeholder="꾸러미 이름 (최대 20자)"
            className="w-full px-4 py-3 bg-white rounded-button border border-accent-cream focus:outline-none focus:border-text-primary transition-colors text-text-primary placeholder:text-text-primary/40"
          />
          <p className="text-xs text-text-primary/50 text-right mt-1">
            {name.length}/20
          </p>
        </div>

        {/* 카테고리 선택 */}
        <div className="mb-4">
          <label className="text-sm font-medium text-text-primary/70 mb-2 block">
            카테고리
          </label>
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-1 py-2 px-3 rounded-button text-sm font-medium transition-all ${
                  category === cat
                    ? `${categoryColors[cat]} text-white`
                    : 'bg-accent-cream/30 text-text-primary/70 hover:bg-accent-cream/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 배경 선택 */}
        <div className="mb-4">
          <label className="text-sm font-medium text-text-primary/70 mb-2 block">
            배경
          </label>
          <BackgroundPicker
            selectedId={backgroundId}
            onSelect={setBackgroundId}
          />
        </div>

        {/* 캔버스 */}
        <div className="mb-4">
          <Canvas
            backgroundId={backgroundId}
            items={items}
            selectedItemId={selectedItemId}
            onItemPositionChange={handleItemPositionChange}
            onItemDelete={handleItemDelete}
            onItemSelect={setSelectedItemId}
            canvasRef={canvasRef}
          />
        </div>
      </main>

      {/* 아이템 패널 - 하단 고정 */}
      <div className="fixed bottom-0 left-0 right-0">
        <ItemPanel onItemSelect={handleItemSelect} />
      </div>

      {/* 나가기 확인 모달 */}
      <ConfirmModal
        isOpen={showExitModal}
        title="편집 취소"
        message="저장하지 않은 변경사항이 있습니다. 정말 나가시겠습니까?"
        confirmText="나가기"
        cancelText="계속 편집"
        variant="danger"
        onConfirm={() => navigate(-1)}
        onCancel={() => setShowExitModal(false)}
      />
    </div>
  );
}
