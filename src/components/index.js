import * as React from "react";
import { data } from "../utils";
import Card from "./card";
import Form from "./form";
import Navigation from "./navigation";
import * as Swal from "sweetalert2";
import styles from "../styles/styles.module.css";
import Footer from "./footer";
export default class PersonalNotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      notes: data,
    };
    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onArchivedToggle = this.onArchivedToggle.bind(this);
    this.onPush = this.onPush.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onTitleChangeHandler(event) {
    this.setState(() => {
      return { title: event.target.value.slice(0, 50) };
    });
  }
  onArchivedToggle(id) {
    const index = data.findIndex((el) => el.id === id);
    Swal.fire({
      titleText: data[index].archived ? "Aktifkan?" : "Arsipkan?",
      icon: "warning",
      text: data[index].archived
        ? "Apakah Anda yakin untuk mengaktifkannya?"
        : "Apakah Anda yakin untuk mengarsipnya?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((results) => {
      if (results.isConfirmed) {
        data[index].archived = !data[index].archived;
        this.setState(() => {
          return { notes: data };
        });
        Swal.fire({
          text: data[index].archived
            ? "Pengarsipan Berhasil"
            : "Pengaktifan Berhasil",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }
  onDelete(id) {
    Swal.fire({
      titleText: "Hapus Catatan",
      icon: "error",
      text: "Apakah Anda yakin untuk menghapusnya?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((results) => {
      if (results.isConfirmed) {
        const index = data.findIndex((el) => el.id === id);
        data.splice(index, 1);
        this.setState(() => {
          return { notes: data };
        });
        Swal.fire({
          text: "Penghapusan Berhasil",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
      }
    });
  }
  onPush(obj) {
    this.setState(() => {
      return { notes: data.push(obj) };
    });
  }
  render() {
    return (
      <>
        <Navigation
          title={this.state.title}
          onChange={this.onTitleChangeHandler}
        />
        <Form onPush={this.onPush} />
        <main>
          <section>
            <h2>Catatan Active</h2>
            <div className={styles.card_list}>
              {data
                .filter(
                  (value) =>
                    value.title.includes(this.state.title) && !value.archived
                )
                .reverse()
                .map((val) => (
                  <Card
                    id={val.id}
                    title={val.title}
                    date={val.createdAt}
                    body={val.body}
                    archive={val.archived}
                    onArchivedToggle={this.onArchivedToggle}
                    onDelete={this.onDelete}
                  />
                ))}
            </div>
          </section>
          <section>
            <h2>Arsip</h2>
            <div className={styles.card_list}>
              {data
                .filter(
                  (value) =>
                    value.title.includes(this.state.title) && value.archived
                )
                .reverse()
                .map((val) => (
                  <Card
                    id={val.id}
                    title={val.title}
                    date={val.createdAt}
                    body={val.body}
                    archive={val.archived}
                    onArchivedToggle={this.onArchivedToggle}
                    onDelete={this.onDelete}
                  />
                ))}
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
