import { format } from "date-fns";
import styles from "../styles/styles.module.css";
export default function Card({
  title,
  date,
  body,
  id,
  archive,
  onArchivedToggle,
  onDelete,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.card_content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>{format(date, "eeee, dd MMMM yyyy")}</p>
        <p className="content`">{body}</p>
      </div>
      <div className={styles.card_action}>
        <button className={styles.red} onClick={() => onDelete(id)}>
          Hapus
        </button>
        <button className={styles.yellow} onClick={() => onArchivedToggle(id)}>
          {archive ? "Pindahkan" : "Arsipkan"}
        </button>
      </div>
    </div>
  );
}
