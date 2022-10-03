const express = require("express")
const {
    Server: HttpServer
} = require("http");
const {
    Server: SocketServer
} = require("socket.io")

const PORT = process.env.PORT || 8080;
const app = express();

const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

// const messages = [{
//     author: "Juan",
//     text: "¡Hola! ¿Que tal?"
// }, {
//     author: "Pedro",
//     text: "¡Muy bien! ¿Y vos?"
// }, {
//     author: "Ana",
//     text: "¡Genial!"
// }];

const messages = [];
const users = [];

// Middlewares

app.use(express.static("./public"));
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));

// Routes
app.get("/chat", (req, res) => {
    console.log(users);
    res.sendFile(__dirname + "/public/chat.html")
})

app.post("/login", (req, res) => {
    const {
        username
    } = req.body;
    if (users.find(user => user.username === username)) {
        return res.send("Username already taken");
    }
    res.redirect(`/chat?username=${username}`)

})

// Listen
httpServer.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});


// Socket Events

io.on("connection", (socket) => {
    console.log("usuario conectado");

    // Getting all messages
    socket.emit("messages", [...messages]);

    // Welcome to chat
    socket.on("join-chat", (data) => {
        const newUser = {
            id: socket.id,
            username: data.userName
        };
        users.push(newUser)
        // Bot greetings


    })



    // socket.emit("server-message", "Este es un mensaje desde el servidor!");

    // socket.on("message", (data) => {
    //     io.emit("server-message", data)
    // })

})