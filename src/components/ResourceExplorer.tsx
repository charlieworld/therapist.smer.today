import { useEffect, useMemo, useState } from 'react';
import type { Resource, ResourceData } from '../types';
import { FilterBar } from './FilterBar';
import { ResourceCard } from './ResourceCard';
import { NoResults } from './NoResults';

const NON_REGION_TOKENS = new Set(['遠距', '線上', '僅實體', '可遠距']);

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function ResourceExplorer() {
  const [data, setData] = useState<ResourceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  const [onlyRemote, setOnlyRemote] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json?v=${__BUILD_TIME__}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ResourceData>;
      })
      .then((json) => setData({ ...json, resources: shuffle(json.resources) }))
      .catch((err) => setError(String(err)));
  }, []);

  const regions = useMemo(() => {
    if (!data) return [];
    const set = new Set<string>();
    for (const r of data.resources) {
      for (const part of r.regions) {
        if (!NON_REGION_TOKENS.has(part)) set.add(part);
      }
    }
    return Array.from(set).sort();
  }, [data]);

  const filtered = useMemo<Resource[]>(() => {
    if (!data) return [];
    const q = query.toLowerCase().trim();
    return data.resources.filter((item) => {
      const haystack = [
        item.name,
        item.agency,
        item.topics.join(' '),
        item.region,
        item.notes,
      ]
        .join(' ')
        .toLowerCase();
      const matchesSearch = !q || haystack.includes(q);
      const matchesRegion = !region || item.region.includes(region);
      const matchesRemote = !onlyRemote || item.is_remote;
      return matchesSearch && matchesRegion && matchesRemote;
    });
  }, [data, query, region, onlyRemote]);

  return (
    <>
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        region={region}
        onRegionChange={setRegion}
        onlyRemote={onlyRemote}
        onOnlyRemoteChange={setOnlyRemote}
        regions={regions}
        resultCount={filtered.length}
        totalCount={data?.count ?? 0}
      />

      <section className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-10">
        {error && (
          <div className="text-center py-20 text-ember-700 font-serif italic">
            無法載入資料 ・ {error}
          </div>
        )}
        {!error && !data && (
          <div className="text-center py-20 text-brand-400 font-serif italic">…</div>
        )}
        {data && filtered.length === 0 && <NoResults />}
        {data && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((r, i) => (
              <ResourceCard key={`${r.name}-${r.agency}-${i}`} resource={r} index={i} />
            ))}
          </div>
        )}

        {data && (
          <p className="font-serif italic text-center text-xs text-brand-400 mt-14 tracking-wide">
            updated · {new Date(data.updated_at).toLocaleDateString('zh-TW', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </section>
    </>
  );
}
