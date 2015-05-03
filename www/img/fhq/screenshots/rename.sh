#!/bin/bash

for f in Снимок\ экрана\ от\ *
do
	mv "$f" "${f:17:23}";
done

for f in 20*
do
	echo "<img class=\"scrrenshot\" src=\"img/fhq/$f\"/>"
	
	
done
