#!/bin/bash

# case "$1" in
#     -d|--daemon)
#         $0 < /dev/null &> /dev/null & disown
#         exit 0
#         ;;
#     *)
#         $0 < /dev/null &> /dev/null & disown
#         exit 0
#         ;;
# esac

export FN_REGISTRY=patientplatypus

# while IFS= read line
# do
#         # display $line or do somthing with $line
# 	echo "$line"
# done <"$file"
docker build . -t patientplatypus/node-hello:0.0.1
docker push patientplatypus/node-hello:0.0.1

fn apps delete demoapp
fn apps create demoapp
fn routes create demoapp /hello -i patientplatypus/node-hello:0.0.1
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# echo 'dir name: '

file=$DIR"/message.txt"
fileoutput=`cat $file`
# lsof -i :8080
# lsof -i :8081
# echo -n "$fileoutput" | fn call demoapp /hello
# echo -n $file | fn call demoapp /hello


# while true; do
#   sleep 1000
# done
# while :
# do
# 	echo "spinHeartbeat"
# 	sleep 60
# done
