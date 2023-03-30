const mongoose = require("mongoose");
const mongoURI =
  "Enter Your Mongo Database URI";
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(async function (err, data) {
      const foodCategory = await mongoose.connection.db.collection(
        "food_category"
      );
      foodCategory.find({}).toArray(function (err, catData) {
        if (err) {
           console.log(err);
           }
           else {
               global.food_items = data;
               global.foodCategory = catData;
             }
      });
    });
  } catch (err) {
    console.log("-----", err);
  }
};

module.exports = mongoDB;
