import React from "react" ;
import List from "./List.js"
import store from "../Store.js"

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

  handleClickRemoveHistory(keyword){
    store.removeHistory(keyword);
    this.fetch();
  }

  render(){
    return(
      <List
        data = {this.state.historywordList}
        onClick={this.props.onClick}
        hasDate
        onRemove={ (keyword) =>  this.handleClickRemoveHistory(keyword)}
        // renderItem={(item ) => {
        //   return(
        //     <>        
        //       <span>{item.keyword}</span>
        //       <span className='date'>{formatRelativeDate(item.date)}</span>
        //       <button className="btn-remove" 
        //         onClick={ (event) => (this.handleClickRemoveHistory( event , item.keyword ) )}
        //       ></button>
        //     </>
        //   )
        // }}
      />
    )
  }
}

