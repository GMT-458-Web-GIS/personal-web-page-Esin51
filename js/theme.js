// Dark Mode toggle — kalıcı hafıza + sistem tercihine saygı
(function(){
  const root = document.documentElement;
  const btn  = document.getElementById('themeToggle');

  // Başlangıç teması: localStorage > sistem tercihi > light
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  if(initial === 'dark') root.classList.add('dark');
  btn.setAttribute('aria-pressed', root.classList.contains('dark'));

  // Tıklama: tema değiştir
  btn.addEventListener('click', () => {
    const darkOn = root.classList.toggle('dark');
    localStorage.setItem('theme', darkOn ? 'dark' : 'light');
    btn.setAttribute('aria-pressed', darkOn);
  });
})();
