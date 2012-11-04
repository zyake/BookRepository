#!/bin/bash
$PHANTOMJS_HOME/bin/phantomjs $PHANTOMJS_HOME/examples/run-qunit.js RunAllTest.html
if [ $? -ne 0 ]
then
    echo "failed";
    exit 1;
fi;