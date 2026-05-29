import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { NavBar } from './NavBar';
import { SiteFooter } from './SiteFooter';

export function SiteShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* warm gradient atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(120% 80% at 10% -10%, #fde9d3 0%, transparent 55%), radial-gradient(90% 70% at 110% 10%, #f6dec3 0%, transparent 55%), linear-gradient(180deg, #fbf5ef 0%, #f5ebde 100%)',
        }}
      />
      {/* paper grain overlay */}
      <div aria-hidden className="grain-overlay pointer-events-none fixed inset-0 -z-10" />

      <NavBar />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <SiteFooter />
    </div>
  );
}
