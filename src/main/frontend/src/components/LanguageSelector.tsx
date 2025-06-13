import {type ChangeEvent, useEffect, useState} from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

type languageOption = { language: string; code: string };

const languageOptions: languageOption[] = [
    {
        language: "English",
        code: "en",
    },
    { language: "Polish", code: "pl" },
];

const LanguageSelector = () => {
    const [language, setLanguage] = useState(i18next.language);

    const { i18n } = useTranslation();

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = e.target.value;
        console.log(`Selected language: ${selectedLanguage}`);
        setLanguage(selectedLanguage);
        i18next.changeLanguage(selectedLanguage);
    };

    useEffect(() => {
        document.body.dir = i18n.dir();
        console.log(`Language changed to: ${i18n.language}`);
    }, [i18n, i18n.language]);

    return (
        <div className="column">
        <select
            id="language"
    value={language}
    onChange={handleLanguageChange}
    className="" >
    {languageOptions.map(({ language, code }, key) => (
            <option value={code} key={key}>
            {language}
            </option>
))}
    </select>
        </div>
);
};

export default LanguageSelector;