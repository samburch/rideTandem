import { useEffect, useState, FC } from "react";
import axios from "axios";
import { ITimeTable } from "./interfaces";
import Card from "./components/Card";
import Timestamp from "./components/Timestamp";
import Error from "./components/Error";

const defaultTimeTable: ITimeTable[] = [];

const App: FC = () => {
  const [timetable, setTimetable]: [ITimeTable[], (timetable: ITimeTable[]) => void] = useState(defaultTimeTable);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get<ITimeTable[]>(`/bus-times`, {
          baseURL: "http://localhost:3000",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setTimetable(response.data);
          let timeout = setTimeout(getData, 10000);
          return () => clearTimeout(timeout)
        })
        .catch((error) => console.log("error: " + error));
    };
    getData();
  }, []);

  return (
    <div className="App">
      <div>
        <div className="App__Header">
          Live bus times for <b>Park Road</b>
        </div>
        {timetable.map((bus: ITimeTable, key: number) =>
          bus.error ? (
            <Error key={key} error={bus.error} />
          ) : (
            <Card key={key} bus={bus} />
          )
        )}
        <Timestamp />
      </div>
    </div>
  );
};

export default App;
