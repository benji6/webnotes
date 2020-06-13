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
yarn test
popd > /dev/null

echo "🍄 All tests pass! 🍄"
