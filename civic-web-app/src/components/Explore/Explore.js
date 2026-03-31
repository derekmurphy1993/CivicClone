import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Grid} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../../constants/contexts";
import { EVENT_TAGS_WITH_IMAGES } from "../../constants/eventTags";
import { getEventTagLink } from "../../helpers/eventTags";
import styles from "./Explore.module.css";

/** Allows exploring events by popular tags. */
export default function Explore() {
  const { civEvents } = useContext(AppContext);
  const isXs = useMediaQuery("(max-width:480px)");

  function getEventCountText(tag) {
    const eventCount = civEvents.tagToIds.get(tag).size;
    return `${eventCount} ` + (eventCount === 1 ? "EVENT" : "EVENTS" );
  }

  return (
    <div className={styles.explorePage}>
      <div className={styles.exploreContent}>
        <Grid container className={styles.header} justifyContent="flex-start"
          spacing={0}
        >
          <Grid item xs={12}>
            <h2 className={styles.exploreTitle}> Explore causes </h2>
          </Grid>
          <Grid container item xs={12} justifyContent="space-between"
            direction="row-reverse"
          >
            <Grid item className={styles.mapLink}>
              <Link to="/map">
                <p>Explore by map</p>
                <ChevronRightIcon />
              </Link>
            </Grid>
            <Grid item sx={{ marginRight: "auto" }}>
              <p>
                <span className={styles.filteredTagCount}>
                  { civEvents.tagsSortedByEventCount
                      .filter(tag => EVENT_TAGS_WITH_IMAGES.has(tag))
                      .length
                  }
                </span>
                {" tags sorted by trending"}
              </p>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          className={styles.exploreSpace}
          justifyContent={isXs ? "space-between" : "flex-start"}
          columnSpacing={isXs ? 0 : 5}
          rowSpacing={isXs ? 0 : 3}
        >
          {civEvents.tagsSortedByEventCount.map((tag, idx) => {
            if (EVENT_TAGS_WITH_IMAGES.has(tag)) {
              return (
                <Grid item className={styles.exploreTag} key={tag}
                  xs={12} sm={6} md={4} lg={3} xl={2}
                  sx={{
                    padding: "0",
                  }}
                >
                  <Link to={`/events?tags=${tag}`}>
                    <div className={styles.tagImageContainer}>
                      <img className={styles.tagImage} src={getEventTagLink(tag)} />
                    </div>
                    <Grid container className={styles.tagText}
                      justifyContent="space-between"
                    >
                      <Grid item xs={12}>
                        <p className={styles.tagLabel}>{ tag }</p>
                      </Grid>
                      <Grid item xs={12} className={styles.tagEventCount}>
                          <span>{ getEventCountText(tag) }</span>
                          <ChevronRightIcon />
                      </Grid>
                    </Grid>
                  </Link>
                </Grid>
              );
            }
          })}
        </Grid>
      </div>
    </div>
  );
}
