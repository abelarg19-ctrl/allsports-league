#!/bin/bash

set -e

echo ""
echo "======================================"
echo " AllSports League - Project Check"
echo "======================================"
echo ""

echo "Branch:"
git branch --show-current

echo ""
echo "Git status:"
git status --short

echo ""
echo "Running production build..."
echo ""

npm run build

echo ""
echo "======================================"
echo " BUILD SUCCESSFUL"
echo "======================================"
echo ""
echo "Ready for next ASL step."
