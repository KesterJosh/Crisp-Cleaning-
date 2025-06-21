import React, { useState } from "react";
import "./GlobalSearch.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchDOMText = (searchText) => {
    if (!searchText || searchText.trim().length < 2) {
      setResults([]);
      return;
    }

    const elements = Array.from(document.body.querySelectorAll("*"));
    const found = new Set();
    const cleanResults = [];

    elements.forEach((el) => {
      const styles = window.getComputedStyle(el);

      if (
        styles.display === "none" ||
        styles.visibility === "hidden" ||
        el.tagName === "SCRIPT" ||
        el.tagName === "STYLE"
      ) {
        return;
      }

      const text = el.textContent?.trim();

      const hasEnoughContent =
        text &&
        text.length > 4 &&
        !/^\w{1,4}$/.test(text) && // ignore 1-4 character single words
        text.split(" ").length > 1; // must have more than one word

      const matchesSearch =
        text && text.toLowerCase().includes(searchText.toLowerCase());

      if (hasEnoughContent && matchesSearch && !found.has(text)) {
        found.add(text);
        cleanResults.push({
          text: text.slice(0, 200),
          element: el,
        });
      }
    });

    setResults(cleanResults.slice(0, 10));
  };

  const handleClickResult = (res) => {
    res.element.scrollIntoView({ behavior: "smooth", block: "center" });
    res.element.classList.add("global-highlight");
    setTimeout(() => res.element.classList.remove("global-highlight"), 2000);
  };

  return (
    <div className="parent">
      <div className="global-search-container">
        <div
          className="my-search"
          onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
          onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
        >
          <img
            alt="search"
            src={require("../views/img/search-200h.png")}
            className="search"
          />
          <input
            type="search"
            className="dashboard-textinput input"
            placeholder="Search for anything..."
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              searchDOMText(value);
            }}
          />
        </div>

        {results.length > 0 && (
          <div className="global-search-results">
            {results.map((res, i) => (
              <div
                key={i}
                className="search-result-item"
                onClick={() => handleClickResult(res)}
              >
                {res.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
