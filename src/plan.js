import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description for Plan
export const planGesture = new GestureDescription("plan!");

// Thumb
planGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
planGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.25);

// Index
planGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
planGesture.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.25);

// Middle
planGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
planGesture.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 0.25);

// Ring
planGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
planGesture.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 0.25);

// Pinky
planGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
planGesture.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 0.25);
