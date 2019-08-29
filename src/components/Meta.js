import React from 'react';
import { Helmet } from 'react-helmet';

import apple57 from '../img/favicons/apple-icon-57x57.png';
import apple60 from '../img/favicons/apple-icon-60x60.png';
import apple72 from '../img/favicons/apple-icon-72x72.png';
import apple76 from '../img/favicons/apple-icon-76x76.png';
import apple114 from '../img/favicons/apple-icon-114x114.png';
import apple120 from '../img/favicons/apple-icon-120x120.png';
import apple144 from '../img/favicons/apple-icon-144x144.png';
import apple152 from '../img/favicons/apple-icon-152x152.png';
import apple180 from '../img/favicons/apple-icon-180x180.png';
import android192 from '../img/favicons/android-icon-192x192.png';
import favicon32 from '../img/favicons/favicon-32x32.png';
import favicon96 from '../img/favicons/favicon-96x96.png';
import favicon16 from '../img/favicons/favicon-16x16.png';
import ms144 from '../img/favicons/ms-icon-144x144.png';
import logo from '../img/EAID.png';

const Meta = () => {
  return (
    <Helmet>
      <meta charset="UTF-8" />
      <title>
        Europäische Akademie für Informationsfreiheit und Datenschutz e.V.
      </title>
      <meta
        name="author"
        content="Europäische Akademie für Informationsfreiheit und Datenschutz e.V."
      />
      <meta
        name="copyright"
        content="Copyright EAID e.V. 2019. All Rights Reserved."
      />
      <meta
        name="keywords"
        content="Informationsfreiheit, Datenschutz, Datensicherheit, Veranstaltungen, Blog"
      />
      <meta
        name="description"
        content="Dies ist der Blog der Europäischen Akademie für Informationsfreiheit und Datenschutz."
      />
      <link rel="apple-touch-icon" sizes="57x57" href={apple57} />
      <link rel="apple-touch-icon" sizes="60x60" href={apple60} />
      <link rel="apple-touch-icon" sizes="72x72" href={apple72} />
      <link rel="apple-touch-icon" sizes="76x76" href={apple76} />
      <link rel="apple-touch-icon" sizes="114x114" href={apple114} />
      <link rel="apple-touch-icon" sizes="120x120" href={apple120} />
      <link rel="apple-touch-icon" sizes="144x144" href={apple144} />
      <link rel="apple-touch-icon" sizes="152x152" href={apple152} />
      <link rel="apple-touch-icon" sizes="180x180" href={apple180} />
      <link rel="icon" type="image/png" sizes="192x192" href={android192} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
      <link rel="icon" type="image/png" sizes="96x96" href={favicon96} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content={ms144} />
      <meta name="theme-color" content="#ffffff" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />

      <meta
        property="og:description"
        content="Das ist der Blog der Europäische Akademie für Informationsfreiheit und Datenschutz e.V."
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Europäische Akademie für Informationsfreiheit und Datenschutz e.V."
      />
      <meta property="og:url" content="https://www.eaid-berlin.de/" />
      <meta property="og:site_name" content="EAID e.V." />
      <meta property="og:image" content={logo} />
    </Helmet>
  );
};

export default Meta;
