import { dbConnect } from "./dbConnect.js";

export function getAllCars(req, res) {
  // connect to db
  const db = dbConnect();
  // get all docs from cars collection
  db.collection("cars")
    .get()
    .then((collection) => {
      // reshape collection to array
      const cars = collection.docs.map((doc) => doc.data());
      // send array to response
      res.send(cars);
    })
    .catch((err) => handleError(err, res));
}

export function createCar(req, res) {
  const newCar = req.body;
  const db = dbConnect();
  db.collection("cars")
    .add(newCar)
    .then((doc) => {
      res.status(200).send({ success: true, id: doc.id });
    })
    .catch((err) => handleError(err, res));
}

export function updateCar(req, res) {
  const { id } = req.params;
  let newInfo = req.body;
  const db = dbConnect();
  db.collection("cars")
    .doc(id)
    .update(newInfo)
    .then((doc) =>
      res
        .status(200)
        .send({
          success: true,
          message: `Document ${doc.id} successfully updated`,
        })
    )
    .catch((err) => handleError(err, res));
}

function handleError(err, res) {
  console.error(err);
  res.status(500).send(err);
}
