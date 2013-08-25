<?php

header("Content-Type: text/plain");

for ( $i = 1; $i < 30; $i++ ) {
echo <<<IV
        <ImageView
            android:id="@+id/channel$i"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:tag="channel$i" />


IV;
}