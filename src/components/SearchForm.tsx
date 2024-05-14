const SearchForm = () => {
  return (
    <form className="px-1 flex">
      <button type="reset" className="p-1 mr-3 text-lg">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L11 11M21 21L11 11M11 11L20.2982 1M11 11L1 21"
            stroke="#222222"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <input
        type="text"
        className="border rounded-2xl px-2 py-1 block w-[90%]"
      />
    </form>
  );
};

export default SearchForm;
