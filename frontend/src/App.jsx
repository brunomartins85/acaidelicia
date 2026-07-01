import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Settings } from './pages/Settings';
import { Schedule } from './pages/Schedule';

// Componente temporário para as páginas que ainda vamos criar
function PlaceholderPage({ title, description }) {
  return (
    <div className="pl-4 md:pl-0 animate-fade-up">
      <h2 className="font-headline-lg-mobile md:font-headline-lg text-on-surface mb-2">{title}</h2>
      <p className="font-body-lg text-on-surface-variant">{description}</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Administrativa */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Substituímos o Placeholder pelo nosso novo componente Dashboard! */}
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="settings" element={<Settings />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>

        {/* Redirecionamento de segurança temporário */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;