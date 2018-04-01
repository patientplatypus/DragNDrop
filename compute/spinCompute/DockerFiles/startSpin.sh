echo "***docker run..."
docker run --rm -d \
      -p 8081:8081 \
      -e API_URL="http://localhost:8080/r" \
      -e no_proxy="localhost" \
      --name completer \
      fnproject/flow:latest
echo "***fn deploy..."
fn deploy --app spinComputeApp --local
echo "***fn apps config..."
fn apps config set spinComputeApp COMPLETER_BASE_URL "http://localhost:8081"
