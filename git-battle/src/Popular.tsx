import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const language = "language";
const tabs = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

export const Popular = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  // TODO: Виталик, у Tab есть свойство css 'aria-selected:bg-[#d0021b]' (выделение цветом выбраного Tab'a)
  // При выборе Tab и перезагрузке страницы:
  //    сначала в currentTabIndex сетится 0 в useState (default value),
  //    затем выполняется useEffect и сетится currentTabIndex с URL (query param)
  //    как следствие сначала подсвечивается на 1 сек 0ая Tab'a, затем подсвечивается выбранная Tab'a
  // как можно переиграть это, чтобы подсвечивалась сразу нужная таба?
  // по факту useEffect будет выполняться только когда currentTabIndex измениться или изначально засетится в useState
  // единственный вариант тогда переделывать логику css ?
  useEffect(() => {
    for (const entry of Array.from(searchParams.entries())) {
      const [param, value] = entry;
      if (param === language) {
        setCurrentTabIndex(parseInt(value));
      }
    }
  }, [currentTabIndex, searchParams]);

  const handleSelect = (tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
    setSearchParams({ language: tabIndex.toString() });
  };

  return (
    <div>
      <Tabs onSelect={handleSelect} selectedIndex={currentTabIndex}>
        <TabList className="py-4 flex flex-row">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className="px-6 py-2 rounded-lg aria-selected:bg-[#d0021b] aria-selected:text-white border-none transition-all duration-200 ease-out"
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        {tabs.map((tab, index) => (
          <TabPanel key={index}>
            <h2>About {tab}</h2>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};
