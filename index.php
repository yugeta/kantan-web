<?php require 'php/main.php'; $main = new Main();?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <link rel='stylesheet' href='css/main.css'>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <link rel="shortcut icon" type="image/svg+xml" href="img/favicon.svg">
  <title><?php echo $main->get_title(); ?></title>
  <script src="js/main.js"></script>
</head>
<body>
  <header><?php echo $main->get_parts('header');?></header>
  <main><?php echo $main->get_page();?></main>
  <footer><?php echo $main->get_parts('footer');?></footer>
</body>
</html>
