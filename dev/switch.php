<?php

header("Content-Type: text/plain");

for ( $i = 1; $i < 30; $i++ ) {
echo <<<CASE
			case $i:
				return R.id.channel$i;

CASE;
}