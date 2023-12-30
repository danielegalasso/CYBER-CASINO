window.addEventListener('resize', checkPixelRatio);

function checkPixelRatio() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const pixelRatio = windowWidth / windowHeight;

  // Imposta il tuo valore di soglia
  const soglia = 1.0;

  if (pixelRatio < soglia) {
    showAlert();
  }
}

function showAlert() {
  alert('Il rapporto pixel orizzontale/verticale è inferiore alla soglia!');
}

// Esegui il controllo al caricamento della pagina
checkPixelRatio();
