const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "This is just a Demo Blog Page Created by MrSagarBiswas. Anyone can Post here any Blog Anonymously. Node.js, Express, EJS Templating Back-End tools used to create this Project.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Quisquam velit quos sequi error, minima dolor unde inventore assumenda. Voluptatum fugiat saepe doloribus aperiam odit labore dolorem accusamus veniam vitae molestias repellendus ullam pariatur, vero explicabo tempore inventore esse, quaerat nesciunt commodi fuga dicta minima? Unde pariatur, ab hic, fugit quidem iure quaerat natus quisquam illo, repellat aperiam quae fuga. Placeat repellat quam, hic fugit commodi magni doloribus.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Connect with MongoDB
mongoose.connect("mongodb+srv://MrSagarBiswas:sagar123@cluster0.lhx35.mongodb.net/msbBlog");
const blogSchema = mongoose.Schema({
    postTitle:
    {
        type: String,
        required: true
    },
    postBody:
    {
        type: String,
        required: true
    }
});

const blog = mongoose.model("blog", blogSchema);

// Response to Home Route
app.get("/", (req, res) => {
    blog.find({}, (err, posts) => {
        if (!err) {
            res.render("home", { homeContent: homeStartingContent, posts: posts });
        }
    })
});

// Response to About Route
app.get("/about", (req, res) => {
    res.render("about");
});

// Response to Contact Route
app.get("/contact", (req, res) => {
    res.render("contact", { contactContent: contactContent });
});

// Response to Compose Route
app.get("/compose", (req, res) => {
    res.render("compose");
});

// Post from Compose
app.post("/compose", (req, res) => {
    let post = {
        postTitle: req.body.postTitle,
        postBody: req.body.postBody
    };
    blog.insertMany(post, (err) => {
        if (!err)
            console.log("Post Successfully...");
    })
    res.redirect("/");
});

// Individual Link for Each Post
app.get("/post/:postid", (req, res) => {
    // let flag = 0;
    // posts.forEach(post => {
    //     if (_.lowerCase(post.postTitle) == _.lowerCase(req.params.postid)) {
    //         res.render("post", { postTitle: post.postTitle, postBody: post.postBody })
    //         flag = 1;
    //     }
    // });
    // if (flag === 0) {
    //     res.render("page404");
    // }
    blog.findById(req.params.postid, (err, post) => {
        if (!err)
            res.render("post", { postTitle: post.postTitle, postBody: post.postBody })
        else
            res.render("page404");
    })
});

// Listen to Port 
app.listen(port = process.env.PORT || "3000", () => {
    var port = process.env.PORT || "3000";
    console.log("Server is Started on Port " + port);
});