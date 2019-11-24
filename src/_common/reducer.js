/* eslint-disable import/prefer-default-export */
import VeranstaltungenTemplate from '../components/Veranstaltungen/VeranstaltungenTemplate';
import VeranstaltungenArchivTemplate from '../components/Veranstaltungen/VeranstaltungenArchivTemplate';
import { PageTemplate } from '../templates/page';
import VereinTemplate from '../components/Verein/VereinTemplate';
import PublikationenTemplate from '../components/PublikationenTemplate';
import AktuellesTemplate from '../components/Aktuelles/AktuellesTemplate';
import AktuellesArchivTemplate from '../components/Aktuelles/AktuellesArchivTemplate';

import {
    VERANSTALTUNGEN_ID,
    VERANSTALTUNGEN_ARCHIV_ID,
    VEREIN_ID,
    PUBLIKATIONEN_ID,
    AKTUELLES_ID,
    AKTUELLESARCHIV_ID
} from './config';


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