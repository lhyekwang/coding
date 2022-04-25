( ()=>{
  
  let yOffset = 0;
  
  let prevScrollHeight =0; 
  let currentScene = 0;

  const sceneInfo = [
    {
      // 0
      type : 'sticky',
      heightNum:5, //브라우저 높이의 5배로 scrolllHeight셋팅
      scrollHeight : 0, 
      objs: {
        container : document.querySelector('#scroll-section-0'), 
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB : document.querySelector('#scroll-section-0 .main-message.b'),
        messageC : document.querySelector('#scroll-section-0 .main-message.c'),
        messageD : document.querySelector('#scroll-section-0 .main-message.d'),
      }, 
      values : {
        messageA_opcity : [0, 1]  // 변경된 값의 범위
      }
    }, 
    {
      // 1
      type : 'normal',
      heightNum:5, //브라우저 높이의 5배로 scrolllHeight셋팅
      scrollHeight : 0, 
      objs: {
        container : document.querySelector('#scroll-section-1')
      }
    }, 
    {
      // 2
      type : 'sticky',
      heightNum:5, //브라우저 높이의 5배로 scrolllHeight셋팅
      scrollHeight : 0, 
      objs: {
        container : document.querySelector('#scroll-section-2')
      }
    }, 
    {
      // 3
      type : 'sticky',
      heightNum:5, //브라우저 높이의 5배로 scrolllHeight셋팅
      scrollHeight : 0, 
      objs: {
        container : document.querySelector('#scroll-section-3')
      }
    }  
  ];

    
  function setLayout(){
    //  각 스크롤 섹션 높이 셋팅
    for(let i=0 ; i<sceneInfo.length ;i ++){
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum *  window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }   
    
    // 중간에 새로고침했을때도 해당 currnet 값 부여
    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;

    for( let i =0; i<sceneInfo.length; i++){
     totalScrollHeight += sceneInfo[i].scrollHeight;
     if( totalScrollHeight > yOffset){
        currentScene = i;
        break;
     }
    }

    document.body.setAttribute('id', `show-scene-${currentScene}`)
    
  }

  function calcValue( values , currentSceneOffsetY ){
      // console.log(values[0] , values[1], currentSceneOffsetY);
      let rv ;
      let scrollRatio = currentSceneOffsetY / sceneInfo[currentScene].scrollHeight;
      rv = scrollRatio * (values[1] - values[0]) + values[0];
      return rv;
  }

  function playAnimation(){
    const objs=sceneInfo[currentScene].objs;
    const values=sceneInfo[currentScene].values;
    const currentSceneOffsetY = yOffset - prevScrollHeight;
    // console.log(currentSceneOffsetY)
    
    switch(currentScene){
       case 0 :
         let messageA_opacity_in =  calcValue ( values.messageA_opcity , currentSceneOffsetY );
        //  console.log(objs.messageA);
          objs.messageA.style.opacity = messageA_opacity_in;
         break;
        case 1 :
          console.log( currentScene + ': currentScene')
          break;
        case 2:
          console.log( currentScene + ': currentScene')
          break;
        case 3:
          console.log( currentScene + ': currentScene')
          break;
    }
  }

  function scrollLoop(){
    prevScrollHeight = 0;
    for( let i = 0; i < currentScene; i++  ){
      prevScrollHeight +=  sceneInfo[i].scrollHeight;
      // prevScrollHeight = sceneInfo[n].scrollHeight;
      // prevScrollHeight = sceneInfo[n].scrollHeight;
    // console.log(prevScrollHeight)
    }    

     if( yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
       currentScene ++;
     }

     if(yOffset < prevScrollHeight){
       if(currentScene === 0) return; // 끌어당길때 -까지 될수 있으니  0이면 종료로 처리
       currentScene --;
     }     
    
    // console.log(prevScrollHeight)
    document.body.setAttribute('id', `show-scene-${currentScene}`)
    playAnimation();

  }

  window.addEventListener('resize' , setLayout);
  // window.addEventListener('DOMContentLoaded' , setLayout);
  window.addEventListener('load' , setLayout);
  window.addEventListener('scroll' , ()=>{
    yOffset = window.pageYOffset;
    scrollLoop();
  })




})();