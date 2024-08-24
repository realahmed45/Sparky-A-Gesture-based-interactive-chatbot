// Import dependencies
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const price = new GestureDescription("price!");

// Thumb
price.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
price.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25);
price.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);

// Index
price.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
price.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25);

// Pinky
price.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
price.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.25);

for (let finger of [Finger.Middle, Finger.Ring]) {
  price.addCurl(finger, FingerCurl.FullCurl, 0.75);
  price.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}
