import "./Search.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchSearchLocResult } from "../../api/locationAPI";
import debounce from "lodash.debounce";
import useWeatherStore from "../../store";
import { shortenTxt } from "../../utils/utils";

const Search = () => {
  const { fetchWeather, setChosenLoc, chosenLoc, mainWeather } =
    useWeatherStore();

  const [marginTop, setMarginTop] = useState(0);
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shownLoc, setShownLoc] = useState("");
  const dialogRef = useRef();
  const searchBarRef = useRef();
  const searchInputRef = useRef();

  useEffect(() => {
    if (chosenLoc?.txt || mainWeather?.name) {
      // Set input as chosen location or main weather name
      if (searchInputRef)
        searchInputRef.current.value = chosenLoc?.txt || mainWeather?.name;

      // Shown location should be too long
      const shortTxt = shortenTxt(chosenLoc?.txt || mainWeather?.name);
      setShownLoc(shortTxt);
    }
  }, [chosenLoc, mainWeather]);

  // Fetch weather data when chosen location is available
  useEffect(() => {
    if (chosenLoc) fetchWeather(chosenLoc.lat, chosenLoc.lon);
  }, [chosenLoc]);

  const handleShowDialog = () => {
    dialogRef.current.showModal();
    const top = searchBarRef.current.getBoundingClientRect().top;
    setMarginTop(top - 16);
  };

  const handleCloseDialog = () => {
    function close() {
      dialogRef.current.classList.remove("hide");
      dialogRef.current.close();
      dialogRef.current.removeEventListener("animationend", close);
    }
    dialogRef.current.classList.add("hide");
    dialogRef.current.addEventListener("animationend", close);
  };

  const debouncedSearchLoc = useCallback(
    debounce(async (e) => {
      const query = e.target.value.trim();
      if (query) {
        setLoading(true);
        const res = await fetchSearchLocResult(query);
        setRes(res);
        setLoading(false);
      } else setRes([]);
    }, 300),
    []
  );

  const handleSetChosenLoc = (loc) => {
    if (loc.txt !== chosenLoc?.txt) setChosenLoc(loc);
  };

  // If user press enter on modal, fetch weather of 1st result
  const handleSubmitSearch = () => {
    if (res[0] && res[0].txt !== chosenLoc?.txt) setChosenLoc(res[0]);
  };

  const handleClearInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
      setRes([]);
    }
  };

  return (
    <>
      <div
        id="search-bar"
        className="search-bar-wrapper"
        onClick={handleShowDialog}
        ref={searchBarRef}
      >
        <div className="loc-wrapper">
          <i className="fa-solid fa-location-dot"></i>
          <div>{shownLoc || "Loading..."}</div>
        </div>
        <div className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="modal"
        style={{
          marginTop,
        }}
        onClick={handleCloseDialog}
      >
        <form
          method="dialog"
          onSubmit={handleSubmitSearch}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="loc-wrapper">
            <i className="fa-solid fa-location-dot"></i>
            <input
              ref={searchInputRef}
              type="text"
              className="loc-input"
              placeholder="Enter a location..."
              onChange={debouncedSearchLoc}
            />
          </div>
          <div className="clear-btn" onClick={handleClearInput}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </form>

        <ul className="loc-dropdown">
          {loading ? (
            <li>Finding location...</li>
          ) : (
            res.length > 0 &&
            res.map((each, idx) => (
              <li key={idx} onClick={() => handleSetChosenLoc(each)}>
                {each.txt}
              </li>
            ))
          )}
        </ul>
      </dialog>
    </>
  );
};

export default Search;
