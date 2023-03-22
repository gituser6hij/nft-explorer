import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a href="https://user137-portfolio.auditutils.com" target={"_self"}>
				<img
					className={styles.alchemy_logo}
					src="/user137.PNG"
				></img>
			</a>
			<ConnectButton></ConnectButton>
		</nav>
	);
}
