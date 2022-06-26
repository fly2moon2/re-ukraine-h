import {useState} from 'react';

// webpack 5 deprecated named export approach, only supports default exxport approach for json file
// compile error "Should not import the named export..."
// https://community.developer.atlassian.com/t/error-should-not-import-the-named-export-in-editor-core/54982/5
// i. named export de-supported:
// import {bookables} from "../../static.json";
// ii. default export (in 2 lines) is the only approach supported
import datafile from "../../static.json";
const { avengers } = datafile;

export default function AvengersList () {
  const [gender, setGender] = useState("Female");
  const avengersInGender = avengers.filter(a=>a.gender===gender);

  // w/o managing the state, the click event won't work
  // useState - setBookableIndex as the update function when clicked
  const [avengersIndex, setAvengersIndex] = useState(1);
  const genders = [...new Set(avengers.map(a=>a.gender))]; 

  return (
    <div>
      <select value={gender} onChange={(e)=>setGender(e.target.value)}>
        {genders.map(g=><option value={g} key={g}>{g}</option>)}
      </select>
      <ul className="bookables items-list-nav">
        {avengersInGender.map((a, i) => (
          <li
            key={a.id}
            className="selected"
          >
            <button
              className="btn"
              onClick={() => setAvengersIndex(i)}
            >
            {a.title}
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}