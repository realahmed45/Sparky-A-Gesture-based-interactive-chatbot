import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description for Yoo
export const scroll = new GestureDescription("scroll");

scroll.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
scroll.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25);
scroll.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);

// Index
scroll.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
scroll.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25);

// Middle
scroll.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
scroll.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.25);

// Ring
scroll.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
scroll.addDirection(Finger.Ring, FingerDirection.VerticalDown, 0.25);

// Pinky
scroll.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
scroll.addDirection(Finger.Pinky, FingerDirection.VerticalDown, 0.25);
