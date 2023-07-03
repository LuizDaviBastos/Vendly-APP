REM - remove android platform

rd /s /q android
rd /s /q www



REM - add android platform and apply settings for AndroidManifest
npm run build:lib & npx cap add android & npx cap-config run config.yaml -y & xcopy /y ".\google-services.json" ".\android\app" & ionic cap build android --no-open & npx @capacitor/assets generate --iconBackgroundColor=#ffde33 --iconBackgroundColorDark=#ffde33 --splashBackgroundColor=#ffde33 --splashBackgroundColorDark=#ffde33 & npx cap sync & .\copy-icons.bat