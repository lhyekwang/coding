import React from "react" ;
import List from "./List.js"
import store from "../Store.js"
import { formatRelativeDate } from '../helpers.js';

export default class HistorywordList extends React.Component {

  constructor(){
    super();

    this.state={
      historywordList : []
    }
  }

  componentDidMount(){
    this.fetch();
  }
  
  fetch(){
    const historywordList = store.getHistoryList();
    this.setState({
      historywordList, 
    })
  }

  handleClickRemoveHistory(event , keyword){
    event.stopPropagation();
    store.removeHistory(keyword);
    this.fetch();
  }

  render(){
    return(
      <List
        data = {this.state.historywordList}
        onClick={this.props.onClick}
        renderItem={(item ) => {
          return(
            <>        
              <span>{item.keyword}</span>
              <span className='date'>{formatRelativeDate(item.date)}</span>
              <button className="btn-remove" 
                onClick={ (event) => (this.handleClickRemoveHistory( event , item.keyword ) )}
              ></button>
            </>
          )
        }}
      />
    )
  }
}

