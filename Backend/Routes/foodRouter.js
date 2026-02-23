const {
  addFood,
  listFood,
  removeFood,
} = require("../Controllers/foodController.js");
const multer = require("multer"); //For image uploading

const router = require("express").Router();

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`); //With the help of this every image stored uniquely, TimeStamps added with original name whenever we upload a file
  },
});

const upload = multer({ storage: storage }); //This one is act like a middle ware to store uploaded image in the desired folder/Location

router.post("/add-food", upload.single("image"), addFood);
router.get("/food-list", listFood);
router.post("/remove-food", removeFood);

module.exports = router;
