import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import GgurimCard from '../components/home/GgurimCard';
import EmptyState from '../components/home/EmptyState';
import { useGgurimStore } from '../hooks/useGgurimStore';

export default function HomePage() {
  const navigate = useNavigate();
  const { ggurimList, isLoaded } = useGgurimStore();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-4xl animate-bounce">🎒</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* 슬로건 */}
        <p className="text-center text-text-primary/70 mb-8 font-noto">
          필요한 것만 모아주는 나만의 짐꾸러미
        </p>

        {ggurimList.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* 꾸러미 목록 */}
            <div className="grid grid-cols-2 gap-4 mb-24">
              {ggurimList
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .map(ggurim => (
                  <GgurimCard key={ggurim.id} ggurim={ggurim} />
                ))
              }
            </div>
          </>
        )}

        {/* 플로팅 버튼 */}
        {ggurimList.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 max-w-lg w-full px-4">
            <button
              onClick={() => navigate('/chat')}
              className="btn-primary w-full flex items-center justify-center gap-2 shadow-lg"
            >
              <span className="text-xl">✨</span>
              <span>AI와 짐 꾸리기</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
