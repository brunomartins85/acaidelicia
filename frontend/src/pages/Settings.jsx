import { useState } from 'react';
import { 
  formatPhone, formatCPF, formatCNPJ, 
  formatCEP, formatCurrency, generateSlug 
} from '../utils/masks';

export function Settings() {
  // Controle de estado para a loja
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  
  // Estados do Formulário para controlarmos as máscaras
  const [formData, setFormData] = useState({
    name: 'Açaí Delícia Centro',
    slug: 'acai-delicia-centro',
    phone: '(11) 98765-4321',
    email: 'contato@acaidelicia.com',
    cep: '01310-100',
    address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
    reference: 'Próximo ao metrô Trianon-Masp',
    managerName: 'João da Silva',
    cnpj: '12.345.678/0001-90',
    cpf: '123.456.789-00',
    bio: 'O melhor e mais cremoso açaí da região, preparado com ingredientes frescos e muito amor! 💜',
    minOrder: '25,00',
    deliveryFee: '5,90',
  });

  // Função para lidar com as mudanças nos inputs e aplicar máscaras
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phone') newValue = formatPhone(value);
    if (name === 'cpf') newValue = formatCPF(value);
    if (name === 'cnpj') newValue = formatCNPJ(value);
    if (name === 'minOrder' || name === 'deliveryFee') newValue = formatCurrency(value);

    // Lógica especial para o CEP com consulta ao ViaCEP
    if (name === 'cep') {
      newValue = formatCEP(value);
      
      // Se o CEP estiver completo (9 caracteres incluindo o traço), busca na API
      if (newValue.length === 9) {
        const cleanCep = newValue.replace('-', '');
        fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
          .then(res => res.json())
          .then(data => {
            if (!data.erro) {
              // Preenche os dados do endereço preservando o restante do formulário
              setFormData(prev => ({
                ...prev,
                cep: newValue,
                address: `${data.logradouro},  - ${data.bairro}, ${data.localidade} - ${data.uf}`
              }));
            }
          })
          .catch(err => console.error("Erro ao buscar CEP:", err));
      }
    }

    // Lógica especial para o Slug (URL)
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: generateSlug(value)
      }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  return (
    <div className="animate-fade-up pb-24 md:pb-10 px-4 md:px-0">
      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-on-background">Configurações da Loja</h1>
          <p className="font-body-md text-on-surface-variant mt-1">Gerencie as informações públicas e regras do seu delivery.</p>
        </div>
        
        {/* Toggle de Loja Aberta/Fechada (Verde/Vermelho) */}
        <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-xl shadow-sm border border-surface-variant w-full sm:w-auto">
          <span className={`font-label-lg font-bold ${isStoreOpen ? 'text-green-600' : 'text-red-600'}`}>
            {isStoreOpen ? 'Loja Aberta' : 'Loja Fechada'}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={isStoreOpen}
              onChange={() => setIsStoreOpen(!isStoreOpen)}
            />
            {/* O fundo altera entre vermelho (fechado) e verde (aberto) */}
            <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${isStoreOpen ? 'bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white' : 'bg-red-500'}`}></div>
          </label>
        </div>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        {/* Images & Bio Section */}
        <section className="bg-surface rounded-xl shadow-[0_4px_16px_rgba(75,0,130,0.04)] p-6 border border-surface-variant">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            {/* Logo Upload (Primeiro) */}
            <div className="col-span-1 md:col-span-4 bg-surface-container-lowest rounded-xl p-4 border border-outline-variant flex flex-col items-center justify-center text-center hover:border-primary-container transition-colors cursor-pointer min-h-[200px]">
              <div className="w-24 h-24 rounded-full bg-surface-container-high border-2 border-dashed border-outline-variant mb-4 flex items-center justify-center relative overflow-hidden group hover:border-primary transition-colors">
                <img 
                  src="https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=250&auto=format&fit=crop" 
                  alt="Logo Atual" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
                  <span className="material-symbols-outlined text-white">edit</span>
                </div>
              </div>
              <h3 className="font-label-lg text-on-background">Logo da Loja</h3>
              <p className="font-body-md text-sm text-on-surface-variant mt-1">Rec: 400x400px</p>
            </div>

            {/* Banner Upload (Segundo) */}
            <div className="col-span-1 md:col-span-8 bg-surface-container-lowest rounded-xl p-4 border border-outline-variant relative overflow-hidden group min-h-[200px] flex flex-col justify-center items-center text-center hover:border-primary-container transition-colors cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity bg-primary-container"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=800&auto=format&fit=crop')" }}
              ></div>
              <div className="relative z-10 p-4 bg-surface/90 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 flex flex-col items-center">
                <span className="material-symbols-outlined text-primary text-3xl mb-2">add_photo_alternate</span>
                <h3 className="font-label-lg text-on-background">Alterar Banner da Loja</h3>
                <p className="font-body-md text-sm text-on-surface-variant mt-1">Rec: 1200x400px (JPG, PNG)</p>
              </div>
            </div>
          </div>

          {/* Bio da Loja */}
          <div>
            <label className="block font-label-lg text-on-surface mb-1" htmlFor="bio">Biografia do Restaurante</label>
            <textarea 
              id="bio" 
              name="bio"
              rows="2" 
              value={formData.bio}
              onChange={handleChange}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none transition-all resize-none" 
              placeholder="Conte aos seus clientes um pouco sobre a sua loja..."
            ></textarea>
          </div>
        </section>

        {/* Informações Básicas (Grid de 12 colunas) */}
        <section className="bg-surface rounded-xl shadow-[0_4px_16px_rgba(75,0,130,0.04)] p-6 border border-surface-variant relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-secondary-container"></div>
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">storefront</span>
            <h2 className="font-headline-md text-on-background">Informações Básicas</h2>
          </div>
          
          <div className="grid grid-cols-12 gap-4">
            {/* Linha 1 */}
            <div className="col-span-12 md:col-span-6">
              <label className="block font-label-lg text-on-surface mb-1">Nome da Loja</label>
              <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none" />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="block font-label-lg text-on-surface mb-1">URL da Loja</label>
              <div className="flex bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
                <span className="bg-surface-variant px-3 py-3 text-on-surface-variant text-sm flex items-center">acaidelicia.com.br/</span>
                <input name="slug" value={formData.slug} readOnly className="w-full bg-transparent px-3 py-3 text-on-background font-body-lg outline-none opacity-80" />
              </div>
            </div>

            {/* Linha 2 */}
            <div className="col-span-12 md:col-span-6">
              <label className="block font-label-lg text-on-surface mb-1">Telefone / WhatsApp</label>
              <input name="phone" value={formData.phone} onChange={handleChange} inputMode="numeric" placeholder="(00) 00000-0000" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none" />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="block font-label-lg text-on-surface mb-1">E-mail</label>
              <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="loja@email.com" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none" />
            </div>

            {/* Linha 3 */}
            <div className="col-span-12 md:col-span-3">
              <label className="block font-label-lg text-on-surface mb-1">CEP</label>
              <input name="cep" value={formData.cep} onChange={handleChange} inputMode="numeric" placeholder="00000-000" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <label className="block font-label-lg text-on-surface mb-1">Endereço Completo</label>
              <input name="address" value={formData.address} onChange={handleChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none" />
            </div>

            {/* Linha 4 */}
            <div className="col-span-12">
              <label className="block font-label-lg text-on-surface mb-1">Ponto de Referência</label>
              <input name="reference" value={formData.reference} onChange={handleChange} placeholder="Ex: Em frente a praça" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none" />
            </div>

            {/* Linha 5 (Dados Legais) */}
            <div className="col-span-12 mt-4 pt-4 border-t border-surface-variant"><h3 className="font-label-lg text-on-surface-variant uppercase tracking-wider">Dados Legais da Empresa</h3></div>
            <div className="col-span-12 md:col-span-6">
              <label className="block font-label-lg text-on-surface mb-1">Responsável pela Empresa</label>
              <input name="managerName" value={formData.managerName} onChange={handleChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none" />
            </div>
            <div className="col-span-12 md:col-span-3">
              <label className="block font-label-lg text-on-surface mb-1">CPF do Resp.</label>
              <input name="cpf" value={formData.cpf} onChange={handleChange} inputMode="numeric" placeholder="000.000.000-00" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none" />
            </div>
            <div className="col-span-12 md:col-span-3">
              <label className="block font-label-lg text-on-surface mb-1">CNPJ</label>
              <input name="cnpj" value={formData.cnpj} onChange={handleChange} inputMode="numeric" placeholder="00.000.000/0001-00" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none" />
            </div>
          </div>
        </section>

        {/* Regras Operacionais (Grid de 3 Colunas) */}
        <section className="bg-surface rounded-xl shadow-[0_4px_16px_rgba(75,0,130,0.04)] p-6 border border-surface-variant relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-tertiary-container"></div>
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-tertiary">rule</span>
            <h2 className="font-headline-md text-on-background">Regras Operacionais</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pedido Mínimo */}
            <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30">
              <div className="flex justify-between items-center mb-2">
                <label className="font-label-lg text-on-surface">Pedido Mínimo</label>
                <span className="material-symbols-outlined text-outline">payments</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">R$</span>
                <input 
                  name="minOrder" 
                  value={formData.minOrder} 
                  onChange={handleChange} 
                  inputMode="numeric"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-12 pr-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none" 
                />
              </div>
            </div>

            {/* Taxa de Entrega */}
            <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30">
              <div className="flex justify-between items-center mb-2">
                <label className="font-label-lg text-on-surface">Taxa de Entrega</label>
                <span className="material-symbols-outlined text-outline">local_shipping</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">R$</span>
                <input 
                  name="deliveryFee" 
                  value={formData.deliveryFee} 
                  onChange={handleChange} 
                  inputMode="numeric"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-12 pr-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none" 
                />
              </div>
            </div>

            {/* Tempo Estimado */}
            <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30">
              <div className="flex justify-between items-center mb-2">
                <label className="font-label-lg text-on-surface">Tempo Estimado</label>
                <span className="material-symbols-outlined text-outline">timer</span>
              </div>
              <div className="relative">
                <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-background font-body-lg focus:ring-2 focus:ring-primary-container focus:outline-none appearance-none">
                  <option value="15-30">15 a 30 min</option>
                  <option value="30-45" defaultValue>30 a 45 min</option>
                  <option value="45-60">45 a 60 min</option>
                  <option value="60-90">60 a 90 min</option>
                  <option value="90+">Mais de 90 min</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="fixed bottom-0 md:bottom-auto md:relative left-0 w-full md:w-auto bg-surface md:bg-transparent border-t border-outline-variant/30 md:border-none p-4 md:p-0 z-40 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-0 shadow-[0_-4px_10px_rgba(75,0,130,0.08)] md:shadow-none flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
          <button type="button" className="px-6 py-3 rounded-full border border-primary text-primary font-label-lg hover:bg-primary-container/10 transition-colors w-full sm:w-auto">
            Descartar Alterações
          </button>
          <button type="submit" className="px-8 py-3 rounded-full bg-primary text-on-primary font-label-lg hover:bg-primary/90 shadow-md transition-all active:scale-95 w-full sm:w-auto flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">save</span>
            Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
}