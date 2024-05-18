let loadLibary = false;

export async function initAutocomplete() {
  if (!loadLibary) {
    await google.maps.importLibrary("places");
    loadLibary = true;
  }
}
