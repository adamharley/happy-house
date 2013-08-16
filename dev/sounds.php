<?php

$data = file("sounds.txt");
$r = $sounds = array();

foreach ( $data as $line ) {
	$lineArr = explode( " ", $line, 3 );
	
	list( $start, $end ) = explode( '-', $lineArr[0], 2 );
	$end = (int) $end;
	$sound = trim( $lineArr[1] );
	$loop = isset( $lineArr[2] );
	
	if ( '430' == $sound || 'B' == $sound )
		continue;
	
	if ( 'Sr-twkl2' == $sound ) // Doesn't actually loop anyway and needs special handling
		$loop = false;
	
	$r[ $start ] = $loop ? array( $sound, $end ) : array( $sound );
	$sounds[ $sound ] = $sound;
}

echo json_encode( $r );

echo "<p>&nbsp;</p>";

echo json_encode( array_keys( $sounds ) );