import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

const db_utenti = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "notepad",
});

app.listen(3030, () => {
  console.log(`listening on 3030`);
});

// app.get("/utenti", (req, res) => {
//   //const match = bcrypt.compare("ciao", res.json(data.password[1]));
//   //if(match) console.log("si");
//   db_utenti.query("SELECT * FROM utenti", (err, data) => {
//     if (err) return res.json(err);
//     else {
//       return res.json(data);
//     }
//   });
// });

// app.post("/utenti", async (req, res) => {
//   const salt = await bcrypt.genSalt();
//   const hashed_password = await bcrypt.hash(req.body.password, salt);
//   const q = "INSERT INTO utenti (`username`,`password`) VALUES (?)";
//   const values = [req.body.username, hashed_password];
//   db_utenti.query(q, [values], (err, data) => {
//     if (err) return res.json(err);
//     else return res.json(data);
//   });
// });

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
    "UPDATE note SET `titolo_note` = (?), `note_testo`= (?) WHERE `id_utenti` = (?)";
  const titolo_note = [req.body.titolo_note];
  const note_testo = [req.body.note_testo];
  const id_utenti = [req.body.id_utenti];
  db_utenti.query(q, [titolo_note, note_testo, id_utenti], (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});
