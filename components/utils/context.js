import React, { useContext, useState, createContext } from "react";
import { defaultData } from "./data";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [result, setResult] = useState([]);
  const [labels, setLabels] = useState(defaultData.labels);
  const [scores, setScores] = useState();

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Score Percentage",
        data: scores,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const value = {
    result,
    setResult,
    setLabels,
    setScores,
    chartData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
