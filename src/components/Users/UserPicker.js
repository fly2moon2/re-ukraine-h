import {useState, useEffect} from 'react';
import Spinner from "../UI/Spinner";
import datafile from "../../static.json";
const {users} = datafile;
//import {users} from "../../static.json";

export default function UserPicker () {
    const [users, setUsers] = useState(null);

// async functions return a promise by default. Setting the effect function as async 
// will cause trouble because React is looking for the return value of an effect to be 
// a cleanup function. To solve the issues, remember to put the async function inside 
// the effect function, rather than making the effect function async itself 
/*     useEffect(async () => {
    const resp = await fetch("http://localhost:3001/users");
    const data = await (resp.json());
    setUsers(data);
  }, []); */
const url="http://localhost:3001/users";

  useEffect(() => {
    async function getUsers() {
      const resp = await fetch(url);
      const data = await (resp.json());
      setUsers(data);
    }
    getUsers();
  }, []);

  if (users===null){
    return <Spinner/>
  }
  return (
    <select>
      {users.map(u => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
}