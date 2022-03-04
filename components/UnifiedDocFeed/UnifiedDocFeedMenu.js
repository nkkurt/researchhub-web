import { css, StyleSheet } from "aphrodite";
import { breakpoints } from "~/config/themes/screen";
import { useRouter } from "next/router";
import { filterOptions, scopeOptions } from "~/config/utils/options";
import { useState } from "react";
import DropdownButton from "~/components/Form/DropdownButton";
import colors, { pillNavColors } from "~/config/themes/colors";
import icons from "~/config/themes/icons";

const UnifiedDocFeedMenu = ({
  subFilters: { filterBy, scope },
  onDocTypeFilterSelect,
  onSubFilterSelect,
  onScopeSelect,
}) => {
  const router = useRouter();
  const [isScopeSelectOpen, setIsScopeSelectOpen] = useState(false);
  const [isFilterSelectOpen, setIsFilterSelectOpen] = useState(false);
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);

  const getTabs = () => {
    const tabs = [
      {
        value: "hot",
        label: "Trending",
        icon: icons.starAlt,
        disableScope: true,
      },
      {
        value: "most_discussed",
        label: "Discussed",
        labelLarge: "Most Discussed",
        icon: icons.commentsAlt,
      },
      {
        value: "newest",
        label: "Newest",
        icon: icons.calendar,
        disableScope: true,
      },
      {
        value: "top_rated",
        label: "Top",
        icon: icons.up,
      },
    ];

    return tabs.map((t) => {
      t.isSelected = t.value === filterBy.value;
      return t;
    });
  };

  const getTypeFilters = () => {
    const types = [
      {
        value: undefined,
        label: "All",
      },
      {
        value: "paper",
        label: "Papers",
      },
      {
        value: "posts",
        label: "Posts",
      },
      {
        value: "hypothesis",
        label: "Hypotheses",
      },
    ];

    return types.map((t) => {
      t.isSelected = t.value === router.query.type ? true : false;
      return t;
    });
  };

  const renderFilterTab = (tabObj) => {
    return (
      <div
        className={css(
          styles.tabTypePill,
          tabObj.isSelected && styles.tabTypePillSelected
        )}
        onClick={() => onSubFilterSelect(tabObj)}
      >
        <span className={css(styles.iconWrapper)}>{tabObj.icon}</span>
        <span className={css(styles.tabText)}>{tabObj.label}</span>
      </div>
    );
  };

  const renderFilterDropdownOpt = (tabObj) => {
    return (
      <div>
        <span className={css(styles.iconWrapper)}>{tabObj.icon}</span>
        <span className={css(styles.tabText)}>{tabObj.label}</span>
      </div>
    );
  };

  const tabs = getTabs();
  const types = getTypeFilters();
  const selectedType = types.find((t) => t.isSelected);
  const selectedTab = tabs.find((t) => t.isSelected);
  const filterOptsAsHtml = tabs
    .map((t) => renderFilterDropdownOpt(t))
    .map((t, i) => ({ html: t, ...tabs[i] }));
  const selectedFilterOpt = renderFilterDropdownOpt(selectedTab);
  return (
    <div className={css(styles.feedMenu)}>
      <div className={css(styles.filtersAsTabs)}>
        {tabs.map((t) => renderFilterTab(t))}
      </div>
      <div className={css(styles.filtersAsDropdown)}>
        <DropdownButton
          opts={filterOptsAsHtml}
          labelAsHtml={selectedFilterOpt}
          selected={filterBy.value}
          isOpen={isFilterSelectOpen}
          onClick={() => setIsFilterSelectOpen(true)}
          dropdownClassName="filterSelect"
          onClickOutside={() => {
            setIsFilterSelectOpen(false);
          }}
          overrideTitleStyle={styles.customTitleStyle}
          positions={["bottom", "right"]}
          customButtonClassName={[
            styles.dropdownButtonOverride,
            styles.dropdownButtonOverrideForFilter,
          ]}
          overrideDownIconStyle={styles.overrideDownIconStyle}
          onSelect={(selectedFilter) => {
            const selectedFilterObj = tabs.find(
              (t) => t.value === selectedFilter
            );
            onSubFilterSelect(selectedFilterObj);
          }}
          onClose={() => setIsFilterSelectOpen(false)}
        />
      </div>
      <div className={css(styles.timeScope)}>
        {!selectedTab.disableScope && (
          <DropdownButton
            opts={scopeOptions}
            label={scope.label}
            selected={scope.value}
            isOpen={isScopeSelectOpen}
            onClick={() => setIsScopeSelectOpen(true)}
            dropdownClassName="scopeSelect"
            onClickOutside={() => {
              setIsScopeSelectOpen(false);
            }}
            overrideTitleStyle={styles.customTitleStyle}
            positions={["bottom", "right"]}
            customButtonClassName={styles.dropdownButtonOverride}
            onSelect={(selectedScope) => {
              const obj = scopeOptions.find((s) => selectedScope === s.value);
              onScopeSelect(obj);
            }}
            onClose={() => setIsScopeSelectOpen(false)}
          />
        )}
      </div>
      <div className={css(styles.typeFilter)}>
        <DropdownButton
          opts={types}
          labelAsHtml={
            <div>
              <span className={css(styles.typeFilterText)}>
                {selectedType.label}
              </span>
              <span className={css(styles.sortIcon)}>{icons.sort}</span>
            </div>
          }
          selected={selectedType.value}
          isOpen={isTypeFilterOpen}
          onClick={() => setIsTypeFilterOpen(true)}
          dropdownClassName="scopeSelect"
          onClickOutside={() => {
            setIsTypeFilterOpen(false);
          }}
          overrideTitleStyle={styles.customTitleStyle}
          positions={["bottom", "right"]}
          customButtonClassName={[
            styles.dropdownButtonOverride,
            styles.dropdownButtonOverrideForTypeFilter,
          ]}
          overrideDownIconStyle={styles.overrideDownIconForTypeFilter}
          onSelect={(selectedType) => {
            onDocTypeFilterSelect(selectedType);
          }}
          onClose={() => setIsTypeFilterOpen(false)}
        />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  typeFilter: {
    marginLeft: "auto",
  },
  typeFilterText: {
    [`@media only screen and (max-width: 1400px)`]: {
      display: "none",
    },
  },
  overrideDownIconForTypeFilter: {
    [`@media only screen and (max-width: 1400px)`]: {
      display: "none",
    },
  },
  sortIcon: {
    marginLeft: 5,
    fontSize: 18,
    marginRight: 4,
    marginLeft: 4,
    [`@media only screen and (min-width: 1400px)`]: {
      display: "none",
    },
  },
  feedMenu: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  timeScope: {
    display: "flex",
  },
  customTitleStyle: {
    fontWeight: 400,
  },
  iconWrapper: {
    marginRight: 7,
    fontSize: 20,
    [`@media only screen and (max-width: 1400px)`]: {
      fontSize: 14,
    },
  },
  filtersAsTabs: {
    display: "flex",
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      display: "none",
    },
  },
  filtersAsDropdown: {
    display: "none",
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      display: "block",
    },
  },
  tabTypePill: {
    color: pillNavColors.primary.unfilledTextColor,
    padding: "6px 12px",
    marginRight: 8,
    textTransform: "capitalize",
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 400,
    cursor: "pointer",
    ":active": {
      cursor: "pointer",
    },
    ":hover": {
      borderRadius: 40,
      background: pillNavColors.primary.unfilledHoverBackgroundColor,
      color: pillNavColors.primary.unfilledHoverTextColor,
    },
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      fontSize: 16,
    },
    [`@media only screen and (max-width: ${breakpoints.bigDesktop.str})`]: {
      fontSize: 14,
    },
  },
  tabTypePillSelected: {
    color: pillNavColors.primary.filledTextColor,
    borderRadius: "40px",
    fontWeight: 500,
    backgroundColor: pillNavColors.primary.filledBackgroundColor,
    ":hover": {
      backgroundColor: pillNavColors.primary.filledBackgroundColor,
    },
  },
  dropdownButtonOverride: {
    whiteSpace: "nowrap",
    display: "flex",
    backgroundColor: pillNavColors.secondary.filledBackgroundColor,
    color: pillNavColors.secondary.filledTextColor,
    borderRadius: 40,
    fontWeight: 500,
    marginRight: 8,
    lineHeight: "22px",
    padding: "8px 16px 7px 16px",
    ":hover": {
      borderRadius: 40,
      backgroundColor: pillNavColors.secondary.filledBackgroundColor,
    },
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      fontSize: 16,
    },
    [`@media only screen and (max-width: ${breakpoints.bigDesktop.str})`]: {
      fontSize: 14,
    },
  },
  dropdownButtonOverrideForFilter: {
    padding: "7px 16px",
    color: pillNavColors.primary.filledTextColor,
    backgroundColor: pillNavColors.primary.filledBackgroundColor,
    ":hover": {
      borderRadius: 40,
      backgroundColor: pillNavColors.secondary.filledBackgroundColor,
    },
  },
  dropdownButtonOverrideForTypeFilter: {},
  overrideDownIconStyle: {
    padding: "6px 4px",
  },
});

export default UnifiedDocFeedMenu;
