<?php
class Main{

 public static $options = [
    'languages' => ['ja' , 'en'],
    'language'  => null,
    'pagename'  => null,
  ];

  function __construct(){
     self::set_language();
     self::set_pagename();
  }

  public static function set_language(){
    $cookie_json = $_COOKIE['nanoHub_data'] ?? '{}';
    $cookie_data = json_decode($cookie_json , true);
    self::$options['language'] = $cookie_data['language'] ?? 'japanese';
  }

  public static function get_language(){
    return self::$options['language'];
  }

  public static function set_pagename(){
    self::$options['pagename'] = @$_GET['p'] ?? 'index';
  }
  public static function get_pagename(){
    return self::$options['pagename'];
  }

  public static function get_title(){
    $add = '';
    switch(@$_GET['p']){
      case 'about':
        $add = ' : センターについて';
        break;
      case 'contact':
        $add = ' : お問合せ';
        break;
      case 'guide':
        $add = ' : 共用装置のご案内';
        break;
      case 'research':
      case 'resrarch_list':
        $add = ' : 研究活動';
        break;
      case 'qa':
        $add = ' : よくある質問';
        break;
      case 'news':
        $add = ' : ニュース';
        break;
    }
    return 'ナノシステム集積センター' . $add;
  }

  // partsファイルの読み込み
  public static function get_parts($filename=''){
    if(!$filename){return;}
    return self::get_file('asset/parts/'. $filename .'.html');
  }

  // 対象pageの読み込み
  public static function get_page(){
    return self::get_file('asset/page/'. self::get_pagename() .'.html');
  }

  // cssの読み込み
  public static function get_tag_css(){
    $path = 'css/'. self::get_pagename() .'.css';
    if(!is_file($path)){return;}
    return "<link data-module='mynt' rel='stylesheet' href='$path?".date('YmdHis')."'>".PHP_EOL;
  }

  // jsの読み込み
  public static function get_tag_js(){
    $path = 'js/page/'. self::get_pagename() .'.js';
    if(!is_file($path)){return;}
    return "<script data-module='mynt' src='$path?".date('YmdHis')."'></script>".PHP_EOL;
  }

  // 任意ファイルパスの読み込み
  public static function get_file($path=''){
    if(!$path || !is_file($path)){return;}
    return file_get_contents($path);
  }

}