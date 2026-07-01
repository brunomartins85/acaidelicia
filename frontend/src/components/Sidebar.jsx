import { Link, useLocation } from 'react-router-dom';

export function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { name: 'Estoque', path: '/admin/inventory', icon: 'inventory_2' },
    { name: 'Configurações', path: '/admin/settings', icon: 'settings' },
    { name: 'Horários', path: '/admin/schedule', icon: 'schedule' },
  ];

  return (
    <>
      {/* Fundo escuro (Overlay) que aparece no mobile quando o menu está aberto */}
      {/* Clicar neste fundo escuro fechará o menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Menu Lateral com animação de deslizamento */}
      <aside 
        className={`flex flex-col h-screen fixed left-0 top-0 z-50 w-72 bg-surface-container-low shadow-xl rounded-r-xl transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-6 border-b border-surface-variant flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-headline-md font-bold">
            AD
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-primary leading-tight">Painel Admin</h2>
            <p className="font-body-md text-sm text-on-surface-variant">Gerencie sua Açaíteria</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose} // <-- Fecha o menu mobile ao clicar em um link
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors active:opacity-80 ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="font-label-lg text-label-lg">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-surface-variant">
          <button className="flex w-full items-center gap-3 text-error px-4 py-3 mx-2 hover:bg-error-container/20 transition-colors rounded-lg active:opacity-80">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-lg text-label-lg">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}