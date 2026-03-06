import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import VI locales
import commonVI from './locales/vi/common.json';
import headerVI from './locales/vi/header.json';
import footerVI from './locales/vi/footer.json';
import homeVI from './locales/vi/home.json';
import exploreVI from './locales/vi/explore.json';
import searchVI from './locales/vi/search.json';
import bookingVI from './locales/vi/booking.json';
import ordersVI from './locales/vi/orders.json';
import schedulesVI from './locales/vi/schedules.json';
import profileVI from './locales/vi/profile.json';
import authVI from './locales/vi/auth.json';

// Import EN locales
import commonEN from './locales/en/common.json';
import headerEN from './locales/en/header.json';
import footerEN from './locales/en/footer.json';
import homeEN from './locales/en/home.json';
import exploreEN from './locales/en/explore.json';
import searchEN from './locales/en/search.json';
import bookingEN from './locales/en/booking.json';
import ordersEN from './locales/en/orders.json';
import schedulesEN from './locales/en/schedules.json';
import profileEN from './locales/en/profile.json';
import authEN from './locales/en/auth.json';

const resources = {
    vi: {
        translation: {
            ...commonVI,
            ...headerVI,
            ...footerVI,
            ...homeVI,
            ...exploreVI,
            ...searchVI,
            ...bookingVI,
            ...ordersVI,
            ...schedulesVI,
            ...profileVI,
            ...authVI
        }
    },
    en: {
        translation: {
            ...commonEN,
            ...headerEN,
            ...footerEN,
            ...homeEN,
            ...exploreEN,
            ...searchEN,
            ...bookingEN,
            ...ordersEN,
            ...schedulesEN,
            ...profileEN,
            ...authEN
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'vi',
        debug: false,
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    });

export default i18n;
