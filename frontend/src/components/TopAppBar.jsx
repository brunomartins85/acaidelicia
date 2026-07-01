export function TopAppBar({ onMenuClick }) {
  return (
    <header className="md:hidden fixed top-0 left-0 w-full z-30 flex justify-between items-center px-4 h-16 bg-surface/80 backdrop-blur-md shadow-sm">
      <button 
        onClick={onMenuClick}
        className="p-2 text-primary hover:bg-primary-container/10 transition-colors rounded-full active:scale-95"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
      <h1 className="font-headline-md text-headline-md font-extrabold text-primary">Açaí Delícia</h1>
      <div className="w-10"></div>
    </header>
  );
}