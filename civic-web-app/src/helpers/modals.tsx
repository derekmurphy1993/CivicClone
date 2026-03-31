import { CivEvent } from '../types/civEvents';
import { MobileShareInfo, ShareInfo } from '../types/modals';

export function getShareInfo(civEvent: CivEvent): ShareInfo {
  return {
    id: civEvent.id,
    slug: civEvent.slug,
    url: civEvent.coverImageUrl,
    title: civEvent.title,
  };
}

export function getMobileShareInfo(civEvent: CivEvent): MobileShareInfo {
  return {
    title: civEvent.title,
    text: 'Check out this event on Civic',
    url: 'http://civicapp.co/events/' + civEvent.slug,
  };
}
