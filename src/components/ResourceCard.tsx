import { motion } from 'motion/react';
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
              className="text-ember-600 underline decoration-ember-300 underline-offset-2 hover:decoration-ember-600 break-all transition-colors"
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

interface ResourceCardProps {
  resource: Resource;
  index?: number;
}

export function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 0.61, 0.36, 1],
        delay: Math.min(index * 0.03, 0.4),
      }}
      whileHover={{ y: -3 }}
      className="group relative bg-white/85 backdrop-blur-sm rounded-2xl border border-brand-200/70 p-6 flex flex-col h-full transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(120,69,39,0.25)] shadow-[0_2px_12px_-6px_rgba(120,69,39,0.15)]"
    >
      <header className="flex justify-between items-start mb-5 gap-3">
        <div className="min-w-0">
          <h3 className="font-serif-tc text-2xl text-brand-900 font-medium tracking-tight leading-tight">
            {resource.name}
          </h3>
          <p className="text-xs text-brand-500 mt-1.5 tracking-wide">
            <span className="text-brand-700">{resource.title}</span>
            <span className="text-brand-300 mx-2">／</span>
            <span>{resource.gender}</span>
          </p>
        </div>
        {resource.is_remote && (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-sage-100 text-sage-700 border border-sage-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
            可遠距
          </span>
        )}
      </header>

      <dl className="space-y-3 flex-grow text-sm text-brand-700">
        <Row label="執業地區">{resource.region}</Row>
        {resource.agency && <Row label="執業機構" preserveLines>{resource.agency}</Row>}
        {resource.booking && (
          <Row label="預約方式" preserveLines>
            <Linkified text={resource.booking} />
          </Row>
        )}
      </dl>

      {resource.topics.length > 0 && (
        <div className="mt-5 pt-5 border-t border-brand-200/70">
          <p className="font-serif italic text-[11px] text-brand-500 tracking-wider mb-2.5 uppercase">
            speciality
          </p>
          <div className="flex flex-wrap gap-1.5">
            {resource.topics.map((topic, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-brand-100/80 text-brand-700 border border-brand-200/50"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {resource.notes && (
        <p className="mt-4 text-xs text-brand-500 italic leading-relaxed whitespace-pre-line border-l-2 border-ember-300 pl-3">
          {resource.notes}
        </p>
      )}
    </motion.article>
  );
}

function Row({
  label,
  children,
  preserveLines = false,
}: {
  label: string;
  children: React.ReactNode;
  preserveLines?: boolean;
}) {
  return (
    <div className="grid grid-cols-[64px_1fr] gap-3 items-baseline">
      <dt className="font-serif italic text-[11px] text-brand-500 tracking-wider uppercase pt-0.5">
        {label}
      </dt>
      <dd
        className={
          'text-brand-800 leading-relaxed break-words ' +
          (preserveLines ? 'whitespace-pre-line' : '')
        }
      >
        {children}
      </dd>
    </div>
  );
}
