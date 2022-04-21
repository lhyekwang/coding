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
        container : document.querySelector('#scroll-section-0')
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
    //  걱 스크롤 섹션 높이 셋팅
    for(let i=0 ; i<sceneInfo.length ;i ++){
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum *  window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
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
    console.log(currentScene)    

  }

  window.addEventListener('resize' , setLayout);
  window.addEventListener('scroll' , ()=>{
    yOffset = window.pageYOffset;
    scrollLoop();
  })
  setLayout();


})();