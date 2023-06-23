import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';
export default function Nav() {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="index">Home</Link>
        </li>
        <li>
          <Link href="authors">Authors</Link>
        </li>
        <li>
          <Link href="authorSearch">Author Search</Link>
        </li>
        <li>
          <Link href="topics">Topics</Link>
        </li>
        {/* <li>
          <Link href={{ pathname: 'windTurbine', query: { windfarm: '' } }}>Topics</Link>
        </li> */}
        <li>
          <Link href="publications">Publications</Link>
        </li>
        <li>
          <Link href="journals">Journals</Link>
        </li>
        <li>
          <Link href="admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}
