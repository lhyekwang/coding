import React from "react" ;
import { formatRelativeDate } from '../helpers.js';

const List = ( { 
  data =[] , 
  onClick, 
  hasIndex = false,
  hasDate = false, 
  onRemove,
  } )=>{
    const handleClickRemoveHistory = (event , keyword) =>{
      event.stopPropagation();
      // store.removeHistory(keyword);
      // this.fetch();
      onRemove(keyword);
    }
    return(
      <ul className="list">
        {data.map( ({ keyword , id, date }, index)=>(          
          <li 
            key={id}
            onClick = { () => (onClick (keyword) ) }
          >
            <>
              { hasIndex && <span className="number"> {index + 1}</span>}
              <span>{keyword}</span>
              { hasDate && <span className='date'>{formatRelativeDate(date)}</span> }
              { !!onRemove &&  <button className="btn-remove" 
                onClick={ (event) => (handleClickRemoveHistory( event , keyword ) )}
              ></button> }
            </>        
          </li>
        ))}
      </ul>
    )
}

export default List;