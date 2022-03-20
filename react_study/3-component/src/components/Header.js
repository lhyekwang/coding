import React from 'react';

const Header = (props) => {
  return(
    <header className='container'>{props.title}</header>
  );
};

export default Header;