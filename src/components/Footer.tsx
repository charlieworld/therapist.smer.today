export function Footer() {
  return (
    <footer className="bg-white border-t border-brand-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-brand-500">
          資料來源：
          <a
            href="https://docs.google.com/spreadsheets/d/1zyTtdvSDtiKjAVUbcNXFGKP2IQ_0DleBmZwXZxLacTk/edit?gid=1534828108"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-brand-700"
          >
            臺灣 BDSMer 友善之助人工作者資源網
          </a>
        </p>
      </div>
    </footer>
  );
}
