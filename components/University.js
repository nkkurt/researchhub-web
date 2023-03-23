import { css, StyleSheet } from "aphrodite";

const University = (props) => {
  const { university } = props || {};
  return (
    <div className={css(styles.extraInfo)}>
      <span className={css(styles.icon)}>
        {<i className="fa-solid fa-graduation-cap"></i>}
      </span>
      {buildText(university.name, university.city, university.country)}
    </div>
  );
};

function buildText(name, city, country) {
  let text = "";
  if (name) {
    text += name;
  }
  if (city) {
    text += " • " + city;
  }
  if (country) {
    text += ", " + country;
  }
  return text;
}

const styles = StyleSheet.create({
  extraInfo: {
    color: "#241F3A",
    opacity: 0.5,
    fontSize: 14,
  },
  icon: {
    marginRight: 5,
  },
});

export default University;
