import { StyleSheet, css } from "aphrodite";

import { TextBlock, RoundShape } from "react-placeholder/lib/placeholders";
import colors from "../../config/themes/colors";

const LeaderboardFeedPlaceholder = ({ color, rows }) => {
  return new Array(rows).fill(0).map((_, i) => {
    return (
      <div
        className={
          css(styles.placeholderContainer, i === 0 && styles.first) +
          " show-loading-animation"
        }
        key={`leaderboard-placeholder-${i}`}
      >
        <RoundShape className={css(styles.round)} color={color} />
        <TextBlock
          className={css(styles.textRow)}
          rows={1}
          color={color}
          style={{ width: "100%" }}
        />
      </div>
    );
  });

  return Placeholders;
};

const styles = StyleSheet.create({
  first: {
    marginTop: 35,
  },
  placeholderContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
    boxSizing: "border-box",
    backgroundColor: colors.WHITE(),
    cursor: "pointer",
    border: `1px solid ${colors.LIGHT_GREY_BACKGROUND}`,
    overflow: "hidden",
    width: "100%",
    ":hover": {
      backgroundColor: colors.INPUT_BACKGROUND_GREY,
    },
  },

  textRow: {
    marginLeft: 15,
  },
  round: {
    height: 40,
    width: 40,
    minWidth: 40,
    // margin: "10px 15px 0 0",
  },
});

export default LeaderboardFeedPlaceholder;
