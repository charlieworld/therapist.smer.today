interface FilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  region: string;
  onRegionChange: (value: string) => void;
  onlyRemote: boolean;
  onOnlyRemoteChange: (value: boolean) => void;
  regions: string[];
  resultCount: number;
  totalCount: number;
}

export function FilterBar({
  query,
  onQueryChange,
  region,
  onRegionChange,
  onlyRemote,
  onOnlyRemoteChange,
  regions,
  resultCount,
  totalCount,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-paper/85 backdrop-blur-md border-y border-brand-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-grow lg:max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="搜尋姓名、機構、議題..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-brand-200 text-brand-900 placeholder-brand-400 focus:outline-none focus:border-ember-400 focus:bg-white transition-colors"
            />
            <svg
              className="w-4 h-4 text-brand-400 absolute left-3.5 top-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5-5m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Right side controls */}
          <div className="flex flex-wrap gap-2.5 items-center">
            <div className="relative">
              <select
                value={region}
                onChange={(e) => onRegionChange(e.target.value)}
                className="appearance-none bg-white/70 border border-brand-200 text-brand-800 py-2.5 pl-4 pr-9 rounded-xl text-sm cursor-pointer hover:bg-white focus:outline-none focus:border-ember-400 transition-colors"
              >
                <option value="">所有地區</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <label className="inline-flex items-center cursor-pointer select-none bg-white/70 border border-brand-200 rounded-xl px-3.5 py-2.5 hover:bg-white transition-colors">
              <input
                type="checkbox"
                checked={onlyRemote}
                onChange={(e) => onOnlyRemoteChange(e.target.checked)}
                className="h-4 w-4 rounded border-brand-300 text-ember-600 focus:ring-ember-400"
              />
              <span className="ml-2 text-sm text-brand-800">僅顯示可遠距</span>
            </label>

            <span className="font-serif italic text-sm text-brand-500 ml-1">
              {resultCount}<span className="text-brand-300"> / {totalCount}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
