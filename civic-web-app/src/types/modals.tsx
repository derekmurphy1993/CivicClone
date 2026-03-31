import { Dispatch, SetStateAction } from "react";

/** Configuration info for a single modal. */
export interface ModalConfig {
  open: boolean;
}

/** Configuration info for all modals. */
export interface ModalsConfig {
  calendar: ModalConfig;
  login: ModalConfig;
  mobileFilter: ModalConfig;
  share: ModalConfig;
  thankYou: ModalConfig;
  shareInfo: ShareInfo;
}

/** Event data needed for the ShareModal or AddToCalendarModal. */
export interface ShareInfo {
  id: string;
  slug: string;
  url: string;
  title: string;
}

/** Event data needed for modals on mobile. */
export interface MobileShareInfo {
  text: string;
  title: string;
  url: string;
}
