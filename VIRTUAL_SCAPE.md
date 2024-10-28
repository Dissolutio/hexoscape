# Importing VirtualScape map files

VirtualScape saves maps as `.hsc` *binary* files.
We want to import them as JSON objects into Hexoscape.
This means, ideally, we can parse them with JavaScript in the browser.
They can be stored and shared on the web very easily after that.


## Virtualscape Repo
- Virtualscape Website: http://didier.paradis.free.fr/virtualscape/english/
- Repo: https://github.com/Dissolutio/virtualscape-backup
- Virtualscape loads files: https://github.com/Dissolutio/virtualscape-backup/blob/7c80625e1b152fb1e7836c83d4165cf79eca1c7d/HeroscapeEditor/HeroscapeEditor.cpp#L718
- Virtualscape saves files: https://github.com/Dissolutio/virtualscape-backup/blob/7c80625e1b152fb1e7836c83d4165cf79eca1c7d/HeroscapeEditor/HeroscapeEditor.cpp#L628

To run Virtualscape, you will need Windows. Or, in my case, I use Wine installed on Linux.

Virtualscape was created with AppWizard and VisualStudio:
- https://github.com/Dissolutio/virtualscape-backup/blob/7c80625e1b152fb1e7836c83d4165cf79eca1c7d/VirtualscapeDedicatedServer/VirtualScapeDedicatedServer/VirtualScapeDedicatedServer/VirtualScapeDedicatedServer.cpp#L65
- https://github.com/Dissolutio/virtualscape-backup/blob/master/LanguageTranslator/LanguageTranslator.vcproj


## SOLVED: Someone has done this already (in Java though 😢)
- Where they announced their software: https://www.heroscapers.com/threads/hexscape.50162/
- Where They Wrote Map Reader: https://github.com/lyrgard/HexScape/blob/master/client_core/src/main/java/fr/lyrgard/hexScape/io/virtualScape/VirtualScapeMapReader.java


## Getting into the Bits
We can view simple map files in hex and binary:
- https://unix.stackexchange.com/questions/282215/how-to-view-a-binary-file


## Example Maps
- Typhon2222's maps: https://www.dropbox.com/scl/fo/v84k4jek9tjjy07j2blag/AASrmLIs4fEKyyNNFZ4FITU?rlkey=pgu64dj7fyg0k7oxep23x567f&e=1
- Heroscape.org map page: https://heroscape.org/map/

## Other Editors
- Landscape 20: https://www.heroscapers.com/threads/landscape-20-reimagining-a-heroscape-battlefield-app-20-ye.63462/
- HexScape (mentioned above): https://www.heroscapers.com/threads/hexscape.50162/
