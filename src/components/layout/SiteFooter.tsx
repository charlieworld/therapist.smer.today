export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-10">
        <div className="h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent mb-6" />
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center text-sm text-brand-500">
          <p className="font-serif italic">
            一份小小的、安靜的目錄。
          </p>
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
    </footer>
  );
}
