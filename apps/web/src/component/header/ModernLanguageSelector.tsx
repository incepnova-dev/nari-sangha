import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './language-selector.module.css';

interface Language {
    code: string;
    name: string;
}

interface ModernLanguageSelectorProps {
    language: string;
    setLanguage: (code: string | any) => void;
    languages: Language[];
    variant?: 'light' | 'dark';
}

const ModernLanguageSelector: React.FC<ModernLanguageSelectorProps> = ({
    language,
    setLanguage,
    languages,
    variant = 'dark'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find(l => l.code === language) || languages[0];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleLanguageSelect = (code: string) => {
        setLanguage(code);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    return (
        <div className={`${styles.container} ${variant === 'light' ? styles.variantLight : ''}`} ref={containerRef}>
            <button
                className={`${styles.trigger} ${isOpen ? styles.triggerActive : ''}`}
                onClick={toggleDropdown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label="Select language"
            >
                <span className={styles.code}>{currentLanguage.code.toUpperCase()}</span>
                <ChevronDown
                    size={14}
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                />
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <ul className={styles.menuList} role="listbox">
                        {languages.map((lang) => (
                            <li key={lang.code} role="option" aria-selected={lang.code === language} className={styles.liItem}>
                                <button
                                    className={`${styles.menuItem} ${lang.code === language ? styles.menuItemActive : ''}`}
                                    onClick={() => handleLanguageSelect(lang.code)}
                                >
                                    <span className={styles.itemCode}>{lang.code.toUpperCase()}</span>
                                    {lang.code === language && <Check size={16} strokeWidth={3} className={styles.checkIcon} />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ModernLanguageSelector;
