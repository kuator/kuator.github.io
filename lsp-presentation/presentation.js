// Default: White with presentation accents. Explicit themes use stock styling.
const theme = new URLSearchParams(location.search).get('theme');
const style = new URLSearchParams(location.search).get('style');
const themes = ['simple', 'white', 'black', 'league', 'beige', 'night', 'serif', 'solarized', 'moon', 'dracula', 'sky', 'blood'];
if (themes.includes(theme)) {
  document.querySelector('#theme').href = `lib/reveal.js/dist/theme/${theme}.css`;
}
if (themes.includes(theme) || style === 'stock') {
  document.body.classList.remove('deck-enhanced');
}

if (typeof Reveal === 'undefined') {
  document.querySelector('#load-error').hidden = false;
  document.body.classList.add('load-failed');
} else {
  const deck = new Reveal({
    width: 1280, height: 720, margin: 0.06,
    hash: true, controls: true, progress: true, slideNumber: 'c/t',
    transition: 'fade', backgroundTransition: 'fade',
    center: true, navigationMode: 'linear',
    plugins: [
      ...(typeof RevealNotes === 'undefined' ? [] : [RevealNotes]),
      ...(typeof RevealHighlight === 'undefined' ? [] : [RevealHighlight]),
    ],
    pdfSeparateFragments: false,
  });
  const updateChapter = ({ currentSlide }) => {
    document.querySelector('#chapter-label').textContent =
      currentSlide.querySelector('.section-label')?.textContent || '';
  };
  deck.on('ready', updateChapter);
  deck.on('slidechanged', updateChapter);
  deck.initialize();
  window.deck = deck;
}
