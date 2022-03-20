import { formatRelativeDate } from '../js/helpers.js';
import store from './js/Store.js'

const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
}

const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어",
}
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      searchKeyword : '', 
      searchResult : [], 
      submitted : false,
      selectedTab : TabType.KEYWORD, 
      keywordList : [],
      historywordList : []
    }
  }

  componentDidMount() {
    const keywordList = store.getKeywordList();
    const historyList = store.getHistoryList();

    this.setState({
      keywordList,
      historyList,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.search(this.state.searchKeyword);
  }
  
  
  search(searchKeyword){
    const searchResult = store.search(searchKeyword);
    const historywordList = store.getHistoryList();
    this.setState({ 
      searchKeyword,
      searchResult, 
      historywordList,
      submitted : true,
   });
  }

  handleReset(){
    console.log('handleReset' , this.state.searchKeyword)
    this.setState(
      ()=>{
        return {
          searchKeyword : '', 
          submitted : false,
        }
      }, 
      ()=>{
        console.log('handleReset' , this.state.searchKeyword)
      }
    )
  }
  
  handleChangeInput(event){
    // this.state.searchKeyword = event.target.value;
    // this.forceUpdate();
    const searchKeyword = event.target.value;
    if (event.target.value.length <=0 &&  this.state.submitted ) {
      return this.handleReset();
    }    
    this.setState({searchKeyword})
  }
  handleClick(event){
   const value = event.taget.key;
  }
  handleClickRemoveHistory(event , keyword){
    event.stopPropagation();
    store.removeHistory(keyword);
    const historywordList = store.getHistoryList();
    this.setState({historywordList});
  }
  render(){    
    // let resetButton = null;

    // if(this.state.searchKeyword.length > 0){
    //   resetButton = <button type='reset' className='btn-reset'></button> ;
    // }
    const searchForm = (
      <form 
          onSubmit = { event => this.handleSubmit(event) }
          onReset = {() => this.handleReset()}
          >
          <input 
            type="text" 
            placeholder="검색어를 입력하세요" 
            autoFocus 
            value={this.state.searchKeyword}
            onChange={event => this.handleChangeInput(event)} 
            />
          {/* {resetButton} */}
          { this.state.searchKeyword.length > 0 ? <button type='reset' className='btn-reset'></button> : null }
        </form>
    )

    const searchResult = (
        this.state.searchResult.length > 0 ? (
        <ul className="result">
          {this.state.searchResult.map( (item) => {
              return (
                <li key={item.id}>
                  <img src={item.imageUrl} alt={item.name}/>
                  <p>{item.name}</p>
                </li>
              )
          })}
        </ul>
      ):(
        <div className='empty-box'>검색결과가 없습니다.</div>
      )
    )
        
    const keywordList = (
      <ul className="list">
        {this.state.keywordList.map( (item, index)=>(
          <li 
            key={item.id}
            onClick = { () => ( this.search(item.keyword) ) }
          >
            <span className="number">{ index + 1 }</span>
            <span>{item.keyword}</span>
          </li>
        ))}
      </ul>
    )

    const historywordList = (
      <ul className="list">
        {this.state.historywordList.map( ({id, keyword, date}) => (
          <li key={id} onClick={() => (this.search(keyword))} >
            <span className="number">{keyword}</span>
            <span className='date'>{formatRelativeDate(date)}</span>
            <button className="btn-remove" onClick={ (event) => this.handleClickRemoveHistory(event , keyword ) }></button>
          </li>
        ))}
      </ul>
    )
  
    const tabs = (
      <>
        <ul className="tabs">
            {Object.values(TabType).map((tabType) => {
              return (
                <li 
                    key={tabType} 
                    onClick = { ()=> this.setState({selectedTab : tabType})}
                    className={this.state.selectedTab === tabType ? 'active' : ''} 
                >
                  {TabLabel[tabType]} 
                </li>
              )
            })}
        </ul>
        { this.state.selectedTab === TabType.KEYWORD && keywordList}
        { this.state.selectedTab === TabType.HISTORY && historywordList}
        </>
    )       


    return (
      <>
      <header>
        <h2 className="container">검색</h2>
      </header>
      <div className="container">
        { searchForm }
        <div className="content">{this.state.submitted ?  searchResult : tabs}</div>
      </div>
    </>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector("#app"));