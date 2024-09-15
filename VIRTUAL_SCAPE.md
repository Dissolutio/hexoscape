# Importing VirtualScape files

We have a lead!

Basically, VirtualScape saves these `.hsc` files, and we want to import them into the map editor, and actually just in general release into the wild a way to turn VirtualScape maps into more updated and available internet objects.

We have access to and have forked the Virtualscape Repo, and the spots where VirtualScape loads/saves files:
- https://github.com/Dissolutio/virtualscape-backup
- loads: https://github.com/Dissolutio/virtualscape-backup/blob/7c80625e1b152fb1e7836c83d4165cf79eca1c7d/HeroscapeEditor/HeroscapeEditor.cpp#L718
- saves: https://github.com/Dissolutio/virtualscape-backup/blob/7c80625e1b152fb1e7836c83d4165cf79eca1c7d/HeroscapeEditor/HeroscapeEditor.cpp#L628

We know it was created with AppWizard and VisualStudio:
- https://github.com/Dissolutio/virtualscape-backup/blob/7c80625e1b152fb1e7836c83d4165cf79eca1c7d/VirtualscapeDedicatedServer/VirtualScapeDedicatedServer/VirtualScapeDedicatedServer/VirtualScapeDedicatedServer.cpp#L65
- https://github.com/Dissolutio/virtualscape-backup/blob/master/LanguageTranslator/LanguageTranslator.vcproj

We can view simple map files in hex and binary:
- https://unix.stackexchange.com/questions/282215/how-to-view-a-binary-file

Someone has to manually backwards-engineer these dang `.hsc` files!