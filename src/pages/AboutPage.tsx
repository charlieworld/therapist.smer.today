import { motion } from 'motion/react';

interface Chapter {
  num: string;
  title: string;
  body: React.ReactNode;
}

const CHAPTERS: Chapter[] = [
  {
    num: '01',
    title: '關於資源網',
    body: (
      <>
        這裡整理的是願意公開標註為「禁羈友善」的專業助人者名單。我們致力於讓需要心理支持的 BDSMer，
        能更容易找到理解、多元友善、值得信任的專業工作者。
        <br />
        <br />
        目前國內幾乎沒有相關資源，因此這是一項初步行動。透過助人者願意現身、清楚表示自身的友善立場，
        我們期望讓更多人看見這個議題，也讓需要的人不再孤單摸索。
      </>
    ),
  },
  {
    num: '02',
    title: '如何使用這份名單',
    body: (
      <>
        點選導覽列的「助人者名單」，內容包含助人者的姓名、執業地點、聯繫方式與簡短介紹。
        你可以依照個人的需求直接聯繫助人者，若你願意，也能在聯繫時說明是透過本資源網得知資訊。
        <br />
        <br />
        若想確定彼此是否合適，建議可再查看助人者的公開資料、評價或先安排一次初談，感受是否契合。
      </>
    ),
  },
  {
    num: '03',
    title: '助人者的審查方式',
    body: (
      <>
        為了讓名單能持續且穩定地更新，我們採取形式審查。
        我們會確認申請者的姓名、工作資料與聯繫方式，確實為現行執業的專業助人者。
        我們不會進行任何 BDSM 相關能力或專業熟悉度的實質審查。
        <br />
        <br />
        因此，名單中的每一位助人者代表的是「公開標註為禁羈友善」的立場，而非專業能力的背書。
        若你需要進一步確認其適合度，仍建議以其他管道自行查證。
      </>
    ),
  },
  {
    num: '04',
    title: '免責聲明',
    body: (
      <>
        本名單僅作為資訊整理與公開使用，不參與也不介入任何諮商契約、安排或後續互動。
        助人者的專業表現、工作風格與服務品質皆由個別助人者自行負責。
        使用者與助人者之間的選擇、互動及其後果，需自行斟酌與承擔。
        <br />
        <br />
        若雙方產生爭議，本資源網無參與調解或處理之責任，建議使用者回到助人者所屬機構或公會反映。
        我們能提供方向，但如何走向支持，是屬於你的選擇。
      </>
    ),
  },
  {
    num: '05',
    title: '修改或撤除名單資訊',
    body: (
      <>
        若助人者希望更新資料或退出名單，可寄信至：
        <a
          href="mailto:bdsmertherapist@gmail.com"
          className="ml-1 text-ember-600 underline decoration-ember-300 underline-offset-4 hover:decoration-ember-600 transition-colors break-all"
        >
          bdsmertherapist@gmail.com
        </a>
      </>
    ),
  },
  {
    num: '06',
    title: '版權與使用條款',
    body: (
      <>
        本資源網所收錄之助人者名單、文字內容、設計與網站程式碼，皆受著作權法保護。
        本資源網僅供個人查閱與非商業用途使用。
        <br />
        <br />
        任何形式之轉載、再次發佈、改作、整合或商業使用，請於使用前以電子郵件聯絡
        <a
          href="mailto:bdsmertherapist@gmail.com"
          className="mx-1 text-ember-600 underline decoration-ember-300 underline-offset-4 hover:decoration-ember-600 transition-colors break-all"
        >
          bdsmertherapist@gmail.com
        </a>
        並取得書面同意。
        <br />
        <br />
        名單中之助人者個資，已取得當事人「公開列入本資源網」之同意；
        此同意僅限於本資源網之展示與查閱，不得視為授權第三方轉用其資料。
      </>
    ),
  },
];

export function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-20">
      <header className="mb-16 sm:mb-24">
        <p className="font-serif italic text-ember-600 text-sm mb-3 tracking-wide">
          a note to readers.
        </p>
        <h1 className="font-serif-tc text-4xl sm:text-5xl text-brand-900 font-medium leading-[1.2] tracking-tight">
          關於這份名單
        </h1>
        <div className="mt-6 h-[2px] w-12 bg-ember-500" />
      </header>

      <div className="space-y-16">
        {CHAPTERS.map((ch, i) => (
          <motion.section
            key={ch.num}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
            className="grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 gap-y-3"
          >
            <span className="font-serif italic text-ember-500 text-3xl sm:text-4xl leading-none pt-1">
              {ch.num}
            </span>
            <h2 className="font-serif-tc text-2xl sm:text-3xl text-brand-900 font-medium tracking-tight self-end">
              {ch.title}
            </h2>
            <span aria-hidden />
            <p className="text-brand-700 leading-[1.95] text-[15.5px] sm:text-base">{ch.body}</p>
          </motion.section>
        ))}
      </div>

      <div className="mt-24 pt-10 border-t border-brand-200/60 text-center">
        <p className="font-serif italic text-brand-400 text-sm leading-relaxed">
          願這份名單，能成為某一個夜裡<br />一道微光。
        </p>
      </div>
    </article>
  );
}
