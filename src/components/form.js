import * as React from "react";
import styles from "../styles/styles.module.css";
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };
    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onContentChangeHandler = this.onContentChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  onTitleChangeHandler(event) {
    this.setState(() => {
      return { title: event.target.value.slice(0, 50) };
    });
  }
  onContentChangeHandler(event) {
    this.setState(() => {
      return { content: event.target.value };
    });
  }
  onSubmitHandler(event) {
    event.preventDefault();
    this.props.onPush({
      id: +new Date(),
      title: this.state.title,
      body: this.state.content,
      archived: false,
      createdAt: new Date(),
    });
  }
  render() {
    return (
      <section>
        <form onSubmit={this.onSubmitHandler} className={styles.form}>
          <h2>Buat Catatan</h2>
          <p className={styles.info}>Sisa Karakter: {50 - this.state.title.length}</p>
          <input
            type="text"
            placeholder="ini adalah judul ..."
            value={this.state.title}
            onChange={this.onTitleChangeHandler}
            required
            className={styles.search_bar}
          />
          <textarea
            placeholder="tuliskan catatanmu di sini..."
            value={this.state.content}
            onChange={this.onContentChangeHandler}
            required
          />
          <input type="submit" value="Tambah" />
        </form>
      </section>
    );
  }
}
