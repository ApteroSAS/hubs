import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./MediaBrowser.scss";
import { ReactComponent as SearchIcon } from "../icons/Search.svg";
import { ReactComponent as StarIcon } from "../icons/Star.svg";
import { ReactComponent as CloseIcon } from "../icons/Close.svg";
import { ReactComponent as ArrowForwardIcon } from "../icons/ArrowForward.svg";
import { ReactComponent as ArrowBackIcon } from "../icons/ArrowBack.svg";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";
import { TextInputField } from "../input/TextInputField";
import { IconButton } from "../input/IconButton";
import { FullscreenLayout } from "../layout/FullscreenLayout";
import { Button } from "../input/Button";
import { Column } from "../layout/Column";
import { MediaGrid } from "./MediaGrid";
import { createAvatarCustomTileV2 } from "../../aptero/util/media-tiles-lib";

const navTitleMessages = defineMessages({
  youtube: { id: "media-browser.nav_title.youtube", defaultMessage: "YouTube" },
  videos: { id: "media-browser.nav_title.videos", defaultMessage: "Videos" },
  images: { id: "media-browser.nav_title.images", defaultMessage: "Images" },
  gifs: { id: "media-browser.nav_title.gifs", defaultMessage: "GIFs" },
  scenes: { id: "media-browser.nav_title.scenes", defaultMessage: "Scenes" },
  avatars: { id: "media-browser.nav_title.avatars", defaultMessage: "Avatars" },
  sketchfab: { id: "media-browser.nav_title.sketchfab", defaultMessage: "Sketchfab" },
  poly: { id: "media-browser.nav_title.poly", defaultMessage: "Google Poly" },
  twitch: { id: "media-browser.nav_title.twitch", defaultMessage: "Twitch" },
  objects: { id: "media-browser.nav_title.objects", defaultMessage: "Objects" },
  videos360: { id: "media-browser.nav_title.videos360", defaultMessage: "Videos 360" },
  videos2d: { id: "media-browser.nav_title.videos2d", defaultMessage: "Videos" },
});

export function MediaBrowser({
  banner,
  onClose,
  browserRef,
  searchInputRef,
  autoFocusSearch,
  searchPlaceholder,
  searchDescription,
  onSearchKeyDown,
  onClearSearch,
  mediaSources,
  selectedSource,
  onSelectSource,
  activeFilter,
  facets,
  onSelectFacet,
  query,
  onChangeQuery,
  headerRight,
  hasNext,
  hasPrevious,
  onNextPage,
  onPreviousPage,
  noResultsMessage,
  children
}) {
  const intl = useIntl();

  return (
    <FullscreenLayout
      headerLeft={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      headerCenter={
        <>
          {selectedSource === "favorites" ? (
            <>
              <StarIcon className={styles.favoriteIcon} />
              <h3>
                <FormattedMessage id="media-browser.favorites-header" defaultMessage="Favorite Rooms" />
              </h3>
            </>
          ) : (
            <TextInputField
              value={query}
              onChange={onChangeQuery}
              autoFocus={autoFocusSearch}
              ref={searchInputRef}
              placeholder={searchPlaceholder}
              onKeyDown={onSearchKeyDown}
              beforeInput={<SearchIcon />}
              afterInput={
                <IconButton onClick={onClearSearch}>
                  <CloseIcon height={16} width={16} />
                </IconButton>
              }
              description={searchDescription}
            />
          )}
        </>
      }
      headerRight={headerRight}
    >
      {mediaSources && (
        <div className={styles.buttonNav}>
          {mediaSources.map(source => (
            <Button
              sm
              key={source}
              preset={selectedSource === source ? "blue" : "transparent"}
              onClick={() => onSelectSource(source)}
            >
              {intl.formatMessage(navTitleMessages[source])}
            </Button>
          ))}
        </div>
      )}
      {facets && (
        <div className={classNames(styles.buttonNav, styles.facetsNav)}>
          {facets.map((facet, i) => (
            <Button
              sm
              key={i}
              preset={activeFilter === facet.params.filter ? "blue" : "transparent"}
              onClick={() => onSelectFacet(facet)}
            >
              {facet.text}
            </Button>
          ))}
        </div>
      )}
      <div className={styles.content}>
        {banner()}
        <Column grow ref={browserRef}>
          {children ? (
            <MediaGrid
              isVariableWidth={selectedSource === "gifs" || selectedSource === "images"}
              sm={selectedSource === "avatars"}
            >
              {children}
            </MediaGrid>
          ) : (
            <div className={styles.noResults}>{noResultsMessage}</div>
          )}
          {(hasNext || hasPrevious) && (
            <div className={styles.pager}>
              <button type="button" className={styles.pagerButton} disabled={!hasPrevious} onClick={onPreviousPage}>
                <ArrowBackIcon />
              </button>
              <button type="button" className={styles.pagerButton} disabled={!hasNext} onClick={onNextPage}>
                <ArrowForwardIcon />
              </button>
            </div>
          )}
        </Column>
      </div>
    </FullscreenLayout>
  );
}

MediaBrowser.propTypes = {
  onClose: PropTypes.func,
  banner: PropTypes.func,
  browserRef: PropTypes.any,
  searchInputRef: PropTypes.any,
  autoFocusSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  searchDescription: PropTypes.node,
  onSearchKeyDown: PropTypes.func,
  onClearSearch: PropTypes.func,
  mediaSources: PropTypes.array,
  selectedSource: PropTypes.string,
  onSelectSource: PropTypes.func,
  activeFilter: PropTypes.string,
  facets: PropTypes.array,
  onSelectFacet: PropTypes.func,
  query: PropTypes.string,
  onChangeQuery: PropTypes.func,
  headerRight: PropTypes.node,
  hasNext: PropTypes.bool,
  hasPrevious: PropTypes.bool,
  onNextPage: PropTypes.func,
  onPreviousPage: PropTypes.func,
  noResultsMessage: PropTypes.node,
  children: PropTypes.node
};

MediaBrowser.defaultProps = {
  noResultsMessage: "No Results"
};
