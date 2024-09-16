const express = require("express");
const app = express();
app.use(express.json());

const reviews = [
    { 'id': 1, 'content': 'Great product!', 'userId': 1 },
    { 'id': 2, 'content': 'Not bad, could be better.', 'userId': 2 }
];

const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
]

async function getAllReviews() {
    return reviews;
}

async function getReviewById(id) {
    return reviews.find((review) => review.id === id);
}

async function addReview(review) {
    const newReview = { id: reviews.length + 1, ...review };
    reviews.push(newReview);
    return newReview;
}

async function getUserById(id){
    return users.find((user) => user.id === id);
}

async function addUser(user){
    const newUser = {id: users.length + 1, ...user};
    users.push(newUser);
    return newUser;
}

app.get("/reviews", async (req, res) => {
    res.status(200).json(await getAllReviews());
})

app.get("/reviews/details/:id", async (req, res) => {
    const id = Number(req.params.id);
    const review = await getReviewById(id)
    if(!review) res.status(404).send("Review not found.")
    res.status(200).json(await getReviewById(id));
})

app.post("/reviews/new", async (req, res) => {
    const newReview = req.body;
    res.status(201).json(await addReview(newReview));
});

app.get("/users/details/:id", async (req,res) => {
    const id = Number(req.params.id);
    const user = await getUserById(id);
    if(!user) res.status(404).send("User not found.")
    res.status(200).json(await getUserById(id));
});

app.post("/users/new", async (req,res) => {
    const newUser = req.body;
    res.status(201).json(await addUser(newUser))
});

module.exports = {
    app,
    getAllReviews,
    getReviewById,
    addReview,
    getUserById,
    addUser
}

