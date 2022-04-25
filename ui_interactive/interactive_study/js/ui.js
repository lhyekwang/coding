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
    console.log(11111);    
  }  

  window.addEventListener('resize' , setLayout);





})();