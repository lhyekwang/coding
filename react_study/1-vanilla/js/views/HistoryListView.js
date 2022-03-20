import KeywordListView from "./KeywordListView.js";
import {delegate, qs, formatRelativeDate } from "../helpers.js";

const tag = '[HistoryListview]';
export default class HistoryListView extends KeywordListView{
  constructor(){
    super(qs('#history-list-view') , new Template() )
  }
  bindEvents(){ // 클릭이벤트를 받았을때 검색결과로 이동하는것
    delegate(this.element, 'click', 'button.btn-remove', (event)=>this.handleClickRemoveButton(event) );
  }
  handleClickRemoveButton(event){
    console.log(tag + 'handleClickRemoveButton' , event.target);
    const value = event.target.parentElement.dataset.keyword;
    this.emit( '@remove' , { value } )
  }
}



class Template{
  getEmptyMessage(){
    return `<div class="empty-box">검색 이력이 없습니다.</div>`
  }
  
  getList(data = []){
    return `<ul class="list">${data.map(this._getItem).join('')}</ul>`
  }

  _getItem({ id, keyword, date }) { // historyData
    return `
      <li data-keyword="${keyword}">        
        ${keyword}
        <span class="date">${formatRelativeDate(date)}</span>
        <button class='btn-remove'></button>
      </li>
    `
  }
}


