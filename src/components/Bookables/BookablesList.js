import {useState, Fragment} from 'react';
import {FaArrowRight,FaArrowLeft} from "react-icons/fa";

// webpack 5 deprecated named export approach, only supports default exxport approach for json file
// compile error "Should not import the named export..."
// https://community.developer.atlassian.com/t/error-should-not-import-the-named-export-in-editor-core/54982/5
// i. named export de-supported:
// import {bookables} from "../../static.json";
// ii. default export (in 2 lines) is the only approach supported
import datafile from "../../static.json";
const { bookables, sessions, days } = datafile;



export default function BookablesList () {
  // 0207 - multiple levels of useState for group, then filter for bookableIndex
  const [group, setGroup] = useState("Kit");
  //const group = "Rooms";
  const bookablesInGroup = bookables.filter(b => b.group === group);

  // w/o managing the state, the click event won't work
  // useState - setBookableIndex as the update function when clicked
  const [bookableIndex, setBookableIndex] = useState(0);
  // 0207 - assigns an array of unique groupname to groups variable
  const groups = [...new Set(bookables.map(b=>b.group))];  

  const bookable = bookablesInGroup[bookableIndex];
  const [hasDetails, setHasDetails] = useState(false);

  function nextBookable () {
    setBookableIndex(i => (i + 1) % bookablesInGroup.length);
  }
  function prevBookable () {
    // rotate back to the last item after reaching the first item
    setBookableIndex(i => i<=0 ? bookablesInGroup.length-1: (i - 1) % bookablesInGroup.length);
    //setBookableIndex(i => (i - 1) % bookablesInGroup.length);
  }

/*   let bookableIndex = 1;
  function changeBookable (selectedIndex) {
    bookableIndex = selectedIndex;
    console.log(selectedIndex);
  }
 */
  return (
    <Fragment>
    <div>
    {/* 0207 - list unique groups   */}
    <select value={group} onChange={(e)=>setGroup(e.target.value)}>
      {groups.map(g=><option value={g} key={g}>{g}</option>)}
    </select>
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
    <p>
        <button
          className="btn"
          onClick={prevBookable}
          autoFocus
        >
          <FaArrowLeft/>
          <span>Previous</span>
        </button>
      </p>
    <p>
        <button
          className="btn"
          onClick={nextBookable}
          autoFocus
        >
          <FaArrowRight/>
          <span>Next</span>
        </button>
      </p>
    </div>

    {bookable && (
      <div className="bookable-details">
        <div className="item">
          <div className="item-header">
            <h2>
              {bookable.title}
            </h2>
            <span className="controls">
              <label>
                <input
                  type="checkbox"
                  checked={hasDetails}
                  onChange={() => setHasDetails(has => !has)}
                />
                Show Details
              </label>
            </span>
          </div>

          <p>{bookable.notes}</p>

          {hasDetails && (
            <div className="item-details">
              <h3>Availability</h3>
              <div className="bookable-availability">
                <ul>
                  {bookable.days
                    .sort()
                    .map(d => <li key={d}>{days[d]}</li>)
                  }
                </ul>
                <ul>
                  {bookable.sessions
                    .map(s => <li key={s}>{sessions[s]}</li>)
                  }
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
    </Fragment>
  );
}