# Owncloud Git Sync

Copies the content of the current directory to another directory, while excluding the folders and files in the gitignores. Also working with submodules.

It was made for Windows OS and requires Cygwin installed to work
```(location : C:\Program\ Files\Git\usr\bin\sh.exe)```

## Install dependencies
```
$ npm install
```

## Run
```
$ cd PATH_TO_FOLDER_TO_EXPORT
$ node PATH_TO_OWNCLOUD_GIT_SYNC/app.js --to=PATH_TO_FOLDER_OUTPUT
```

## Example
```
$ cd /c/Users/me/Projects/MyAwesomeProgram
$ node /c/Users/me/OwncloudGitSync/app.js --to=/c/Users/me/SavedProjects/
```
This will export _MyAwesomeProgram_ to **/c/Users/me/SavedProjects/MyAwesomeProgram** along with its submodules

