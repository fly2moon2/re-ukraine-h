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
/*   const group = "Rooms";
  const bookablesInGroup = bookables.filter(b => b.group === group);
 */
  // w/o managing the state, the click event won't work
  // useState - setBookableIndex as the update function when clicked
  const [avengersIndex, setAvengersIndex] = useState(1);


  return (
    <ul className="bookables items-list-nav">
      {avengers.map((b, i) => (
        <li
          key={b}
          className="selected"
        >
          <button
            className="btn"
            onClick={() => setAvengersIndex(i)}
          >
          {b}
          </button>

        </li>
      ))}
    </ul>
  );
}