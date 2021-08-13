import { ScratchImage } from "components";
import styles from "./Header.module.scss";
import logo from "../../../assets/images/logo.svg";
import notifications from "../../../assets/images/Icon/Black/Notifications.svg";
import message from "../../../assets/images/Icon/Black/Message.svg";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <ScratchImage src={logo} alt="Logo" />
      <ScratchImage src={notifications} alt="Notifications" />
      <ScratchImage src={message} alt="Message" />
    </header>
  );
};

export default Header;
