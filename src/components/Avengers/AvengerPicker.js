import datafile from "../../static.json";
const {avengers} = datafile;
//import {avengers} from "../../static.json";

export default function AvengerPicker () {
  return (
    <select>
      {avengers.map(u => (
        <option key={u.id}>{u.title}</option>
      ))}
    </select>
  );
}