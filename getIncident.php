<?php
// Programmer : Dan Bertrand
// DATE: March 2014 
// 
// getIncident.php : PHP app to return JSON array of events recorded by a smartphone
//                   for use on Google map canvas.
//


// for debugging

//ini_set('display_errors',1); 
//error_reporting(E_ALL);

session_start();

header('Content-Type: application/json');

//
// parameters: employee who recorded the data, and the day that it was recorded.
//
$employeeIdRequested = $_REQUEST['employeeIdRequested'];
$dateRequested = $_REQUEST['dateRequested'];

// make sure dbconn is not readable to everyone(650)
include('dbconn.php');

//
// MUST use PDO calls. Older mysql_query calls are deprecated.
//
$db = new PDO('mysql:host=localhost;dbname='.$db, $user, $pass);

//
// JUNCTiON table mediaUrl is used in a JOIN along with markers to obtain:
// (id, employeeId,latitude, longitude, issue,ts, date, time, and multimedia type(photo, voice or video) 
// data.
$markerRequest = "SELECT o.id AS id,
                        o.employeeId AS employeeId,
						  o.latitude AS latitude,
						   o.longitude AS longitude, o.altitude AS altitude,
						    o.issue AS issue,
							o.ts as ts,
							DATE_FORMAT( ts,  '%Y-%m-%e') AS date_formatted,
							DATE_FORMAT( ts,  '%h:%i:%s') AS time_formatted,							
							type ,
							mediaUrl
					FROM media m
					INNER JOIN markers o ON m.id = o.id
					WHERE (DATE_FORMAT(ts,'%Y-%m-%e')='".$dateRequested."') 
					AND (employeeId=".$employeeIdRequested.") ORDER BY ts";

$items = array();
foreach ($db->query($markerRequest) as $row)
{
   array_push($items, $row);
}
$result["rows"] = $items;
$db = null;

//
// create javaScript JSON array that Google maps can use as a data source
//
echo "var db = ".json_encode($items).";";	

?>