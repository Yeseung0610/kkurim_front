import { useNavigate } from 'react-router-dom';

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-6">🎒</div>
      <h2 className="text-xl font-semibold text-text-primary mb-2 font-noto">
        아직 꾸러미가 없어요
      </h2>
      <p className="text-text-primary/60 text-center mb-8 font-noto">
        필요한 준비물을 모아<br />
        나만의 짐꾸러미를 만들어보세요!
      </p>
      <button
        onClick={() => navigate('/edit/new')}
        className="btn-primary flex items-center gap-2"
      >
        <span className="text-xl">+</span>
        <span>짐 꾸리기</span>
      </button>
    </div>
  );
}
