#!/bin/bash

# UTを全て実行するためのシェルスクリプト。

FAILED="FALSE"

$PHANTOMJS_HOME/bin/phantomjs $PHANTOMJS_HOME/examples/run-qunit.js PagerModelTest.html
if [ $? -ne 0 ]
then
    FAILED="TRUE"
fi;

$PHANTOMJS_HOME/bin/phantomjs $PHANTOMJS_HOME/examples/run-qunit.js ErrorViewTest.html
if [ $? -ne 0 ]
then
    FAILED="TRUE"
fi;

if [ $FAILED = "TRUE" ]
then
	echo "test failed";
	exit 1;
fi;

echo "all test successed";

exit 0;