import YoutubePlayer from "react-native-youtube-iframe";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useState, useRef } from "react";
import ViewTemplate from "../screens_core/components/ViewTemplate";

export default function StreamYouTube01({ navigation }) {
  const [isGreen, setIsGreen] = useState(false);
  const playerRef = useRef();
  const [playing, setPlaying] = useState(false);

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
    <ViewTemplate navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.videoWrapper}>
          <YoutubePlayer
            ref={playerRef}
            height={220}
            play={playing}
            // videoId={"dQw4w9WgXcQ"}
            videoId={"EM5NOPZHx_k"}
            webViewProps={{
              allowsInlineMediaPlayback: true,
            }}
            initialPlayerParams={{
              controls: 0,
              modestbranding: true,
              rel: 0,
              showinfo: false,
            }}
          />
          <View
            style={[
              styles.coverView,
              { backgroundColor: isGreen ? "green" : "transparent" },
            ]}
          />
        </View>
        <View style={styles.vwSwitchTranparentView}>
          <Text>Hide Cover</Text>
          <Switch
            value={isGreen}
            onValueChange={(value) => setIsGreen(value)}
            style={styles.switch}
          />
        </View>
        <View style={styles.vwButtonContainer}>
          <View style={styles.vwButtonRow}>
            <TouchableOpacity onPress={rewind} style={styles.skipButton}>
              <Text style={styles.playPauseButtonText}>-2s</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={togglePlaying}
              style={styles.playPauseButton}
            >
              <Text style={styles.playPauseButtonText}>
                {playing ? "Pause" : "Play"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={forward} style={styles.skipButton}>
              <Text style={styles.playPauseButtonText}>+5s</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ViewTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    padding: 10,
  },
  videoWrapper: {
    position: "relative",
    width: "100%",
    height: 220,
  },
  coverView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    opacity: 0.7,
    zIndex: 2,
  },
  vwSwitchTranparentView: {
    // backgroundColor: "white",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  switch: {
    // marginTop: 20,
    alignSelf: "center",
  },
  vwButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  vwButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  playPauseButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  skipButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  playPauseButtonText: {
    color: "white",
    fontSize: 16,
  },
});
