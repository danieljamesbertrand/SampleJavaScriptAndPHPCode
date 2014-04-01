<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Google Map v3 API - custom pins</title>

<!-- CSS -->
<style type="text/css">
*{ padding:0; margin:0; }
#map_div{
	width:800px;
	height:800px;
	border:6px solid #F4F4F4;
	margin:20px auto 0 auto;
}
</style>
<link rel="stylesheet" href="css/theme.css" type="text/css">

<?php
session_start();
$dateRequested = $_REQUEST['dateRequested'];
$employeeIdRequested = $_REQUEST['employeeIdRequested'];

?>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>
<script src="//maps.google.com/maps/api/js?key=AIzaSyCQ5nLdeyuF0hrjGC1bgoyNMA98w_ymb9o&sensor=true" type="text/javascript"></script>

<script src="./getIncident.php?employeeIdRequested=<?php echo $_REQUEST['employeeIdRequested']?>&dateRequested=<?php echo $_REQUEST['dateRequested']?>"></script>

<script src="maps.js" type="text/javascript"></script>
<!--The following script tag downloads a font from the Adobe Edge Web Fonts server for use within the web page. We recommend that you do not modify it.-->
<script>var __adobewebfontsappname__="dreamweaver"</script>
<script src="http://use.edgefonts.net/acme:n4:default.js" type="text/javascript"></script>
<script>
function loadDataset() {
console.log('load dataset...');	
}
</script>
</head>

<body>
<div id="myMenuID"><table>
  <tr><td onclick="loadDataset()" class="ThemePanelMainFolderLeft">Load DataSet</td></tr></table></div>
<table width="100%" border="1" cols="3">
<tr><td width="410px;"><canvas id="canvas" name="canvas"></canvas><br>
</td><td>
	<div id="map_div"></div></td><td><div id="thumb"></div><div id="dots"></div></td></tr>
   </table>


</body>

</html>


