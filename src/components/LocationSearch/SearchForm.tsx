import { ChangeEvent, FormEvent, forwardRef } from 'react';
import './SearchForm.css';
import CancelIcon from '../@common/icon/CancelIcon';

interface SearchFormProps {
  onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
  onReset?: (e?: FormEvent) => void;
}

const SearchForm = forwardRef<HTMLInputElement, SearchFormProps>(
  (props: SearchFormProps, ref) => {
    const { onChange, onReset } = props;

    return (
      <form
        className="px-1 flex"
        onReset={() => {
          onReset?.();
        }}
      >
        <button type="reset" className="p-1 mr-3 text-lg">
          <CancelIcon />
        </button>
        <input
          ref={ref}
          onChange={onChange}
          type="text"
          className="border rounded-2xl px-2 py-1 block w-[90%] focus:outline-none focus:border-subColor"
        />
      </form>
    );
  }
);

export default SearchForm;
