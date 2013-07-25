Arrive Mobile Client
====================

This is the mobile client for the Arrive platform. It allows the users to mark their attendance in a class.

Tech Stack
----------

This client app is build using Apache Cordova (PhoneGap), and currently supports the ios and android platforms. 

We use node, and the cordova-cli package to build and run the application. 
We use Ripple as a browser based emulator for the various mobile platforms.
We use Jasmine and PhantomJS run the JavaScript spec tests.

This client app is served by a [node server backend](https://github.com/ArriveApp/arrive-server).

Dev Machine Setup
-----------------

1. Install XCode (use the App Store) and the [command line tools](https://developer.apple.com/downloads/) to build binaries for the iOS platform.

2. Install [Homebrew](http://mxcl.github.io/homebrew/):

            ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

3. Install [Node.js](http://nodejs.org/):

            brew install node

4. Using npm, install the node cordova-cli package:

            sudo npm install -g cordova

5. To ensure permissions are correct, run this command on Mac or Linux, replacing <login_user> to match your account name:

            sudo chown -R <login_user> /usr/local/lib/node_modules/cordova
                
6. Install the [Android SDK](http://developer.android.com/sdk/index.html) to build binaries for the Android platform. You will need to add the sdk tools subfolder to the system path.

            brew install android-sdk

7. Install ios-sim. This allows cordova to launch the ios simulator from the commandline
  
            brew install ios-sim

8. Install phantomjs for our test runner
  
            brew install phantomjs

9. Install the [Ripple](https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc?hl=en) Chrome extension.


Dev Workflow
------------

Since app development is as simple as editing html, js and css files, you can pretty much use any editor you want.

*NOTE*: Regardless of which editor you use, please do not commit editor specific files into the repo. Add them to the .gitignore file in the root folder.

To set up a quick feedback loop using the Ripple emulator:

1. Start a local file server:

            cordova serve ios

Make sure you have /usr/local/share/npm/bin if see a "command not found" error.

2. Hit the server (usually http:://localhost:8000).
3. If you have not enabled the Ripple extention yet, click on its icon and select Enable.

To run the app in the official platform emulators:

1. Build the platform-specific binaries. (This builds for all platforms. pass in a platform parameter _ios_ or _android_ to build for just that platform)..
    
            cordova build

2. Now, launch the emulator for the specific platform
    
            cordova emulate ios
            cordova emulate android
