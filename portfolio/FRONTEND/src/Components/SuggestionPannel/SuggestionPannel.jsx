import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import { set_prompt } from "../../State/action-creators";
import { useDispatch, useSelector } from "react-redux";
import './style.css'
const SuggestionPannel = () => {
  const [upArrow, setUpArrow] = useState(false);
  const [downArrow, setDownArrow] = useState(true);
  const [size, setSize] = useState("15px");

  const dispatch = useDispatch();
  const [maxSuggestionsLength, setMaxSuggestionsLength] = useState(5);
  let prompt = useSelector((state) => {
    return state?.prompt_reducer;
  });
  const [suggestion, setSuggestion] = useState([
    "hello",
    "hellsdfasdfafasdfasdfo",
    "hello",
    "hello",
    "hello",
    "hello",
  ]);

  const [suggestionPannelStyle, setSuggestionPannelStyle] = useState({
    display: "none",
  });
  useEffect(() => {
    if (prompt === undefined || prompt === "") {
      setSuggestionPannelStyle({
        display: "none",
      });
    }
    if (prompt != "") {
      setSuggestionPannelStyle({
        display: "flex",
      });
    }
    if (prompt.endsWith(" ", prompt.length) != false) {
      setSuggestionPannelStyle({
        display: "none",
      });
    }
  }, [prompt]);
  const handleSuggestionLength = () => {
    if (maxSuggestionsLength != suggestion?.length) {
      setMaxSuggestionsLength(suggestion?.length);
      setDownArrow(false);
      setUpArrow(true);
    }
    if (maxSuggestionsLength == suggestion?.length) {
      setMaxSuggestionsLength(5);
      setUpArrow(false);
      setDownArrow(true);
    }
  };
  return (
    <div className="suggestion_pannel" style={suggestionPannelStyle}>
      <span className="suggestion">
        {suggestion
          ?.filter((v, i) => {
            return i < maxSuggestionsLength;
          })
          .map((v, i) => {
            return (
              <span
                className="suggestion_items"
                onClick={() => {
                  set_prompt(
                    prompt
                      .substring(0, prompt.lastIndexOf(" "))
                      .concat(" " + v + " "),
                    dispatch
                  );
                }}
                key={i}
              >
                {v?.length > 10 ? v.substring(0, 10) + "..." : v}
              </span>
            );
          })}
      </span>
      <div className="btn-clips suggestion_btn_down ">
        <span>
          <button onClick={handleSuggestionLength}>
            {downArrow && <FaChevronDown size={size} />}
            {upArrow && <IoIosArrowUp size={size} />}
          </button>
        </span>
      </div>
    </div>
  );
};

export default SuggestionPannel;
