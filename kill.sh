#!/bin/bash
PIDS=`lsof -t -i tcp:9000`

if [[ "" !=  "$PIDS" ]]; then
  echo "killing $PIDS"
  killall -9 $PIDS
fi
