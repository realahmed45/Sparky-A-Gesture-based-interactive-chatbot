// Import dependencies
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const yooGesture = new GestureDescription("yoo!");

// Thumb
yooGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0); // Adjusted to 1.0
yooGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25); // Adjusted to 0.5
yooGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25); // Adjusted to 0.5

// Index
yooGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0); // Adjusted to 1.0
yooGesture.addDirection(Finger.Index, FingerDirection.VerticalDown, 0.25); // Adjusted to 0.5

// Pinky
yooGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0); // Adjusted to 1.0
yooGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.25); // Adjusted to 0.5

for (let finger of [Finger.Middle, Finger.Ring]) {
  yooGesture.addCurl(finger, FingerCurl.FullCurl, 1.0); // Adjusted to 1.0
  yooGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25); // Adjusted to 0.5
}
