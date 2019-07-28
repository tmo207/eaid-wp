import { useLayoutEffect } from 'react';

import VeranstaltungenTemplate from '../components/Veranstaltungen/VeranstaltungenTemplate';
import VeranstaltungenArchivTemplate from '../components/Veranstaltungen/VeranstaltungenArchivTemplate';
import { PageTemplate } from '../templates/page';
import VereinTemplate from '../components/Verein/VereinTemplate';
import PublikationenTemplate from '../components/PublikationenTemplate';

import {
  VERANSTALTUNGEN_ID,
  VERANSTALTUNGEN_ARCHIV_ID,
  VEREIN_ID,
  MAIN_MENU_ID,
  PUBLIKATIONEN_ID
} from './config';

export const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.documentElement)
      .overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => (document.documentElement.style.overflow = originalStyle);
  }, []);
};

export const getExcerpt = (content, isExcerpt) => {
  const endOfExcerptTagsLength = 5;
  const excerptLength = isExcerpt
    ? content.length - endOfExcerptTagsLength
    : 500;
  const newExcerpt = content.slice(0, excerptLength).concat('...');

  return newExcerpt;
};

export const selectTemplate = id => {
  switch (id) {
    case VERANSTALTUNGEN_ID:
      return VeranstaltungenTemplate;
    case VERANSTALTUNGEN_ARCHIV_ID:
      return VeranstaltungenArchivTemplate;
    case VEREIN_ID:
      return VereinTemplate;
    case PUBLIKATIONEN_ID:
      return PublikationenTemplate;
    default:
      return PageTemplate;
  }
};

export const getMainMenu = menus =>
  menus.filter(item => {
    const { wordpress_id } = item.node;
    return wordpress_id === MAIN_MENU_ID;
  })[0].node;

export const getSubPages = (parentPages, targetParentId) =>
  parentPages.filter(
    page => page.wordpress_children && page.object_id === targetParentId
  )[0].wordpress_children;

export const getVeranstaltungen = menus => {
  const mainMenu = getMainMenu(menus);
  const veranstaltungenAll = getSubPages(mainMenu.items, VERANSTALTUNGEN_ID);

  return veranstaltungenAll;
};
