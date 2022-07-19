import {useState, useEffect} from 'react';
import Spinner from "../UI/Spinner";
// import datafile from "../../static.json";
// const {avengers} = datafile;
//import {avengers} from "../../static.json";

export default function AvengerPicker () {
  const [avengers, setAvengers] = useState(null);

  const url="http://localhost:3001/avengers";

  useEffect(() => {
    async function getAvengers() {
      const resp = await fetch(url);
      const data = await (resp.json());
      setAvengers(data);
    }
    getAvengers();
  }, []);

  if (avengers===null){
    return <Spinner/>
  }

  return (
    <select>
      {avengers.map(u => (
        <option key={u.id}>{u.title}</option>
      ))}
    </select>
  );
}