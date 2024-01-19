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
  alert('The horizontal/vertical pixel ratio is below the threshold!');
}

// Esegui il controllo al caricamento della pagina
checkPixelRatio();
