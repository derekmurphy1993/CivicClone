import { ModalsConfig, ShareInfo } from '../types/modals';

export const DEFAULT_SHARE_INFO: ShareInfo = {
  id: '',
  slug: '',
  url: '',
  title: '',
}

export const DEFAULT_MODALS_CONFIG: ModalsConfig = {
  calendar: {
    open: false,
  },
  login: {
    open: false,
  },
  mobileFilter: {
    open: false,
  },
  share: {
    open: false,
  },
  thankYou: {
    open: false,
  },
  shareInfo: DEFAULT_SHARE_INFO,
}
