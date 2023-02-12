const express  = require("express");
const app = express();
const BodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const url = `mongodb+srv://test:root@cluster0.bhlqwzf.mongodb.net/API?retryWrites=true&w=majority`;

// middlewares
app.use(cors());
app.use(express.json());
app.use(BodyParser.urlencoded({extended: true}));

// connection with db
mongoose.connect(url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("connection!");
}).catch((err) => {
    console.log("No connection!");
})

// Schema
const dataSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    discount: {
        type: String,
        require: true
    },
    feature: {
        type: Boolean,
        require: true
    },
    Product_id: {
        type: Number,
        require: true
    },
    Product_name: {
        type: String,
        require: true
    },
    Product_rating: {
        type: Number,
        require: true
    },
    Product_price: {
        type: String,
        require: true
    }
})

const myData = new mongoose.model("MyData", dataSchema);

app.post("/insert", async (req, res) => {
    try{
        const data = await myData(req.body); 
        res.status(201).send(data);
        data.save();  
    }catch(err){
        res.send(err)
    }
});

app.get("/data", async (req, res) => {
    try{
        const getData = await myData.find(req.query);
        res.status(200).send(getData);
    }catch(err){
        console.log(err);
    }
})




// Listening the server
app.listen(port, () => {
    console.log(`Server is started at:${port}`);
})