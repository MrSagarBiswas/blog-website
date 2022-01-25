const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus tempore placeat nostrum quaerat vero repellendus veniam perferendis! Pariatur culpa commodi harum aspernatur iusto quo accusantium suscipit voluptas unde fugiat molestias at, quam sapiente, ipsa nemo fugit ipsum minus exercitationem omnis voluptates provident repellat velit rerum? Reiciendis adipisci porro odio in! Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci.";

const aboutContent = "At id, nisi dolorum dicta maiores repellendus. Labore provident voluptates omnis, eum, earum harum repudiandae reiciendis, delectus facere dolores similique hic sequi totam? Quis asperiores maiores consectetur veritatis soluta nostrum placeat explicabo perferendis pariatur suscipit, modi debitis saepe laboriosam itaque eius! Ab accusamus laborum exercitationem consequatur aut ut velit illum. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Quisquam velit quos sequi error, minima dolor unde inventore assumenda. Voluptatum fugiat saepe doloribus aperiam odit labore dolorem accusamus veniam vitae molestias repellendus ullam pariatur, vero explicabo tempore inventore esse, quaerat nesciunt commodi fuga dicta minima? Unde pariatur, ab hic, fugit quidem iure quaerat natus quisquam illo, repellat aperiam quae fuga. Placeat repellat quam, hic fugit commodi magni doloribus.";

const posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Response to Home Route

app.get("/", (req, res) => {
    res.render("home", { homeContent: homeStartingContent, posts: posts });
});

// Response to About Route

app.get("/about", (req, res) => {
    res.render("about", { aboutContent: aboutContent });
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
    posts.push({
        postTitle: req.body.postTitle,
        postBody: req.body.postBody
    });
    res.redirect("/");
});

// Individual Link for Each Post

app.get("/post/:postid", (req, res) => {
    posts.forEach(post => {
        if (_.lowerCase(post.postTitle) == _.lowerCase(req.params.postid)) {
            res.render("post", { postTitle: post.postTitle, postBody: post.postBody })
        }
    });
    //res.render("page404")
});

// Listen to Port 

app.listen(port = process.env.PORT || "3000", () => {
    var port = process.env.PORT || "3000";
    console.log("Server is Started on Port " + port);
});