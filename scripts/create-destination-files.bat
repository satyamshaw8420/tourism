@echo off
echo Creating destination files...
node scripts/create-destination-files.js
echo.
echo Destination files created successfully!
echo.
echo You can now:
echo 1. Navigate to the public/destinations directory
echo 2. Add images to each destination folder
echo 3. Update the image paths in src/data/sample-data.ts
echo.
pause