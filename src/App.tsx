import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ResourceExplorer } from './components/ResourceExplorer';

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ResourceExplorer />
      <Footer />
    </div>
  );
}
