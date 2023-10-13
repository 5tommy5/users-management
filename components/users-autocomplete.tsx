import { useRouter } from "next/router";
import React, { useState } from "react";
import Autosuggest from "react-autosuggest";


function Autocomplete(props:any) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };
  const onSuggestionsFetchRequested = async ({ value }) => {
    const sugg = await getSuggestions(value);
    setSuggestions(() => sugg);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "search your data",
    value,
    onChange: onChange
  };

  const getSuggestions = async (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : (await fetchSuggestions(value)).slice(0,5);

  };
  const fetchSuggestions = async (value) => {
    const resp = await fetch("https://dummyjson.com/users/search?q=" + value);
    const data = await resp.json();
    return data.users;
  };

  const getSuggestionValue = (suggestion) => suggestion.firstName;

  const onSuggestionSelected =(event, val:any) => {
    props.redirect(val.suggestion.id);
  }

  const renderSuggestion = (suggestion) => (
        <div className="p-3 flex gap-4 justify-start items-center border border-white-300 bg-black z-10 w-[300px] mx-auto 
          hover:bg-slate-100 hover:text-black hover:cursor-pointer">
          <img src={suggestion.image} className="w-[45px]" />
          {suggestion.firstName} {suggestion.lastName}
        </div>
  );
  return (
    <div className="mx-auto w-full col-span-full justify-center relative">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
        theme={{
          container: "m-2",
          input: "p-2 bg-black border border-white-300 w-[300px]"
        }}
      />
    </div>
  );
}
export default Autocomplete;