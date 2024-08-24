import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const fullCurlDownWithThumbGesture = new GestureDescription(
  "FullCurlDownWithThumb"
);
fullCurlDownWithThumbGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
fullCurlDownWithThumbGesture.addDirection(
  Finger.Thumb,
  FingerDirection.HorizontalLeft,
  1.0
);
fullCurlDownWithThumbGesture.addDirection(
  Finger.Thumb,
  FingerDirection.HorizontalRight,
  1.0
);

// Index
fullCurlDownWithThumbGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
fullCurlDownWithThumbGesture.addDirection(
  Finger.Index,
  FingerDirection.VerticalDown,
  1.0
);

// Middle
fullCurlDownWithThumbGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
fullCurlDownWithThumbGesture.addDirection(
  Finger.Middle,
  FingerDirection.VerticalUp,
  1.0
);

// Ring
fullCurlDownWithThumbGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
fullCurlDownWithThumbGesture.addDirection(
  Finger.Ring,
  FingerDirection.VerticalUp,
  1.0
);

// Pinky
fullCurlDownWithThumbGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
fullCurlDownWithThumbGesture.addDirection(
  Finger.Pinky,
  FingerDirection.VerticalUp,
  1.0
);
