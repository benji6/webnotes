# Deletes old users that have no notes saved
cleanup_zombie_users:
	@cd scripts && poetry run python3 ./cleanup_zombie_users.py

# Deploy infrastructure
deploy:
	./bin/deploy.sh

# Print this help message
help:
	@echo
	@awk '/^#/ {c=substr($$0,3); next} c && /^([a-zA-Z].+):/{ print "  \033[32m" $$1 "\033[0m",c }{c=0}' $(MAKEFILE_LIST) |\
		sort |\
		column -s: -t |\
		less -R

# Install all dependencies
init:
	@echo "⏳ Installing Node.js dependencies... ⏳"
	@cd client && npm i
	@echo "🍄 Node.js dependencies successfully installed! 🍄"
	@echo "⏳ Installing Python dependencies... ⏳"
	@cd scripts && poetry install
	@echo "🍄 Python dependencies successfully installed! 🍄"

# Run the project locally
start:
	./bin/start.sh

# Run all tests
test:
	./bin/test.sh

.PHONY: deploy help init start test
