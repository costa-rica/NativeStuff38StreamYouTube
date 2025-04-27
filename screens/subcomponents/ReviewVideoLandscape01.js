import YoutubePlayer from "react-native-youtube-iframe";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default function ReviewVideoLandscape01({
  playerRef,
  playing,
  handleStateChange,
  duration,
  togglePlaying,
  rewind,
  forward,
  currentTime,
}) {
  const vwMain = {
    flex: 1,
    backgroundColor: "red",
  };
  const vwVideoCover = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    opacity: 0.7,
    zIndex: 1,
  };
  const vwBottomContainer = {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 20,
    backgroundColor: "gray",
  };

  return (
    <View style={vwMain}>
      <YoutubePlayer
        style={styles.vwVideo}
        ref={playerRef}
        height={Dimensions.get("window").height}
        play={playing}
        videoId={"EM5NOPZHx_k"}
        onChangeState={handleStateChange}
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
      <View style={vwVideoCover} />
      <View style={vwBottomContainer}>
        <Text>Stuff in the bottom</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vwVideo: {
    width: "100%",
    height: "100%", // Matches parent height
    backgroundColor: "black",
  },
  timelineContainer: {
    height: 10,
    backgroundColor: "#aaa",
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5,
    overflow: "hidden",
    // paddingTop: 20,
  },
  timelineProgress: {
    height: "100%",
    backgroundColor: "#8D0B90",
  },
  vwSwitchTranparentView: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    // backgroundColor: "white",
  },
  switch: {
    // marginTop: 20,
    alignSelf: "center",
  },
  vwButtonContainer: {
    marginTop: 20,
    alignItems: "center",
    // backgroundColor: "white",
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
