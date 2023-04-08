import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import { setLanguageAction } from "../state/popular/popular.actions";
import { PopularState } from "../state/popular/popular.reducer";

const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

export const Languages = memo(() => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state: { popularReducer: PopularState }) =>
      state.popularReducer.selectedLanguage
  );

  return (
    <ul className="flex flex-row">
      {languages.map((language, index) => (
        <li
          key={index}
          className="px-6 py-2 rounded-lg border-none transition-all duration-200 ease-out"
          onClick={() => dispatch(setLanguageAction(language))}
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
});
