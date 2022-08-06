import * as React from "react";
import styles from "../styles/styles.module.css";
export default class Navigation extends React.Component {
  render() {
    return (
      <header className={styles.nav}>
        <h1>Notes</h1>
        <input type='text' value={this.props.title} onChange={this.props.onChange} className={styles.search_bar} placeholder="Cari Judul Catatan..."/>
      </header>
    );
  }
}
