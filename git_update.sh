#!/bin/bash

# Define variables
REPO_DIR="https://github.com/smathev/git_dev/WorkPC/pyLib" # Replace with your repository path
EXCLUDE_DIR="WorkPC"                        # Folder to exclude from deletion
BRANCH_NAME="WorkPC"                        # Branch name to use

# Navigate to the repository directory
cd $REPO_DIR

# Checkout the WorkPC branch
git checkout $BRANCH_NAME

# Check for changes in the repository
if git diff-index --quiet HEAD --; then
	echo "No changes in the repository."
else
	# Pull the latest changes from the WorkPC branch
	if git pull origin $BRANCH_NAME; then
		echo "Changes pulled successfully."

		# Move contents of the WorkPC folder to the root directory
		mv ./$EXCLUDE_DIR/* .

		# Remove all files in the WorkPC folder except the excluded folder
		find ./$EXCLUDE_DIR -type f -exec rm -f {} +

		# Touch a file in the EXCLUDE_DIR
		touch ./$EXCLUDE_DIR/exclude_file.txt

		# Stage all changes
		git add .

		# Commit changes
		git commit -m "Moved WorkPC contents to root directory and synced"

		# Push changes to the WorkPC branch
		git push origin $BRANCH_NAME

		echo "Changes committed and pushed to $BRANCH_NAME branch."
	else
		echo "No changes or there was an error pulling the latest changes."
	fi
fi

