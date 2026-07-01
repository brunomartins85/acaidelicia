import { useState } from 'react';

export function Dashboard() {
  const [copied, setCopied] = useState(false);
  const storeLink = "https://acaidelicia.com.br/loja123";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storeLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-up">
      {/* Dashboard Header */}
      <div className="mb-8 pl-4 md:pl-0">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-on-surface mb-2">Visão Geral de Hoje</h2>
        <p className="font-body-lg text-on-surface-variant">Acompanhe o desempenho da sua loja em tempo real.</p>
      </div>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Metric 1: Total Orders (Featured) */}
        <div className="col-span-1 md:col-span-8 bg-surface-container shadow-[0_4px_24px_rgba(75,0,130,0.08)] rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <h3 className="font-label-lg text-on-surface-variant mb-1">Total de Pedidos Enviados</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-xl text-primary font-black text-5xl md:text-6xl">142</span>
                <span className="font-body-md text-secondary font-medium flex items-center bg-secondary-container/30 px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[16px] mr-1">trending_up</span>
                  +12%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-2xl">local_shipping</span>
            </div>
          </div>
          
          <div className="relative z-10">
            <p className="font-body-md text-on-surface-variant">Última atualização há 5 minutos</p>
          </div>
        </div>

        {/* Metrics Column (Right Side) */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
          
          {/* Metric 2: Best Selling Size */}
          <div className="bg-surface shadow-[0_4px_24px_rgba(75,0,130,0.08)] rounded-2xl p-6 flex items-center gap-5 border border-surface-variant/50">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 text-on-secondary-container">
              <span className="material-symbols-outlined text-3xl">icecream</span>
            </div>
            <div>
              <h3 className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Tamanho Mais Vendido</h3>
              <p className="font-headline-md text-on-surface">500ml</p>
              <p className="font-body-md text-secondary text-sm mt-0.5">68 pedidos hoje</p>
            </div>
          </div>

          {/* Metric 3: Favorite Add-on */}
          <div className="bg-surface shadow-[0_4px_24px_rgba(75,0,130,0.08)] rounded-2xl p-6 flex items-center gap-5 border border-surface-variant/50">
            <div className="w-16 h-16 rounded-full bg-tertiary-container/30 flex items-center justify-center flex-shrink-0 text-on-tertiary-container overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=150&auto=format&fit=crop" 
                alt="Morango" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h3 className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Adicional Favorito</h3>
              <p className="font-headline-md text-on-surface">Morango</p>
              <p className="font-body-md text-secondary text-sm mt-0.5">Em 85% dos pedidos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Store Link Section */}
      <section className="mt-8">
        <div className="bg-surface-bright border border-outline-variant/60 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
              <span className="material-symbols-outlined">link</span>
            </div>
            <div>
              <h3 className="font-headline-md text-on-surface mb-1">Link Público da Loja</h3>
              <p className="font-body-md text-on-surface-variant max-w-md">Compartilhe este link no seu Instagram ou WhatsApp para os seus clientes fazerem pedidos diretamente.</p>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                readOnly 
                value={storeLink}
                className="w-full bg-surface-container-lowest border-2 border-outline-variant rounded-full py-3 px-5 pr-12 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors text-ellipsis" 
              />
            </div>
            <button 
              onClick={handleCopyLink}
              className={`flex-shrink-0 rounded-full px-6 py-3 font-label-lg flex items-center justify-center transition-all shadow-md active:scale-95 whitespace-nowrap min-w-[140px] ${
                copied ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary hover:bg-primary-fixed-variant'
              }`}
            >
              {copied ? (
                <><span className="material-symbols-outlined mr-2">check</span> Copiado!</>
              ) : (
                'Copiar Link'
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}