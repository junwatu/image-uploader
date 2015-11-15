#!/bin/sh
for i in `seq 1 70` ; do wget "wget http://demos.telerik.com/kendo-ui/content/web/foods/$i.jpg" -O images/$i.jpg ; done