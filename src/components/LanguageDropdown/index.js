// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import i18n from 'i18next';

import { useRecoilState, useRecoilValue } from 'recoil';
import { CurrentLangAtom, Languages } from '../../recoil/atoms';

import { localeLangsUtil } from '../../utils';

// get the languages

const LanguageDropdown = (): React$Element<any> => {
    const enLang = Languages[0] || {};
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentLanguageAtom, setCurrentLangAtom] = useRecoilState(CurrentLangAtom);

    /*
     * toggle language-dropdown
     */
    const toggleDropdown = ({ dropdownOpen: boolean }) => {
        console.log('dropdown');
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown} style={{ position: 'relative', zIndex: 100 }}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-languages"
                as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle arrow-none"
                style={{ position: 'relative', zIndex: 100 }}>
                <img
                    src={currentLanguageAtom.flag}
                    alt={currentLanguageAtom.name}
                    className="me-0 me-sm-1"
                    height="12"
                />{' '}
                <span className="align-middle d-none d-sm-inline-block">{currentLanguageAtom.name}</span>
                <i className="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu
                className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu"
                style={{ position: 'relative', zIndex: 100 }}>
                <div onClick={toggleDropdown}>
                    {Languages.map((lang, i) => {
                        return (
                            <Link
                                className="dropdown-item notify-item"
                                key={i + '-lang'}
                                onClick={() => {
                                    setCurrentLangAtom(lang);
                                    const convertLang = localeLangsUtil(lang.name);
                                    i18n.changeLanguage(convertLang);
                                }}>
                                <img src={lang.flag} alt={lang.name} className="me-1" height="12" />{' '}
                                <span>{lang.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default LanguageDropdown;
