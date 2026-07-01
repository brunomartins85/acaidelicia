import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TopAppBar } from '../components/TopAppBar';

export function AdminLayout() {
  // Criamos o estado que controla a abertura do menu mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-on-background">
      {/* Passamos a função de abrir para o cabeçalho */}
      <TopAppBar onMenuClick={() => setIsSidebarOpen(true)} />
      
      {/* Passamos o estado atual e a função de fechar para a Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 md:ml-72 pt-20 pb-24 md:pt-8 md:pb-8 px-4 md:px-8 w-full max-w-[1400px] mx-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}