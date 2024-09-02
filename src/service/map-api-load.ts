let loadLibary = false;

export async function initGoogleLib() {
  if (!loadLibary) {
    await google.maps.importLibrary('places');

    loadLibary = true;
  }
}
