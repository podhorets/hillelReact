import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const language = "language";
const tabs = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

export const Popular = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

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
