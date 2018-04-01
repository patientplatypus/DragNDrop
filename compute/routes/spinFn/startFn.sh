#!/bin/bash
echo "inside startFn"
echo "***installing curl"
# apt-get install -y curl
# apt-get update && apt-get install
echo "***installing Fn..."
curl -LSs https://raw.githubusercontent.com/fnproject/cli/master/install | sh
echo "***fn start..."
fn start
