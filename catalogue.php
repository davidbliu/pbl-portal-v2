<?php
require_once("../pblPhp/header.php");
?>

<link rel = 'import' href = './header.html'/>
<script src = './controllers/catalogue.js'></script>
<body ng-app = 'pblApp'>
<div ng-controller = 'CatalogueCtrl'>
  <div ng-repeat = 'golink in golinks'>
    {{golink.key}}: {{golink.directory}}
  </div>
</div>
</body>
