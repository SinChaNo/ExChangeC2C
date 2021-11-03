import Link from "next/link";
import styles from "./sidebar.module.css";
export default function Sidebar() {

  return (
    <div>
      <nav className={styles.nav}>
        <ul className="nav-justified">

          <li className="nav-item">
            <Link href="/manager/list">
              <a className={"nav-link"}>거래목록</a>
            </Link>

          </li>
          <li className="nav-item">
            <Link href="/manager/mylist">
              <a className={"nav-link"}>나의목록</a>
            </Link>

          </li>
          <li className="nav-item">
            <Link href="/manager/request">
              <a className={"nav-link"} aria-current="page">거래요청</a>
            </Link>

          </li>
          <li className="nav-item">
            <Link href="/manager/schedule">
              <a className="nav-link disabled">스케쥴</a>
            </Link>

          </li>
        </ul>
      </nav>
    </div>
  );
};
