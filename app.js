const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is just a Demo Blog Page Created by MrSagarBiswas. Anyone can Post here any Blog Anonymously. Node.js, Express, EJS Templating Back-End tools used to create this Project.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Quisquam velit quos sequi error, minima dolor unde inventore assumenda. Voluptatum fugiat saepe doloribus aperiam odit labore dolorem accusamus veniam vitae molestias repellendus ullam pariatur, vero explicabo tempore inventore esse, quaerat nesciunt commodi fuga dicta minima? Unde pariatur, ab hic, fugit quidem iure quaerat natus quisquam illo, repellat aperiam quae fuga. Placeat repellat quam, hic fugit commodi magni doloribus.";

const posts = [{
    postTitle: "How to Create a Blog?",
    postBody: "To Create a Blog just go to Compose section from navbar. Then Write your Blog Title and Blog Body. Then Click on Publish. You will be redirected to Home Page where Your Blog would be published. Thank You. -By MrSagarBiswas"
},
{
    postTitle: "What is Web Development!",
    postBody: 'Web development is the work involved in developing a website for the Internet (World Wide Web) or an intranet (a private network). Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. A more comprehensive list of tasks to which Web development commonly refers, may include Web engineering, Web design, Web content development, client liaison, client-side/server-side scripting, Web server and network security configuration, and e-commerce development.     Among Web professionals, "Web development" usually refers to the main non-design aspects of building Web sites: writing markup and coding. Web development may use content management systems (CMS) to make content changes easier and available with basic technical skills.     For larger organizations and businesses, Web development teams can consist of hundreds of people (Web developers) and follow standard methods like Agile methodologies while developing Web sites. Smaller organizations may only require a single permanent or contracting developer, or secondary assignment to related job positions such as a graphic designer or information systems technician. Web development may be a collaborative effort between departments rather than the domain of a designated department. There are three kinds of Web developer specialization: front-end developer, back-end developer, and full-stack developer. Front-end developers are responsible for behavior and visuals that run in the user browser, while back-end developers deal with the servers.'
},
{
    postTitle: "Data science",
    postBody: 'Data science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from noisy, structured and unstructured data, and apply knowledge and actionable insights from data across a broad range of application domains. Data science is related to data mining, machine learning and big data. Data science is a "concept to unify statistics, data analysis, informatics, and their related methods" in order to "understand and analyze actual phenomena" with data. It uses techniques and theories drawn from many fields within the context of mathematics, statistics, computer science, information science, and domain knowledge. However, data science is different from computer science and information science. Turing Award winner Jim Gray imagined data science as a "fourth paradigm" of science (empirical, theoretical, computational, and now data-driven) and asserted that "everything about science is changing because of the impact of information technology" and the data deluge. A data scientist is someone who creates programming code, and combines it with statistical knowledge to create insights from data.'
},
{
    postTitle: "What is Blog?",
    postBody: "A blog is a discussion or informational website published on the World Wide Web consisting of discrete, often informal diary-style text entries. Posts are typically displayed in reverse chronological order, so that the most recent post appears first, at the top of the web page."
}
];

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
    posts.push({
        postTitle: req.body.postTitle,
        postBody: req.body.postBody
    });
    res.redirect("/");
});

// Individual Link for Each Post

app.get("/post/:postid", (req, res) => {
    let flag = 0;
    posts.forEach(post => {
        if (_.lowerCase(post.postTitle) == _.lowerCase(req.params.postid)) {
            res.render("post", { postTitle: post.postTitle, postBody: post.postBody })
            flag = 1;
        }
    });
    if (flag === 0) {
        res.render("page404");
    }
});

// Listen to Port 

app.listen(port = process.env.PORT || "3000", () => {
    var port = process.env.PORT || "3000";
    console.log("Server is Started on Port " + port);
});