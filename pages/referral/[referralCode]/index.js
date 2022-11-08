import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { css, StyleSheet } from "aphrodite";

// Helpers
import API from "~/config/api";
import { Helpers } from "@quantfive/js-web-config";

// Components
import ComponentWrapper from "~/components/ComponentWrapper";
import CustomHead from "~/components/Head";
import GoogleLoginButton from "../../../components/GoogleLoginButton";
import Router from "next/router";
import { breakpoints } from "~/config/themes/screen";
import AuthorAvatar from "~/components/AuthorAvatar";
import colors from "~/config/themes/colors";
import icons, { MedalIcon } from "~/config/themes/icons";

const Index = ({ code, user }) => {
  useEffect(() => {
    window.localStorage.setItem("referralCode", code);
  }, []);

  const loginCallback = () => {
    Router.push("/");
  };

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.bannerContainer)}>
        <ComponentWrapper
          overrideStyle={[
            styles.componentWrapper,
            styles.componentWrapperBanner,
          ]}
        >
          <img
            className={css(styles.mainImg)}
            src={"/static/referrals/referral-main.png"}
          />
          <div className={css(styles.signinContainer)}>
            <h1 className={css(styles.title)}>
              <div className={css(styles.nameWrapper)}>
                <div className={css(styles.name)}>
                  <AuthorAvatar author={user?.author_profile} size={35} />
                </div>
                {`${user.author_profile.first_name} ${user.author_profile.last_name} has invited you to join ResearchHub`}
              </div>
            </h1>
            <p className={css(styles.text)}>
              Sign up for ResearchHub and become a part of a growing scientific
              community dedicated to accelerating science 🚀
            </p>
            <GoogleLoginButton
              customLabel={"Sign In With Google to receive 50 RSC"}
              rippleClass={styles.buttonClass}
              styles={[styles.buttonClass, styles.buttonContainer]}
              customLabelStyle={styles.customLabelStyle}
              loginCallback={loginCallback}
            />
          </div>
        </ComponentWrapper>
      </div>
      <ComponentWrapper overrideStyle={styles.componentWrapper}>
        <div className={css(styles.aboutResearchHubWrapper)}>
          <h2 className={css(styles.about)}>About ResearchHub</h2>
          <p className={css(styles.aboutDescription)}>
            We believe that by empowering scientists to independently fund,
            create, and publish academic content we can revolutionize the speed
            at which new knowledge is created and transformed into life-changing
            products.
          </p>

          <div className={css(styles.whyJoinWrapper)}>
            <div className={css(styles.reasons)}>
              <div className={css(styles.reason)}>
                <div className={css(styles.reasonIcon)}>
                  <img
                    height={30}
                    width={30}
                    src={"/static/referrals/discuss.png"}
                  />
                </div>
                <div className={css(styles.reasonText)}>
                  Discuss papers and publications with scientists and scholars
                </div>
              </div>
              <div className={css(styles.reason)}>
                <div className={css(styles.reasonIcon)}>
                  <img
                    height={30}
                    width={30}
                    src={"/static/referrals/publish.png"}
                  />
                </div>
                <div className={css(styles.reasonText)}>
                  Publish your pre-prints using our notebook feature
                </div>
              </div>
              <div className={css(styles.reason)}>
                <div className={css(styles.reasonIcon)}>
                  <img
                    height={30}
                    width={30}
                    src={"/static/referrals/reward.png"}
                  />
                </div>
                <div className={css(styles.reasonText)}>
                  Get rewarded ResearchCoin for your scientific contributions
                </div>
              </div>
              <div className={css(styles.reason)}>
                <div className={css(styles.reasonIcon, styles.reasonIconFlask)}>
                  <img height={30} src={"/static/referrals/flask.png"} />
                </div>
                <div className={css(styles.reasonText)}>
                  Create or complete scientific bounties for ResearchCoin
                </div>
              </div>
            </div>
            <div className={css(styles.video)}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/mbIdAODhcXo"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </ComponentWrapper>
      <CustomHead title="ResearchHub Referral Program" />
    </div>
  );
};

const styles = StyleSheet.create({
  whyJoinWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 50,
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      flexDirection: "column",
    },
  },
  nameWrapper: {},
  reasons: {
    maxWidth: 350,
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      maxWidth: "unset",
      marginBottom: 25,
    },
  },
  name: {
    display: "inline-flex",
    verticalAlign: "middle",
    marginRight: 15,
    marginTop: -5,
  },
  aboutResearchHubWrapper: {
    marginTop: 50,
    marginBottom: 50,
  },
  about: {
    textAlign: "left",
  },
  reason: {
    display: "flex",
    columnGap: 25,
    alignItems: "center",
    marginBottom: 25,
  },
  reasonIcon: {
    padding: "8px 10px",
    boxShadow: "0px 0px 10px 0px #00000026",
    borderRadius: "4px",
  },
  reasonIconFlask: {
    padding: "8px 15px",
  },
  reasonText: {
    fontWeight: 500,
  },
  container: {
    color: "#241F3A",
  },
  text: {
    lineHeight: 1.4,
    fontSize: 18,
    whiteSpace: "pre-wrap",
  },
  buttonClass: {
    width: "100%",
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      width: "100%",
    },
  },
  buttonContainer: {
    height: 65,
  },
  customLabelStyle: {
    fontSize: 18,
  },
  howItWorksSection: {
    marginTop: 55,
    paddingBottom: 55,
  },
  howItWorksTitle: {
    textAlign: "center",
    fontSize: 33,
    fontWeight: 500,

    // "@media only screen and (max-width: 767px)": {
    //   marginTop: 50,
    // },
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "#241F3A",
    fontWeight: 500,
    // fontSize: 33,
    flexWrap: "wrap",
    whiteSpace: "pre-wrap",
    width: "100%",
    textAlign: "center",
    padding: 0,
    margin: 0,
    marginBottom: 15,
    // "@media only screen and (min-width: 800px)": {
    //   textAlign: "left",
    //   paddingRight: 16,
    // },
    // "@media only screen and (max-width: 1149px)": {
    //   fontSize: 28,
    // },
    // "@media only screen and (max-width: 665px)": {
    //   fontSize: 25,
    // },
    // "@media only screen and (max-width: 416px)": {
    //   fontSize: 25,
    // },
    // "@media only screen and (max-width: 321px)": {
    //   fontSize: 20,
    // },
  },
  componentWrapper: {
    // "@media only screen and (min-width: 1440px)": {
    //   width: 1050,
    // },
  },
  componentWrapperBanner: {
    display: "flex",
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      flexDirection: "column",
      width: "auto",
    },
  },
  mainImg: {
    height: 320,
    paddingRight: 50,
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      height: 250,
      alignSelf: "center",
      paddingTop: 0,
      paddingRight: 0,
    },
  },
  bannerContainer: {
    background: colors.GREY_ICY_BLUE_HUE,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 50,
  },
  signinContainer: {
    borderRadius: 16,
    padding: 16,
    width: 550,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      textAlign: "center",
    },
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const fetchReferralUser = (referralCode) => {
  return fetch(API.USER({ referralCode }), API.GET_CONFIG())
    .then(Helpers.checkStatus)
    .then(Helpers.parseJSON)
    .then((res) => {
      return res.results[0];
    });
};

Index.getInitialProps = async (ctx) => {
  let { query } = ctx;
  let code = query.referralCode;

  let user = await fetchReferralUser(code);
  return { user, code, query };
};

export default connect(mapStateToProps)(Index);
