IF "%1"=="build" (
    ionic capacitor build android --prod & "./deploy.bat"
)

IF NOT EXIST "./my-release-key.keystore" (
    REM  Generate the key store
    keytool -genkey -v -keystore my-release-key.keystore -alias mykeystore -keyalg RSA -keysize 2048 -validity 10000 -storepass 80849903D
)

jarsigner -verbose -sigalg SHA1withRSA -storepass 80849903D -digestalg SHA1 -keystore my-release-key.keystore ".\android\app\build\outputs\apk\debug\app-debug.apk" mykeystore

IF EXIST ASM.apk (
    del ASM.apk
)

REM  Set path to zipalign
PATH = "C:\Users\davi-\AppData\Local\Android\Sdk\build-tools\33.0.0"
zipalign -v 4 ".\android\app\build\outputs\apk\debug\app-debug.apk" ASM.apk




