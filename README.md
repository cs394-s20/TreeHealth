# Tree Health Team Handoff

## How to download and install code

Follow this [tutorial](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) to download a local copy of the TreeHealth repository.

To run the code within the TreeHealth app you must download Node.js to run it's npm commands in terminal. You can find download instructions [here](https://www.npmjs.com/get-npm)

Lastly, to run the simulator to visualize the app on your local system you will have to install the correct SDKs; based on your operating system. If you are on an iOS machine you will need to have XCode installed, which you can do via the App Store or follow this [link](https://apps.apple.com/us/app/xcode/id497799835?mt=12). If you are on a windows machine you need to install the Android SDK and Android emulator.

Lastly,

npm install -g expo-cli

Once you have done the above and installed are the requirements, you can open terminal, navigate to the TreeHealth folder, and run the following commands:

```

npm install
npm start

```

The first command will install all the dependicies required by the app and the second command will start the simulator. After running these commands you should be redirected to the Expo webbrowser where you will click "Run iOS Simulator" or "Run Android Simulator" depedning on your machine's operating system. You will see a mock phone pop up and the TreeHealth app will begin to download.
