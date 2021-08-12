import styles from "./LoadingIndicator.module.scss";

interface LoadingIndicatorProps {
  color?: "white" | "green" | "orange";
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  color = "white",
}) => {
  return (
    <div
      aria-label="Loading Indicator"
      className={[styles["lds-ring"], styles[`lds-ring--${color}`]].join(" ")}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingIndicator;
