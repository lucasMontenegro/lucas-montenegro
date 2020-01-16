npm run wdio -- --spec \
./src/local/clients/createNotFound/NotFoundView/NotFoundView.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/throwPropTypeErrors/throwPropTypeErrors.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/core/links/links.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/core/makeClientLocation/makeClientLocation.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/core/useViewState/useViewState.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/core/NavLink/NavLink.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/core/LanguageDialog/LanguageDialog.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/core/Body/Body.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/core/HandleRedirect/HandleRedirect.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/core/makeRouter/makeRouter.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/core/Drawer/Drawer.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/core/portals/makeUniqueRef/makeUniqueRef.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/core/portals/portals.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/local/core/makeLanguageDialogState/makeLanguageDialogState.wdio.old.js &&
sleep 20s &&

npm run wdio -- --spec \
./src/app/Examples/browserSetWindowSize/browserSetWindowSize.wdio.old.js &&
printf '\n\n\n\n\n\nDONE\n'