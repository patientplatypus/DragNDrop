#!/bin/bash



docker build spinCompute ./spinCompute
docker run -p 5000:5000 spinCompute
