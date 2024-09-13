import { Place } from '../types/place';

export function isVideo(images: Place['images']) {
  const imagesSplit = images[0].url.split('.');
  return imagesSplit[imagesSplit.length - 1] === 'mp4';
}
