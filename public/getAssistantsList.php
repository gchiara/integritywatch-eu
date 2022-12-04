<?php

$file = file_get_contents("./data/meps/doi-pretty.json");
$entries = json_decode($file);
$assistants = array (
  array('mep_id', 'assistant_type', 'assistant_name'),
);
//Loop through entries
foreach($entries as $entry) { 
  $mep_id = $entry->mep_id;
  //If assistants exists loop through properties of assistants
  if (array_key_exists('assistants', $entry)) {
    //For each property/type, set the property as type/category and loop in array
    foreach($entry->assistants as $a_key => $a_value) {
      $type = $a_key;
      //For each entry in this category create a new aray entry with needed data
      foreach($a_value as $assistant) {
        $assistant_entry = array($mep_id, $a_key, $assistant);
        array_push($assistants, $assistant_entry);
      }
    }
  }
}

//Save final assistants array to csv
//$fp = fopen('assistants.csv', 'w');

header('Content-type: application/csv');
header('Content-Disposition: attachment; filename=assistants.csv');
header("Content-Transfer-Encoding: UTF-8");
$f = fopen('php://output', 'a');
foreach ($assistants as $fields) {
    fputcsv($f, $fields);
}
fclose($f);

?>