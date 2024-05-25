import { ReactElement } from "react";
import SearchForm from "./SearchForm/SearchForm";
import CurrentLocation from "./CurrentLocation";

interface SearchProps {
  children: ReactElement;
}

const SearchImpl = ({ children }: SearchProps) => {
  return <>{children}</>;
};

const Search = Object.assign(SearchImpl, {
  Form: SearchForm,
  CurrentLocation: CurrentLocation,
});

export default Search;
