import { Dispatch, SetStateAction } from "react";

interface LanguagesProps {
  selectedLanguage: string;
  languages: string[];
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
}

export const Languages = ({
  selectedLanguage,
  languages,
  setSearchParams,
}: LanguagesProps) => {
  return (
    <ul className="flex flex-row">
      {languages.map((language, index) => (
        <li
          key={index}
          className="px-6 py-2 rounded-lg border-none transition-all duration-200 ease-out"
          onClick={() =>
            setSearchParams(new URLSearchParams({ language: language }))
          }
        >
          <span
            className={`${
              language === selectedLanguage
                ? "text-[#d0021b]"
                : "text-[#000000]"
            } hover:text-[#d0021b] cursor-pointer `}
          >
            {language}
          </span>
        </li>
      ))}
    </ul>
  );
};
