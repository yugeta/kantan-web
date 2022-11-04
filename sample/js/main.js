(()=>{
  'use strict'

  const Options = {
    version : '1.0.0',
    current_script_selector : `head > script[src='js/main.js']`,
    current_script_info  : null,
    libraries : [
      'lib/ajax',
      'lib/common',
      'lib/load_asset',
      'lib/urlinfo',
    ],
    loaded_libraries : [],
    head_tag : null,
    asset_name : null,
  }

  // 共通ライブラリの自動読み込み（全てのモジュール読み込みが完了した後callbackでMainを起動）
  function Autoload(){
    const files = Options.libraries
    if(!files || !files.length){return}
    Options.current_script_info = this.get_tag_current_script()
    if(!Options.current_script_info){return}
    const head = this.get_tag_head()
    for(let file of files){
      const script = document.createElement('script')
      script.src = `${Options.current_script_info.dir}${file}.js?${Options.version}`
      script.onload = this.loaded.bind(this , file)
      head.appendChild(script)
    }
    Options.head_tag = head
  }
  Autoload.prototype.get_tag_current_script = function(){
    const scripts = document.querySelectorAll('script')
    if(!scripts || !scripts.length){return}
    for(let i=scripts.length-1; i>=0; i--){
      if(!scripts[i].matches(Options.current_script_selector)){continue}
      const src = scripts[i].getAttribute('src')
      const dir = src.split('?')[0].replace(/main\.js$/ , '')
      return {
        elm : scripts[i],
        src : src,
        dir : dir,
      }
    }
  }
  Autoload.prototype.get_tag_head = function(){
    return document.querySelector('head')
  }
  Autoload.prototype.loaded = function(name){
    if(!name){return}
    Options.loaded_libraries.push(name)
    if(Options.loaded_libraries.length < Options.libraries.length){return}
    this.callback()
  }
  Autoload.prototype.callback = function(){
    // ページ読み込み確認をして起動
    switch(document.readyState){
      case "complete":
        window.Main = new Main()
        break

      default:
        window.addEventListener("load", (function(){
          window.Main = new Main()
        }))
        break
    }
  }

  /**
   * Main
   */
  function Main(){
    this.options = Options
    this.load_modules()
    this.load_assset()
  }
  // script + link
  Main.prototype.load_modules = function(){
    const urlinfo = new UrlInfo()
    Options.asset_name = urlinfo.filename || 'index'

    const script = document.createElement('script')
    script.src = `js/${Options.asset_name}.js?${Options.version}`
    Options.head_tag.appendChild(script)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `css/${Options.asset_name}.css?${Options.version}`
    Options.head_tag.appendChild(link)
  }
  Main.prototype.load_assset = function(){
    new LoadAsset('header' , 'header' , function(e){})
    new LoadAsset('footer' , 'footer' , function(e){})
    new LoadAsset(Options.asset_name  , 'main' , function(e){})
  }


  // 実行
  new Autoload()

  
})()