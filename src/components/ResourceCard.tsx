import type { Resource } from '../types';

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function Linkified({ text }: { text: string }) {
  const parts = text.split(URL_REGEX);
  return (
    <>
      {parts.map((part, i) => {
        if (URL_REGEX.test(part)) {
          URL_REGEX.lastIndex = 0;
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {part}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-brand-100 p-6 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-brand-800">{resource.name}</h3>
          <p className="text-sm text-brand-600 font-medium">
            {resource.title}
            <span className="text-brand-400 mx-1">|</span>
            {resource.gender}
          </p>
        </div>
        {resource.is_remote && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            可遠距
          </span>
        )}
      </div>

      <div className="space-y-3 flex-grow text-sm text-brand-700">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 mr-2 text-brand-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{resource.region}</span>
        </div>
        {resource.agency && (
          <div className="flex items-start">
            <svg
              className="w-5 h-5 mr-2 text-brand-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="whitespace-pre-line">{resource.agency}</span>
          </div>
        )}
        {resource.booking && (
          <div className="flex items-start">
            <svg
              className="w-5 h-5 mr-2 text-brand-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="whitespace-pre-line break-words">
              <Linkified text={resource.booking} />
            </span>
          </div>
        )}
      </div>

      {resource.topics.length > 0 && (
        <div className="mt-4 pt-4 border-t border-brand-100">
          <h4 className="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-2">
            擅長議題
          </h4>
          <div className="flex flex-wrap gap-2">
            {resource.topics.map((topic, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-brand-100 text-brand-800"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {resource.notes && (
        <div className="mt-3 text-xs text-brand-500 italic whitespace-pre-line">
          {resource.notes}
        </div>
      )}
    </div>
  );
}
