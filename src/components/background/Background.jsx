import styles from "./Background.module.scss";

export default function Background({ background, dimensions, children }) {
  let className = styles.customBackground;
  let style = {};

  if (typeof background === "string") {
    style = {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    };
  } else if (
    Array.isArray(background) &&
    background.length === 2 &&
    Array.isArray(dimensions) &&
    dimensions.length === 2
  ) {
    style = {
      backgroundImage: `url(${background[0]}), url(${background[1]})`,
      backgroundRepeat: "no-repeat, no-repeat",
      backgroundPosition: "center top, center bottom",
      backgroundSize: `100% ${dimensions[0]}%, 100% ${dimensions[1]}%`,
    };
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
