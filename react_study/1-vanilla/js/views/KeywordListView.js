import { delegate, qs } from "../helpers.js";
import View from "./View.js";

const tag = ['keywordlistview']

export default  class KeywordListView extends View{
                    
  constructor(element=qs("#keyword-list-view"), template = new Template() ){
    console.log(tag, "constructor");
    super(element);
    this.template = template;
    this.bindEvents();
  }
  bindEvents(){ // 클릭이벤트를 받았을때 검색결과로 이동하는것
    delegate(this.element, 'click', 'li', (event)=>this.handleClick(event) );
  }
  handleClick(event){
    console.log(tag, 'handleClick', event.target.dataset.keyword);
    const value = event.target.dataset.keyword;
    this.emit('@click', { value });
  }

  show(data = []){ //데이타를 받아서 목록을 출력하는부분
    this.element.innerHTML = 
      data.length > 0 ? this.template.getList(data) : this.getEmptyMessage()
      super.show()
  }
}

class Template {
 
  getEmptyMessage(){
    return `<div class="empty-box">추천 검색어가 없습니다.</div>`
  }
  
  getList(data = []){
    return `<ul class="list">${data.map(this._getItem).join('')}</ul>`
  }

  _getItem({ id, keyword }) {
    return `
      <li data-keyword="${keyword}">
        <span class="number">${id}</span>
        ${keyword}
      </li>
    `
  }

}