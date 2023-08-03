import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, css } from "aphrodite";
import ScrollMenu from "react-horizontal-scrolling-menu";

import colors, { paperTabColors } from "~/config/themes/colors";
import { paperTabFont } from "~/config/themes/fonts";

const PaperTabBar = (props) => {
  const { activeTab, setActiveTab, paperDraftExists } = props;
  const [tabs, setTabs] = useState(getPaperTabs());
  const menuRef = useRef();

  useEffect(() => {
    setTabs(getPaperTabs());
  }, [paperDraftExists]);

  useEffect(() => {
    menuRef.current && menuRef.current.scrollTo(`${activeTab}`);
  }, [activeTab]);

  function getPaperTabs() {
    const paperTabs = [
      { href: "main", label: "main" },
      { href: "abstract", label: "abstract" },
      { href: "comments", label: "comments" },
      { href: "paper pdf", label: "Paper PDF" },
    ];

    if (paperDraftExists) {
      paperTabs.splice(3, 0, { href: "paper", label: "paper" });
    }

    return paperTabs;
  }

  const onClick = (key) => {
    const index = Number(key);

    setActiveTab(index);
    setTimeout(() => {
      activeTab !== index && setActiveTab(index);
      menuRef.current && menuRef.current.scrollTo(key);
    }, 20);
  };

  function renderTab(tab, index) {
    const { key, href, label, ui } = tab;
    let isSelected = false;
    const classNames = [styles.tab];

    if (index === activeTab || index === activeTab) {
      isSelected = true;
      classNames.push(styles.selected);
    }

    return (
      <a href={`#${href}`} className={css(styles.tag)} key={index}>
        <div className={css(classNames)} onClick={onClick}>
          {label} {ui && ui(isSelected)}
        </div>
      </a>
    );
  }

  const menu = tabs.map(renderTab);

  return (
    <div className={css(styles.container)}>
      <ScrollMenu
        ref={menuRef}
        data={menu}
        arrowLeft={
          <NavigationArrow
            icon={<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>}
            direction={"left"}
          />
        }
        arrowRight={
          <NavigationArrow
            icon={<FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>}
            direction={"right"}
          />
        }
        menuStyle={styles.tabContainer}
        itemStyle={{ border: "none", highlight: "none", outline: "none" }}
        hideSingleArrow={true}
        onSelect={onClick}
        selected={activeTab}
      />
    </div>
  );
};

const UIStyling = (props) => {
  const { isSelected, label, loading } = props;
  return (
    <span
      id={"count_border"}
      className={css(
        styles.ui,
        loading && styles.loading,
        isSelected && styles.selectedUi
      )}
    >
      {props.children}
    </span>
  );
};

export const NavigationArrow = ({ icon, direction, customStyles }) => {
  const classNames = [styles.arrowContainer];

  if (direction === "left") {
    classNames.push(styles.arrowLeft);
  } else {
    classNames.push(styles.arrowRight);
  }

  if (customStyles) {
    classNames.push(customStyles);
  }

  return <div className={css(classNames)}>{icon}</div>;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    background: colors.WHITE(),
    borderBottom: `1.5px solid ${colors.VERY_LIGHT_GREY()}`,
    borderTop: `1.5px solid ${colors.VERY_LIGHT_GREY()}`,
    boxSizing: "border-box",
    padding: "0 20px 0 5px",
  },
  tabContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
  },
  firstTab: {
    paddingLeft: 0,
  },
  tab: {
    color: paperTabColors.FONT,
    fontFamily: paperTabFont,
    padding: "1rem",
    textAlign: "center",
    textDecoration: "none",
    textTransform: "capitalize",
    whiteSpace: "nowrap",
    fontSize: 16,
    fontWeight: 500,
    ":active": {
      color: colors.PURPLE(),
      cursor: "pointer",
    },
    ":hover #count_border": {
      borderColor: colors.BLACK(),
    },
    "@media only screen and (min-width: 1288px)": {
      marginRight: 0,
    },
    "@media only screen and (max-width: 767px)": {
      padding: 16,
      fontSize: 14,
    },
    "@media only screen and (max-width: 321px)": {
      fontSize: 14,
      padding: 15,
    },
  },
  lastTab: {
    marginRight: 0,
    "@media only screen and (min-width: 1288px)": {
      marginRight: 0,
    },
  },
  count: {
    padding: "3px 5px",
    borderRadius: 3,
    fontSize: 14,
    "@media only screen and (max-width: 415px)": {
      fontSize: 13,
      padding: "3px 5px",
    },
    "@media only screen and (max-width: 321px)": {
      fontSize: 11,
    },
  },
  ui: {
    border: `1px solid ${colors.GREYISH_BLUE2()}`,
    borderRadius: 3,
  },
  loading: {
    padding: 0,
    width: "unset",
  },
  customLoader: {
    display: "unset",
  },
  selectedUi: {
    borderColor: colors.PURPLE(1),
  },
  selected: {
    color: paperTabColors.SELECTED,
    borderBottom: "solid 3px",
    borderColor: paperTabColors.SELECTED,
  },
  tag: {
    color: "unset",
    textDecoration: "unset",
    display: "flex",
    justifyContent: "center",
  },
  componentWrapper: {
    position: "relative",
  },
  preRegContainer: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: 0,
    bottom: 4,
    paddingBottom: "1rem",
    color: colors.BLACK(0.5),
    fontSize: 16,
    "@media only screen and (max-width: 767px)": {
      display: "none",
    },
  },
  preRegIcon: {
    height: 15,
    marginRight: 8,
    "@media only screen and (max-width: 415px)": {
      height: 15,
    },
  },
  //
  arrowContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    width: 20,
    maxWidth: 20,
    minWidth: 20,
    boxSizing: "border-box",
    color: colors.PURPLE(),
    cursor: "pointer",
  },
  arrowLeft: {
    paddingRight: 2,
  },
  arrowRight: {
    paddingLeft: 5,
  },
});

export default PaperTabBar;
