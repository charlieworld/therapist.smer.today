import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 pb-8 sm:pt-16 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-serif italic text-ember-600 text-sm sm:text-base mb-3 tracking-wide">
            for those seeking a safe, knowing ear.
          </p>
          <h1 className="font-serif-tc text-4xl sm:text-5xl md:text-6xl leading-[1.15] text-brand-900 font-medium tracking-tight">
            禁羈友善
            <span className="block text-brand-700 mt-1">助人工作者資源網</span>
          </h1>
          <div className="mt-8 flex items-start gap-4 max-w-2xl">
            <span
              aria-hidden
              className="mt-2 h-[2px] w-10 bg-ember-500 shrink-0 animate-breathe origin-left"
            />
            <p className="text-brand-700 text-base sm:text-lg leading-[1.85]">
              這裡名列公開標註為「禁羈友善」的專業助人者，希望讓需要心理支持的
              BDSMer，更容易找到理解、被接納的陪伴。
              <br />
              名單中的每一位助人者代表的是「公開標註為禁羈友善」的立場，而非專業能力的背書。若你需要進一步確認其適合度，仍建議以其他管道自行查證。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
