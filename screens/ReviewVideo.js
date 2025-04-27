import YoutubePlayer from "react-native-youtube-iframe";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import ReviewVideoPortrait01 from "./subcomponents/ReviewVideoPortrait01";
import ReviewVideoLandscape01 from "./subcomponents/ReviewVideoLandscape01";
import * as ScreenOrientation from "expo-screen-orientation";

export default function ReviewVideo({ navigation }) {
  const [isGreen, setIsGreen] = useState(false);
  const playerRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [orientation, setOrientation] = useState("portrait");

  // for PRODUCTION -> forces to landscape
  useEffect(() => {
    const lockToLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
      setOrientation("landscape");
    };

    lockToLandscape(); // Force landscape mode when component mounts

    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      ); // Reset to portrait when leaving
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerRef.current && playing) {
        const time = await playerRef.current.getCurrentTime();
        setCurrentTime(time);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playing]);

  const handleStateChange = (state) => {
    if (state === "playing" && playerRef.current) {
      playerRef.current.getDuration().then((dur) => {
        setDuration(dur);
      });
    }
  };

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };

  const rewind = async () => {
    if (playerRef.current) {
      const currentTime = await playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(currentTime - 2, 0), true);
    }
  };

  const forward = async () => {
    if (playerRef.current) {
      const currentTime = await playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 5, true);
    }
  };

  return (
    <ReviewVideoLandscape01
      playerRef={playerRef}
      playing={playing}
      handleStateChange={handleStateChange}
      duration={duration}
      togglePlaying={togglePlaying}
      rewind={rewind}
      forward={forward}
      currentTime={currentTime}
    />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "gray",
//     justifyContent: "center",
//     padding: 10,
//   },
//   videoWrapper: {
//     position: "relative",
//     width: "100%",
//     height: 220,
//   },
//   coverView: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "transparent",
//     opacity: 0.7,
//     zIndex: 2,
//   },
//   timelineContainer: {
//     height: 10,
//     backgroundColor: "#aaa",
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 10,
//     borderRadius: 5,
//     overflow: "hidden",
//     // paddingTop: 20,
//   },
//   timelineProgress: {
//     height: "100%",
//     backgroundColor: "#8D0B90",
//   },
//   vwSwitchTranparentView: {
//     alignItems: "center",
//     flexDirection: "row",
//     gap: 10,
//     // backgroundColor: "white",
//   },
//   switch: {
//     // marginTop: 20,
//     alignSelf: "center",
//   },
//   vwButtonContainer: {
//     marginTop: 20,
//     alignItems: "center",
//     // backgroundColor: "white",
//   },
//   vwButtonRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   playPauseButton: {
//     backgroundColor: "black",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   skipButton: {
//     backgroundColor: "black",
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   playPauseButtonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });
