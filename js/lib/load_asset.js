(()=>{
  'use strict'

  window.LoadAsset = function(asset_name , selector , callback){
    const elm = document.querySelector(selector)
    if(!elm){return}
    if(elm.innerHTML){
      if(callback){
        callback()
      }
      return
    }
    new Ajax({
      url: 'asset/'+ asset_name +'.html',
      method: 'get',
      success: (function(selector , callback , e){
        const elm = document.querySelector(selector)
        if(!elm){return}
        elm.innerHTML =  e.target.response
        if(selector === 'main'){
          this.runScript(elm)
        }
        if(callback){
          callback()
        }
      }).bind(this , selector , callback)
    })
  }
  LoadAsset.prototype.runScript = function(elm){
    if(!elm){return}
    const scripts = elm.getElementsByTagName('script')
    if(!scripts || !scripts.length){return}
    for(let script of scripts){
      if(script.src){
        const s = document.createElement('script')
        s.src = script.getAttribute('src')
        script.parentNode.removeChild(script)
        elm.appendChild(s)
      }
      else{
        const val = script.textContent
        eval(val)
      }
    }
  }
})()