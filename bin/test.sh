set -euo pipefail

handle_error() {
  echo "💣 Error on line $1, exit code $2 💣"
  exit $2
}

trap 'handle_error $LINENO $?' ERR

pushd infra > /dev/null
terraform fmt --check --recursive
terraform validate
popd > /dev/null
pushd client > /dev/null
npm t
popd > /dev/null

echo "⏳ Running Checkov... ⏳"
pushd scripts > /dev/null
# CKV_AWS_50 is skipped because the system is simple and does not benefit from AWS X-Ray
# CKV_AWS_116 is skipped because lambdas are being used to process synchronous HTTP requests and a dead letter queue does not solve any known issues in that usecase (see also https://github.com/bridgecrewio/checkov/issues/1795)
# CKV_AWS_117 is skipped because the default AWS VPC is deemed sufficient
# CKV_AWS_119 is skipped because AWS encrypt DynamoDB at rest with their own keys and that is deemed sufficient (see also https://github.com/bridgecrewio/checkov/issues/1473)
# CKV_AWS_272 is skipped because it is deemed overly heavyweight
poetry run checkov --directory ../infra --quiet --skip-check CKV_AWS_50,CKV_AWS_116,CKV_AWS_117,CKV_AWS_119,CKV_AWS_272
# --quiet 
popd > /dev/null
echo "🍄 Checkov passed! 🍄"

echo "🍄 All tests pass! 🍄"
