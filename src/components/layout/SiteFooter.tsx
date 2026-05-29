export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-10">
        <div className="h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 text-sm text-brand-500">
          {/* Credits */}
          <dl className="space-y-1.5">
            <div className="grid grid-cols-[auto_1fr] gap-x-3 items-baseline">
              <dt className="font-serif italic text-[11px] text-brand-400 tracking-wider uppercase whitespace-nowrap">
                發起 ・ 資料維護
              </dt>
              <dd className="text-brand-700">長裙富翁、小藤</dd>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-3 items-baseline">
              <dt className="font-serif italic text-[11px] text-brand-400 tracking-wider uppercase whitespace-nowrap">
                網頁工程 ・ 維護
              </dt>
              <dd className="text-brand-700">TinaTea 緹、柚子泥</dd>
            </div>
          </dl>

          {/* Source */}
          <div className="sm:text-right">
            <p>
              資料來源 ・{' '}
              <a
                href="https://docs.google.com/spreadsheets/d/1zyTtdvSDtiKjAVUbcNXFGKP2IQ_0DleBmZwXZxLacTk/edit?gid=1534828108"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-brand-300 underline-offset-4 hover:text-brand-800 hover:decoration-ember-500 transition-colors"
              >
                臺灣 BDSMer 友善之助人工作者資源網
              </a>
            </p>
          </div>
        </div>

        <p className="font-serif italic text-center text-ember-600/80 text-sm mt-10 tracking-wider">
          made with love
          <span className="inline-block mx-2 text-ember-400">✦</span>
          <span className="text-brand-400 not-italic tracking-widest">2026</span>
        </p>
      </div>
    </footer>
  );
}
