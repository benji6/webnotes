set -euo pipefail

handle_error() {
  echo "💣 Error on line $1, exit code $2 💣"
  exit $2
}

trap 'handle_error $LINENO $?' ERR

pushd infra > /dev/null
terraform apply
popd > /dev/null

echo "🍄 Deployed! 🍄"
