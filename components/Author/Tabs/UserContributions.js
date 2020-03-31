import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import ReactPlaceholder from "react-placeholder";

// Components
import ComponentWrapper from "~/components/ComponentWrapper";
import PaperEntryCard from "~/components/Hubs/PaperEntryCard";
import { Reply, Comment } from "~/components/DiscussionComment";

// Config
import colors from "~/config/themes/colors";
import PaperPlaceholder from "../../Placeholders/PaperPlaceholder";

class UserContributionsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contributions: [],
    };
  }

  componentDidMount() {
    let { author } = this.props;
    this.setState({
      contributions: author.userContributions.contributions,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.author.userContributions !== prevProps.author.userContributions
    ) {
      this.setState({
        contributions: this.props.author.userContributions.contributions,
      });
    }
  }

  voteCallback = (index, paper) => {
    let contributions = [...this.state.contributions];
    contributions[index] = paper;

    this.setState({
      contributions,
    });
  };

  render() {
    let contributions = this.state.contributions.map((contribution, index) => {
      return (
        <div className={css(styles.contributionContainer)}>
          {contribution.type === "paper" ? (
            <PaperEntryCard
              paper={contribution}
              index={index}
              voteCallback={this.voteCallback}
            />
          ) : contribution.type === "comment" ? (
            <div className={css(styles.contributionContainer)}>
              <Reply data={contribution} />
            </div>
          ) : (
            <div className={css(styles.contributionContainer)}>
              <Reply data={contribution} commentId={contribution.comment} />
            </div>
          )}
        </div>
      );
    });
    return (
      <ComponentWrapper>
        <ReactPlaceholder
          ready={this.props.author.contributionsDoneFetching}
          showLoadingAnimation
          customPlaceholder={<PaperPlaceholder color="#efefef" />}
        >
          {contributions.length > 0 ? (
            <div className={css(styles.container)}>{contributions}</div>
          ) : (
            <div className={css(styles.box)}>
              <div className={css(styles.icon)}>
                <i className="fad fa-comment-alt-edit"></i>
              </div>
              <h2 className={css(styles.noContent)}>
                User has no contributions.
              </h2>
            </div>
          )}
        </ReactPlaceholder>
      </ComponentWrapper>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    boxSizing: "border-box",
  },
  contributionContainer: {
    width: "100%",
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  noContent: {
    color: colors.BLACK(1),
    fontSize: 20,
    fontWeight: 500,
    textAlign: "center",
    "@media only screen and (max-width: 415px)": {
      width: 280,
      fontSize: 16,
    },
  },
  icon: {
    fontSize: 50,
    color: colors.BLUE(1),
    height: 50,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => ({
  author: state.author,
});

export default connect(mapStateToProps)(UserContributionsTab);
