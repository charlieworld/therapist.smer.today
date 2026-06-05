import { NavLink, Link } from 'react-router-dom';

const NAV = [
  { to: '/', label: '助人者名單', en: 'Directory' },
  { to: '/about', label: '關於資源網', en: 'About' },
  { to: '/contribute', label: '加入名單', en: 'Contribute' },
];

export function NavBar() {
  return (
    <header className="relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 pb-4">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <Link to="/" className="group inline-flex items-baseline gap-3">
            <span className="font-serif italic text-ember-600 text-xl">therapist</span>
            <span className="text-xs tracking-[0.3em] uppercase text-brand-500">
              Kink-Aware Professionals in Taiwan
            </span>
          </Link>

          <nav>
            <ul className="flex gap-1 sm:gap-2">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      [
                        'group inline-flex flex-col items-center px-3 py-2 transition-colors',
                        isActive ? 'text-brand-900' : 'text-brand-500 hover:text-brand-800',
                      ].join(' ')
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="text-sm font-medium">{item.label}</span>
                        <span
                          className={[
                            'mt-1 h-[2px] w-6 rounded-full transition-all duration-300',
                            isActive
                              ? 'bg-ember-500 w-8'
                              : 'bg-transparent group-hover:bg-brand-300 group-hover:w-4',
                          ].join(' ')}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {/* hairline */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent" />
      </div>
    </header>
  );
}
