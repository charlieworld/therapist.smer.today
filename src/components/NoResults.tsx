export function NoResults() {
  return (
    <div className="text-center py-24">
      <p className="font-serif italic text-ember-500 text-base">no match</p>
      <h3 className="mt-2 font-serif-tc text-2xl text-brand-800">沒有找到符合條件的資源</h3>
      <p className="mt-3 text-sm text-brand-500">請嘗試調整篩選條件或搜尋關鍵字。</p>
    </div>
  );
}
