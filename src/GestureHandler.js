import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import { drawHand } from "./utilities";

import { yooGesture } from "./yoo";
import { scroll } from "./scroll";
import { planGesture } from "./plan";
import { price } from "./price";
import { fullCurlDownWithThumbGesture } from "./home";

import victory from "./victory.png";
import thumbs_up from "./thumbs_up.png";
import axios from "axios"; // Import axios

export default function GestureHandler() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [emoji, setEmoji] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false); // State to track if Handpose model is loaded
  const images = { thumbs_up: thumbs_up, victory: victory };

  useEffect(() => {
    const runHandpose = async () => {
      const net = await handpose.load();
      console.log("Handpose model loaded.");
      setModelLoaded(true); // Set modelLoaded state to true once the model is loaded

      setInterval(() => {
        detect(net);
      }, 100);
    };

    runHandpose();
  }, []);

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        console.log("Hand detected:", hand);
        const GE = new fp.GestureEstimator([
          yooGesture,
          scroll,
          planGesture,
          price,
          fullCurlDownWithThumbGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        console.log("Gesture estimation result:", gesture);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const maxConfidenceGesture = gesture.gestures.reduce(
            (prev, current) =>
              prev.confidence > current.confidence ? prev : current
          );
          console.log("Max confidence gesture:", maxConfidenceGesture);
          setEmoji(maxConfidenceGesture.name);
          handleScroll(maxConfidenceGesture.name);

          if (maxConfidenceGesture.name === "yoo!") {
            console.log("Detected yoo gesture!");

            // Call logout API if "logout" gesture is detected
          }
          if (maxConfidenceGesture.name === "plan!") {
            navigate("/dashboard"); // Navigate to dashboard
          }
          if (maxConfidenceGesture.name === "price!") {
            navigate("/plans"); // Navigate to plans page
          }
        } else {
          setEmoji(null);
          handleScroll(null);
        }
      } else {
        setEmoji(null);
        handleScroll(null);
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8090/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      window.location.href = "/login"; // Redirect to login route after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleScroll = (gestureName) => {
    if (gestureName === "scroll") {
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const currentPosition = window.scrollY;

      if (currentPosition + windowHeight < scrollHeight) {
        window.scrollBy(0, 20);
      }
      if (currentPosition + windowHeight < scrollHeight) {
        window.scrollBy(0, 20);
      }
    }
  };

  return (
    <>
      {/* Conditional rendering based on whether Handpose model is loaded */}
      {modelLoaded && (
        <>
          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 200,
              height: 200,
              zIndex: 9,
              opacity: 0,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 200,
              height: 200,
              zIndex: 9,
              opacity: 0,
            }}
          />

          {emoji && (
            <img
              src={images[emoji]}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 400,
                bottom: 500,
                right: 0,
                textAlign: "center",
                height: 100,
              }}
            />
          )}
        </>
      )}
    </>
  );
}
