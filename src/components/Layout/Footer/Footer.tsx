import Link from "next/link";
import { useRouter } from "next/router";
import ScratchImage from "components/ScratchImage";
import styles from "./Footer.module.scss";
import nav1Black from "../../../assets/images/Icon/Black/Nav 1.svg";
import nav1Green from "../../../assets/images/Icon/Green/Nav 1 - Green.svg";
import nav2Black from "../../../assets/images/Icon/Black/Nav 2.svg";
import nav2Green from "../../../assets/images/Icon/Green/Nav 2 - Green.svg";
import nav3 from "../../../assets/images/Icon/Black/Nav 3.svg";

const Footer: React.FC = () => {
  const { pathname } = useRouter();
  return (
    <footer className={styles.footer}>
      <Link href="/search">
        <a>
          <ScratchImage
            src={pathname === "/search" ? nav1Green : nav1Black}
            alt="Nav 1"
          />
        </a>
      </Link>
      <Link href="/feed">
        <a>
          <ScratchImage
            src={pathname === "/feed" ? nav2Green : nav2Black}
            alt="Nav 2"
          />
        </a>
      </Link>
      <Link href="/">
        <a>
          <ScratchImage src={nav3} alt="Nav 3" />
        </a>
      </Link>
    </footer>
  );
};

export default Footer;
