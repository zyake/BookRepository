#!/bin/bash
cd BookRepository/test
$PHANTOMJS_HOME/bin/phantomjs $PHANTOMJS_HOME/examples/run-qunit.js AssertUtilsTest.html
$PHANTOMJS_HOME/bin/phantomjs $PHANTOMJS_HOME/examples/run-qunit.js SelectJsonMapperTest.html
