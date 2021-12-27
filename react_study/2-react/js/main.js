import store from './js/Store.js'
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      searchKeyword : '', 
      searchResult : [], 
      submitted : false,
    }
  }
  handleSubmit(event){
    event.preventDefault();
    this.search(this.state.searchKeyword);
  }
  search(searchKeyword){
    const searchResult = store.search(searchKeyword);
    this.setState({ 
      searchResult, 
      submitted : true
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
            onChange = {event => this.handleChangeInput(event)}
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

    return (
      <>
      <header>
        <h2 className="container">검색</h2>
      </header>
      <div className="container">
        { searchForm }
        <div className="content">{this.state.submitted &&  searchResult}</div>
      </div>
    </>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector("#app"));