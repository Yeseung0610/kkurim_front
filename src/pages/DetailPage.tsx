import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGgurimStore } from '../hooks/useGgurimStore';
import Header from '../components/common/Header';
import ConfirmModal from '../components/common/ConfirmModal';
import PosterView from '../components/detail/PosterView';
import { exportToPng } from '../utils/exportImage';
import { getItemById } from '../data/items';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, remove, isLoaded } = useGgurimStore();
  const posterRef = useRef<HTMLDivElement>(null);

  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const ggurim = id ? getById(id) : undefined;

  const handleDownload = async () => {
    if (!posterRef.current || !ggurim) return;

    setIsExporting(true);
    try {
      await exportToPng(posterRef.current, `kkurim-${ggurim.name}`);
    } catch (error) {
      alert('이미지 저장에 실패했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDelete = () => {
    if (id) {
      remove(id);
      navigate('/');
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-4xl animate-bounce">🎒</div>
      </div>
    );
  }

  if (!ggurim) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
        <span className="text-5xl mb-4">😢</span>
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          꾸러미를 찾을 수 없어요
        </h2>
        <button
          onClick={() => navigate('/')}
          className="btn-primary mt-4"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const categoryClass = {
    '업무': 'category-badge-업무',
    '생활': 'category-badge-생활',
    '여행': 'category-badge-여행',
  }[ggurim.category];

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header
        showBack
        rightElement={
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 rounded-lg hover:bg-accent-coral/20 transition-colors text-accent-coral"
            aria-label="삭제"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
            </svg>
          </button>
        }
      />

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* 정보 */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-text-primary">
            {ggurim.name}
          </h1>
          <span className={`category-badge ${categoryClass}`}>
            {ggurim.category}
          </span>
        </div>

        {/* 포스터 */}
        <div className="mb-6">
          <PosterView ref={posterRef} ggurim={ggurim} />
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/edit/${ggurim.id}`)}
            className="flex-1 btn-secondary flex items-center justify-center gap-2"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            편집하기
          </button>
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            {isExporting ? (
              <>
                <span className="animate-spin">⏳</span>
                저장 중...
              </>
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                이미지 저장
              </>
            )}
          </button>
        </div>

        {/* 준비물 목록 */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-text-primary mb-3">
            준비물 목록
          </h2>
          <div className="bg-white rounded-card p-4">
            {ggurim.items.length === 0 ? (
              <p className="text-text-primary/50 text-center py-4">
                아직 준비물이 없어요
              </p>
            ) : (
              <ul className="space-y-2">
                {ggurim.items.map((placedItem, index) => {
                  const item = getItemById(placedItem.iconId);
                  if (!item) return null;
                  return (
                    <li
                      key={placedItem.id}
                      className="flex items-center gap-3 py-2 border-b border-accent-cream/30 last:border-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-contain"
                      />
                      <span className="text-text-primary">{item.name}</span>
                      <span className="text-text-primary/40 text-sm ml-auto">
                        #{index + 1}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="꾸러미 삭제"
        message={`"${ggurim.name}" 꾸러미를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        cancelText="취소"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
