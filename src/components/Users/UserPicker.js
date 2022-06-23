import datafile from "../../static.json";
const {users} = datafile;
//import {users} from "../../static.json";

export default function UserPicker () {
  return (
    <select>
      {users.map(u => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
}