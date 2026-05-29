interface FilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  region: string;
  onRegionChange: (value: string) => void;
  onlyRemote: boolean;
  onOnlyRemoteChange: (value: boolean) => void;
  regions: string[];
}

export function FilterBar({
  query,
  onQueryChange,
  region,
  onRegionChange,
  onlyRemote,
  onOnlyRemoteChange,
  regions,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-brand-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="搜尋姓名、機構、關鍵字..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent bg-brand-50 text-brand-900 placeholder-brand-400 transition-shadow"
            />
            <svg
              className="w-5 h-5 text-brand-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-end w-full sm:w-auto">
            <div className="relative">
              <select
                value={region}
                onChange={(e) => onRegionChange(e.target.value)}
                className="appearance-none bg-brand-50 border border-brand-300 text-brand-900 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer hover:bg-white transition-colors"
              >
                <option value="">所有地區</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <label className="inline-flex items-center cursor-pointer select-none bg-brand-50 border border-brand-300 rounded-lg px-3 py-2 hover:bg-white transition-colors">
              <input
                type="checkbox"
                checked={onlyRemote}
                onChange={(e) => onOnlyRemoteChange(e.target.checked)}
                className="h-5 w-5 text-brand-600 rounded border-brand-300 focus:ring-brand-400"
              />
              <span className="ml-2 text-brand-700">可遠距/線上</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
