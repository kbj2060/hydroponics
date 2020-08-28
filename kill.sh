#!/bin/bash
PID=`lsof -t -i tcp:9000`
if [[ "" !=  "$PID" ]]; then
  echo "killing $PID"
  kill -9 $PID
fi
