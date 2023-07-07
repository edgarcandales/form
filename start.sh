#!/bin/bash
rm -rf node_modules
rm -rf ios/Pods 
rm -rf ios/build
rm ios/Podfile.lock
rm package-lock.json
kill $(lsof -t -i :8081)
npm start -- --reset-cache &
pid=$!
sleep 5
kill $pid
npm i
cd ios
pod install
cd ..
#npx react-native run-ios
#npx react-native run-ios --simulator="iPhone 8"
#npx react-native run-ios --simulator="iPhone 8 Plus"
#npx react-native run-ios --simulator="iPhone 11"
#npx react-native run-ios --simulator="iPhone 11 Pro"
#npx react-native run-ios --simulator="iPhone 11 Pro Max"
#npx react-native run-ios --simulator="iPhone SE (2nd generation)"
#npx react-native run-ios --simulator="iPhone 12 mini"
#npx react-native run-ios --simulator="iPhone 12"
#npx react-native run-ios --simulator="iPhone 12 Pro"
#npx react-native run-ios --simulator="iPhone 12 Pro Max"
#npx react-native run-ios --simulator="iPhone 13 Pro"
#npx react-native run-ios --simulator="iPhone 13 Pro Max"
#npx react-native run-ios --simulator="iPhone 13 mini"
#npx react-native run-ios --simulator="iPhone 13"
#npx react-native run-ios --simulator="iPhone 14 Pro Max"
#npx react-native run-ios --simulator="iPhone 14"
npx react-native run-ios --simulator="iPhone 14 Pro"

#npx react-native run-android
