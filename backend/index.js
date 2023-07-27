import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config({ path: __dirname + "/config.env" });

const app = express();
app.use(cors());
app.use(express.json());

const HOST = process.env.HOST;
const USER = process.env.USER;
const DB = process.env.DB;

const db_utenti = mysql.createConnection({
  host: HOST,
  user: USER,
  database: DB,
});

app.listen(3030, () => {
  console.log(`listening on 3030`);
});

app.get("/note", (req, res) => {
  db_utenti.query(
    "SELECT * FROM note ORDER BY `ultimaModifica` DESC",
    (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    }
  );
});

app.post("/note", (req, res) => {
  const q =
    "INSERT INTO note (`id_note`,`titolo_note`,`note_testo`,`ultimaModifica`) VALUES (?)";
  const values = [
    req.body.id_note,
    req.body.titolo_note,
    req.body.note_testo,
    req.body.ultimaModifica,
  ];
  db_utenti.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

app.delete("/note/delete", (req, res) => {
  const q = "DELETE FROM note WHERE `id_note`=(?)";
  const key = req.body.id_note;
  db_utenti.query(q, key, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

app.post("/note/update", (req, res) => {
  const q =
    "UPDATE note SET `titolo_note` = (?), `note_testo`= (?), `ultimaModifica`= (?) WHERE `id_note` = (?)";
  const titolo_note = [req.body.titolo_nota];
  const note_testo = [req.body.note_testo];
  const ultimaModifica = [req.body.ultimaModifica];
  const id_note = [req.body.id_note];
  db_utenti.query(
    q,
    [titolo_note, note_testo, ultimaModifica, id_note],
    (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    }
  );
});
