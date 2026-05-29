import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-8 py-24 text-center">
      <p className="font-serif italic text-ember-500 text-6xl mb-4 select-none">404</p>
      <h1 className="font-serif-tc text-3xl text-brand-800 mb-3">迷路了</h1>
      <p className="text-brand-500 mb-8">這個頁面好像不存在。沒關係，我們陪你回到起點。</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-ember-600 font-serif italic underline decoration-ember-300 underline-offset-4 hover:decoration-ember-600 transition-colors"
      >
        回到首頁 →
      </Link>
    </section>
  );
}
