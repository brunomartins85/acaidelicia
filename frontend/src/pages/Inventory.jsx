import { useState } from 'react';

export function Inventory() {
  const [activeTab, setActiveTab] = useState('tamanhos');

  // Abas de navegação
  const tabs = [
    { id: 'tamanhos', label: 'Tamanhos', icon: 'local_cafe' },
    { id: 'bases', label: 'Bases', icon: 'icecream' },
    { id: 'frutas', label: 'Frutas', icon: 'nutrition' },
    { id: 'adicionais', label: 'Adicionais', icon: 'cookie' },
  ];

  // Dados de exemplo (Mocks) para visualização
  const mockData = {
    tamanhos: [
      { id: 1, name: '300ml', description: 'Copo Pequeno', price: 'R$ 12,00', active: true },
      { id: 2, name: '500ml', description: 'Copo Médio', price: 'R$ 18,00', active: true },
      { id: 3, name: 'Barca 1L', description: 'Especial', price: 'R$ 45,00', active: false },
    ],
    bases: [
      { id: 1, name: 'Açaí Tradicional', description: 'Nossa base clássica.', price: 'R$ 0,00', active: true },
      { id: 2, name: 'Creme de Cupuaçu', description: 'Sabor agridoce marcante.', price: '+ R$ 2,50', active: true },
    ]
  };

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pl-4 md:pl-0">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-on-background">Estoque</h1>
          <p className="font-body-md text-on-surface-variant mt-1">Gerencie tamanhos, bases e complementos da sua loja.</p>
        </div>
        <button className="bg-primary text-on-primary font-label-lg px-6 py-3 rounded-full hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-95 w-full md:w-auto">
          <span className="material-symbols-outlined">add</span>
          Novo Item
        </button>
      </div>

      {/* Tabs / Filtros */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pl-4 md:pl-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-label-sm transition-all whitespace-nowrap border ${
              activeTab === tab.id
                ? 'bg-secondary-container text-on-secondary-container border-secondary-container'
                : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid de Cards (Renderização condicional baseada na aba) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0">
        
        {/* Renderiza Tamanhos */}
        {activeTab === 'tamanhos' && mockData.tamanhos.map(item => (
          <div key={item.id} className={`bg-surface rounded-xl shadow-[0_-4px_10px_rgba(75,0,130,0.08)] p-6 border border-surface-variant relative overflow-hidden group hover:shadow-lg transition-shadow ${!item.active && 'opacity-60 grayscale-[0.5]'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">local_cafe</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-on-surface">{item.name}</h3>
                  <p className="font-label-sm text-on-surface-variant">{item.description}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <span className="font-headline-md text-secondary font-bold">{item.price}</span>
              <div className="flex items-center gap-2">
                <button aria-label="Editar" className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-full">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Renderiza Bases */}
        {activeTab === 'bases' && mockData.bases.map(item => (
          <div key={item.id} className="bg-surface rounded-xl shadow-[0_-4px_10px_rgba(75,0,130,0.08)] p-6 border border-surface-variant relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">icecream</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-on-surface">{item.name}</h3>
                  <p className="font-label-sm text-on-surface-variant">{item.description}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <span className="font-headline-md text-primary font-bold">{item.price}</span>
              <div className="flex items-center gap-2">
                <button aria-label="Editar" className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-full">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Mensagem temporária para abas sem mock */}
        {(activeTab === 'frutas' || activeTab === 'adicionais') && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-xl">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">construction</span>
            <p className="font-body-md text-on-surface-variant">Conectando com o banco de dados em breve...</p>
          </div>
        )}

      </div>
    </div>
  );
}