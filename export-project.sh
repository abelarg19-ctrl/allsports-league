#!/bin/bash

OUTPUT="project-full.txt"

> "$OUTPUT"

find . \
  -path "./node_modules" -prune -o \
  -path "./.next" -prune -o \
  -path "./.git" -prune -o \
  -path "./public" -prune -o \
  -type f \
  \( \
    -name "*.ts" -o \
    -name "*.tsx" -o \
    -name "*.css" -o \
    -name "*.json" -o \
    -name "*.md" \
  \) \
  -print | sort | while read file
do
  echo "" >> "$OUTPUT"
  echo "============================================================" >> "$OUTPUT"
  echo "$file" >> "$OUTPUT"
  echo "============================================================" >> "$OUTPUT"
  cat "$file" >> "$OUTPUT"
done

echo ""
echo "✅ Created $OUTPUT"./export-project.sh

