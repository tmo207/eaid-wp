import { useLayoutEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import VeranstaltungenTemplate from '../components/Veranstaltungen/VeranstaltungenTemplate';
import VeranstaltungenArchivTemplate from '../components/Veranstaltungen/VeranstaltungenArchivTemplate';
import { PageTemplate } from '../templates/page';
import VereinTemplate from '../components/Verein/VereinTemplate';
import PublikationenTemplate from '../components/PublikationenTemplate';
import AktuellesTemplate from '../components/Aktuelles/AktuellesTemplate';
import AktuellesArchivTemplate from '../components/Aktuelles/AktuellesArchivTemplate';

import { useLanguageStateValue } from './state';
import {
  VERANSTALTUNGEN_ID,
  VERANSTALTUNGEN_ARCHIV_ID,
  VEREIN_ID,
  MAIN_MENU_ID,
  PUBLIKATIONEN_ID,
  AKTUELLES_ID,
  AKTUELLESARCHIV_ID
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
    case AKTUELLES_ID:
      return AktuellesTemplate;
    case AKTUELLESARCHIV_ID:
      return AktuellesArchivTemplate;
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

export const getMenuSubFields = (menus, pageId) => {
  const mainMenu = getMainMenu(menus);
  const veranstaltungenAll = getSubPages(mainMenu.items, pageId);

  return veranstaltungenAll;
};

export const toLowerCaseArray = value => value.toLowerCase().split(' ');

export const getDateAndTime = () => {
  const date = new Date();
  const month = date.getMonth() + 1;

  const condPrefixTime = getTime =>
    getTime.toString().length === 1 ? `0${getTime}` : getTime;

  return `${date.getFullYear()}-${condPrefixTime(month)}-${condPrefixTime(
    date.getDate()
  )}T${condPrefixTime(date.getHours())}:${condPrefixTime(
    date.getMinutes()
  )}:${condPrefixTime(date.getSeconds())}`;
};

export const unflatten = (array, parent, tree) => {
  tree = typeof tree !== 'undefined' ? tree : [];

  parent = typeof parent !== 'undefined' ? parent : null;

  const children = parent
    ? array.filter(child => {
        if (child.node.parent_element !== null) {
          return (
            child.node.parent_element.wordpress_id === parent.node.wordpress_id
          );
        }
      })
    : array.filter(comment => !comment.node.parent_element);

  if (children.length) {
    if (!parent) {
      tree = children;
    } else {
      parent.node.children_elements = children;
    }
    children.forEach(child => {
      unflatten(array, child);
    });
  }

  return tree;
};

export const usePostsSearch = (value, posts) => {
  const searchValueArray = toLowerCaseArray(value).filter(el => el !== '');

  const result = posts.filter(post => {
    const { title, excerpt, date, author } = post.node;

    const contentArray = toLowerCaseArray(title).concat(
      toLowerCaseArray(excerpt),
      toLowerCaseArray(date),
      toLowerCaseArray(author.name)
    );

    const isSubstringIncluded = string =>
      contentArray.find(contentElement => contentElement.includes(string));

    return searchValueArray.every(isSubstringIncluded);
  });

  const numberOfPosts = result.length;

  return { filteredPosts: result, numberOfPosts };
};

export const getRightLanguagePosts = (posts, language) => {
  if (posts) {
    return posts.filter(
      post => language === post.node.polylang_current_lang.split(/[-_]/)[0]
    );
  }
  return null;
};

export const getRightLanguagePage = (translations, language) => {
  const translation = translations.filter(
    translation =>
      translation.polylang_current_lang.split(/[-_]/)[0] === language
  )[0];

  const germanPage = translations.filter(
    translation => translation.polylang_current_lang.split(/[-_]/)[0] === 'de'
  )[0];

  if (translation) {
    return translation;
  }

  return germanPage;
};

export const getLanguage = () => {
  const [{ language: browserLanguage }] = useLanguageStateValue();
  const wpLanguageSetting = useStaticQuery(graphql`
    query languageSetting {
      allWordpressAcfOptions {
        nodes {
          options {
            veroffentlichte_sprachen
          }
        }
      }
    }
  `).allWordpressAcfOptions.nodes[0].options.veroffentlichte_sprachen;

  const shouldTranslate = wpLanguageSetting !== 'Nur Deutsch';
  const language = shouldTranslate ? browserLanguage : 'de';

  return language;
};
