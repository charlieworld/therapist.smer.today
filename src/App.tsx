import { Route, Routes } from 'react-router-dom';
import { SiteShell } from './components/layout/SiteShell';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContributePage } from './pages/ContributePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <SiteShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteShell>
  );
}
