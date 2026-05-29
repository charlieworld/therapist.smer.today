import { motion } from 'motion/react';

const FORM_URL = 'https://forms.gle/As1zLhi2a55HEBtB8';
const FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfEHzRbM3ZBqLSD-WDdgjRrxLoqVxURteA6VZqtE6KYGJIWNg/viewform?embedded=true';

export function ContributePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-20">
      <header className="mb-12 sm:mb-16">
        <p className="font-serif italic text-ember-600 text-sm mb-3 tracking-wide">
          if you're called to it.
        </p>
        <h1 className="font-serif-tc text-4xl sm:text-5xl text-brand-900 font-medium leading-[1.2] tracking-tight">
          助人者募集中
        </h1>
        <div className="mt-6 h-[2px] w-12 bg-ember-500" />
      </header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        className="grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 gap-y-3 mb-12 sm:mb-16"
      >
        <span className="font-serif italic text-ember-500 text-3xl sm:text-4xl leading-none pt-1">
          ✦
        </span>
        <p className="text-brand-700 leading-[1.95] text-[15.5px] sm:text-base self-center">
          如果你願意以開放、不評價的態度陪伴 BDSMer，
          也願意在自己的執業身分下公開標註「禁羈友善」，歡迎加入這份名單。
          <br />
          <br />
          我們期待與你一起，讓需要支持的人更容易找到安全、可信賴的助人者。
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
        className="bg-white/70 backdrop-blur-sm rounded-2xl border border-brand-200/70 p-6 sm:p-8 shadow-[0_2px_16px_-8px_rgba(120,69,39,0.18)]"
      >
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-5">
          <h2 className="font-serif-tc text-xl text-brand-900 font-medium">招募表單</h2>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-serif italic text-ember-600 underline decoration-ember-300 underline-offset-4 hover:decoration-ember-600 transition-colors"
          >
            在新分頁開啟 ↗
          </a>
        </div>

        <div className="rounded-xl overflow-hidden border border-brand-200/70 bg-brand-50/40">
          <iframe
            src={FORM_EMBED_URL}
            title="助人者招募表單"
            width="100%"
            height="900"
            frameBorder={0}
            className="block w-full"
          >
            載入中…
          </iframe>
        </div>

        <p className="mt-5 text-xs text-brand-500 leading-relaxed">
          ※ 若表單無法正常顯示，可
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ember-600 underline decoration-ember-300 underline-offset-2 hover:decoration-ember-600 ml-1"
          >
            直接前往原始表單
          </a>
          填寫。
        </p>
      </motion.section>
    </article>
  );
}
