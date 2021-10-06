import { atom } from 'recoil';
import enFlag from '../components/LanguageDropdown/flags/us.jpg';

export const Languages = [
    {
        name: 'Korean',
        flag: 'https://user-images.githubusercontent.com/60249156/135926965-c5e23ef9-23e0-4f0a-9984-369376f0ed5f.png',
    },
    {
        name: 'English',
        flag: enFlag,
    },

    // {
    //     name: 'German',
    //     flag: germanyFlag,
    // },
    // {
    //     name: 'Italian',
    //     flag: italyFlag,
    // },
    // {
    //     name: 'Spanish',
    //     flag: spainFlag,
    // },
    // {
    //     name: 'Russian',
    //     flag: russiaFlag,
    // },
];

export const CurrentLangAtom = atom({
    key: 'currentLanguage',
    default: Languages[0],
});

export const AccountInfoAtom = atom({
    key: 'accountInfo',
    default: {
        type: '',
        telegram: '',
        id: '',
        branch: '',
        name: '',
        bank: '',
    },
});
