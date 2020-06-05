# Tree Health Team Handoff

## What is TreeHealth

TreeHealth is a mobile-based application that aims to provide homeowners with early notifications or warnings to health risks potentially affecting their trees.

## How to download and install code

- Follow this [tutorial](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) to download a local copy of the TreeHealth repository.

- To run the code within the TreeHealth app you must download Node.js to run it's npm commands in the terminal. You can find download instructions [here](https://www.npmjs.com/get-npm)

- To run the simulator to visualize the app on your local system you will have to install the correct SDKs; based on your operating system. If you are on an iOS machine you will need to have XCode installed, which you can do via the App Store or follow this [link](https://apps.apple.com/us/app/xcode/id497799835?mt=12). If you are on a windows machine you need to install the Android SDK and Android emulator.

- Additionally, you will need to download the Expo client which helps to run the simulators. You can do this with the following command in terminal

```

npm install -g expo-cli

```

- Once you have done the above and installed are the requirements, you can open the terminal, navigate to the TreeHealth folder, and run the following commands:

```

npm install
npm start

```

- The first command will install all the dependencies required by the app and the second command will start the app. After running these commands you should be redirected to the Expo web page where you will want to click "Run iOS Simulator" or "Run Android Simulator" depending on your machine's operating system. You will see a mock phone pop up and the TreeHealth app will begin to load. Also, you can run the app on your phone by scanning the QR code on the web page.

You can now interact with the app as normal.

## How To Create Firebase Accounts and Link Firebase Project to the App

We use a platform called Firebase, a cloud storage system. When building this app, we used our own personal keys and Firebase set up, however, now that we are handing this off we will provide instructions for your team to set up your own Firebase configuration. We have left our configuration in the application files, however, after following the instructions below you can update that information with your own.

-You can sign into Firebase with your Google account. If you don’t have a Google account, you can create one.This must be a non Northwestern account as Northwestern does not support Firebase usage.

-You will begin by creating a new firebase project. You can follow [this tutorial](https://help.appsheet.com/en/articles/2087255-creating-a-firebase-account) to create the project.

-You will now have to link the Firebase project you created to the app. You can follow [this tutorial](https://courses.cs.northwestern.edu/394/firebase-notes.php#cli)

-Since the app is already connected to another Firebase project you will need it to switch to the one you have created. You can do this by running the following command in terminal within the project folder.

```

firebase use <project_id>

```

## Platform Constraints, Both for Development and Deployment:

Since we are using React Native, sometimes there are discrepancies between functions/packages used for the iOS platform versus the Android platform. This leads to some UI/visual elements changing based on which platform you are using. However, it should never affect the functionality of the app.

## Known Bugs and Issues:

Currently there is a warning present within that app that begins with:

> Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in %s.%s, a useEffect cleanup function

This warning is associated with the camera function, however, it does not interfere with any of the application's functionalities or capabilities. The app still works the same with this warning.
