Arrive Mobile Client
====================

This is the mobile client for the Arrive platform. It allows the users to mark their attendance in a class.

Tech Stack
----------

This client app is build using Apache Cordova (PhoneGap), and currently supports the ios and android platforms. 
We use node, and the cordova-cli package to build and run the application. 
We use Ripple as a browser based emulator for the various mobile platforms
Jasmine and PhantomJS to run the JavaScript spec tests.
The app uses with a node server as its backend.

Dev Machine Setup
------------------
- Install Homebrew
  - Install ios-sim. This allows cordova to launch the ios simulator from the commandline
  
            brew install ios-sim
  - Install phantomjs for our test runner
  
            brew install phantomjs
- Install Node.js
  - Install the node cordova-cli package:

            sudo npm install -g cordova

     - To ensure permissions are correct, run this command on Mac or Linux, changing <login_user> to match your account name:

                sudo chown -R <login_user> /usr/local/lib/node_modules/cordova

Dev Workflow
------------

Since app development is as simple as editing html, js and css files, you can pretty much use any editor you want.

*NOTE*: Regardless of which editor you use, please do not commit editor specific files into the repo. Add them to the .gitignore file in the root folder.

Once you are done editing the code, you can get quick feedback by running the application in the browser based Ripple emulator. To do that, at the commandline, type:
  
  For Android:
  
    cordova ripple android
  For iOS:
  
    cordova ripple ios
This will launch the Ripple emulator in a webpage, with your app running in it.

To run the app in the official platform emulators, you will need to build it first:
    
    cordova build 
(This builds for all platforms. pass in a platform parameter _ios_ or _android_ to build for just that platform)

Now, launch the emulator for the specific platform
    
    cordova emulate ios
