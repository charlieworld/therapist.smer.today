export function NoResults() {
  return (
    <div className="text-center py-20">
      <svg
        className="mx-auto h-12 w-12 text-brand-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-brand-900">沒有找到符合條件的資源</h3>
      <p className="mt-1 text-sm text-brand-500">請嘗試調整您的篩選條件或搜尋關鍵字。</p>
    </div>
  );
}
