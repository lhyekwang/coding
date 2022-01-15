import React from 'react';

const SearchForm = ({ value, onChange, onSubmit, onReset }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  }
  
  const handelReset = () => {
    onReset();
  }

  const handleChangeInput = (event) => {
    onChange(event.target.value);
  }

  return (
    <form 
        onSubmit={ handleSubmit }
        onReset={ handelReset }
      >
          <input 
            type="text" 
            placeholder="검색어를 입력하세요" 
            autoFocus 
            value={ value }
            onChange={handleChangeInput} 
            />
          {/* {resetButton} */}
          { value.length > 0 ? <button type='reset' className='btn-reset'></button> : null }
      </form>
  );
};

export default SearchForm;

 