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
# TODO enable the skipped checks
poetry run checkov --directory ../infra --quiet --skip-check CKV2_AWS_53,CKV_AWS_115,CKV_AWS_272,CKV_AWS_116,CKV_AWS_117,CKV_AWS_50,CKV_AWS_119,CKV_AWS_217,CKV_AWS_237
# --quiet 
popd > /dev/null
echo "🍄 Checkov passed! 🍄"

echo "🍄 All tests pass! 🍄"
