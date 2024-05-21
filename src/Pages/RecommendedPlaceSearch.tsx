import { useRef } from "react";
import SearchForm from "../components/SearchForm/SearchForm";
import useAutoComplete from "../hooks/useAutoComplete";
// import { useNavigate } from "react-router-dom";

const RecommendedPlaceSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const navigate = useNavigate();
  const onPlaceChanged = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    // navigate("/search-results", {
    //   state: {
    //     place,
    //   },
    // });
    console.log(place);
  };
  useAutoComplete({
    inputRef,
    onPlaceChanged,
    fields: ["formatted_address", "name"],
  });
  return (
    <>
      <SearchForm ref={inputRef} />
      <section>
        <p className="mt-10 px-10 text-center opacity-40">
          Please enter the travel destination you would like to recommend.
        </p>
      </section>
    </>
  );
};

export default RecommendedPlaceSearch;
