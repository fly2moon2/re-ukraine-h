import {useState} from 'react';

// webpack 5 deprecated named export approach, only supports default exxport approach for json file
// compile error "Should not import the named export..."
// https://community.developer.atlassian.com/t/error-should-not-import-the-named-export-in-editor-core/54982/5
// i. named export de-supported:
// import {bookables} from "../../static.json";
// ii. default export (in 2 lines) is the only approach supported
import datafile from "../../static.json";
const { bookables } = datafile;

export default function BookablesList () {
  const group = "Rooms";
  const bookablesInGroup = bookables.filter(b => b.group === group);

  // w/o managing the state, the click event won't work
  // useState - setBookableIndex as the update function when clicked
  const [bookableIndex, setBookableIndex] = useState(1);

/*   let bookableIndex = 1;
  function changeBookable (selectedIndex) {
    bookableIndex = selectedIndex;
    console.log(selectedIndex);
  }
 */
  return (
    <ul className="bookables items-list-nav">
      {bookablesInGroup.map((b, i) => (
        <li
          key={b.id}
          className={i === bookableIndex ? "selected" : null}
        >
          <button
            className="btn"
            onClick={() => setBookableIndex(i)}
          >
            {b.title}
          </button>
{/*           <button
            className="btn"
            onClick={() => changeBookable(i)}
          >
            {b.title}
          </button> */}
        </li>
      ))}
    </ul>
  );
}