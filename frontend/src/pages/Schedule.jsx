import { useState } from 'react';

export function Schedule() {
  // Estado inicial com os 7 dias da semana
  const [schedule, setSchedule] = useState([
    { id: 'mon', name: 'Segunda-feira', isOpen: false, openTime: '14:00', closeTime: '23:00' },
    { id: 'tue', name: 'Terça-feira', isOpen: true, openTime: '14:00', closeTime: '23:00' },
    { id: 'wed', name: 'Quarta-feira', isOpen: true, openTime: '14:00', closeTime: '23:00' },
    { id: 'thu', name: 'Quinta-feira', isOpen: true, openTime: '14:00', closeTime: '23:00' },
    { id: 'fri', name: 'Sexta-feira', isOpen: true, openTime: '14:00', closeTime: '23:00' },
    { id: 'sat', name: 'Sábado', isOpen: true, openTime: '12:00', closeTime: '23:59' },
    { id: 'sun', name: 'Domingo', isOpen: true, openTime: '12:00', closeTime: '23:59' },
  ]);

  // Função para alternar entre Aberto/Fechado num dia específico
  const toggleDay = (id) => {
    setSchedule(schedule.map(day => 
      day.id === id ? { ...day, isOpen: !day.isOpen } : day
    ));
  };

  // Função para atualizar a hora de abertura ou fecho
  const handleTimeChange = (id, field, value) => {
    setSchedule(schedule.map(day => 
      day.id === id ? { ...day, [field]: value } : day
    ));
  };

  return (
    <div className="animate-fade-up pb-24 md:pb-10 px-4 md:px-0">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-on-background">Horários de Funcionamento</h1>
        <p className="font-body-md text-on-surface-variant mt-1">Defina os dias e horas em que a sua loja aceita pedidos automaticamente.</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        
        {/* Cartão Principal com a lista de dias */}
        <section className="bg-surface rounded-xl shadow-[0_4px_16px_rgba(75,0,130,0.04)] border border-surface-variant overflow-hidden">
          <div className="p-6 border-b border-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">schedule</span>
            <h2 className="font-headline-md text-on-background">Configuração Semanal</h2>
          </div>

          <div className="divide-y divide-surface-variant">
            {schedule.map((day) => (
              <div key={day.id} className={`p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${!day.isOpen ? 'bg-surface-container-lowest/50 grayscale-[0.2]' : 'hover:bg-surface-container-lowest'}`}>
                
                {/* Lado Esquerdo: Nome do Dia e Toggle */}
                <div className="flex items-center justify-between sm:w-1/3">
                  <span className={`font-label-lg ${day.isOpen ? 'text-on-surface' : 'text-on-surface-variant line-through'}`}>
                    {day.name}
                  </span>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={day.isOpen}
                      onChange={() => toggleDay(day.id)}
                    />
                    <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${day.isOpen ? 'bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white' : 'bg-outline-variant'}`}></div>
                  </label>
                </div>

                {/* Lado Direito: Inputs de Horário */}
                <div className={`flex items-center gap-3 transition-opacity ${day.isOpen ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-on-surface-variant mb-1 text-xs uppercase tracking-wider">Abertura</span>
                    <input 
                      type="time" 
                      value={day.openTime}
                      onChange={(e) => handleTimeChange(day.id, 'openTime', e.target.value)}
                      disabled={!day.isOpen}
                      className="bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-on-background font-body-md focus:ring-2 focus:ring-primary-container focus:outline-none"
                    />
                  </div>
                  
                  <span className="text-on-surface-variant font-bold mt-5">-</span>
                  
                  <div className="flex flex-col">
                    <span className="font-label-sm text-on-surface-variant mb-1 text-xs uppercase tracking-wider">Fecho</span>
                    <input 
                      type="time" 
                      value={day.closeTime}
                      onChange={(e) => handleTimeChange(day.id, 'closeTime', e.target.value)}
                      disabled={!day.isOpen}
                      className="bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-on-background font-body-md focus:ring-2 focus:ring-primary-container focus:outline-none"
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Botões de Ação */}
        <div className="fixed bottom-0 md:bottom-auto md:relative left-0 w-full md:w-auto bg-surface md:bg-transparent border-t border-outline-variant/30 md:border-none p-4 md:p-0 z-40 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-0 shadow-[0_-4px_10px_rgba(75,0,130,0.08)] md:shadow-none flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
          <button type="button" className="px-6 py-3 rounded-full border border-primary text-primary font-label-lg hover:bg-primary-container/10 transition-colors w-full sm:w-auto">
            Descartar Alterações
          </button>
          <button type="submit" className="px-8 py-3 rounded-full bg-primary text-on-primary font-label-lg hover:bg-primary/90 shadow-md transition-all active:scale-95 w-full sm:w-auto flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">save</span>
            Guardar Horários
          </button>
        </div>
      </form>
    </div>
  );
}