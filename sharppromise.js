const posts = [];
let lastUserActivityTime = null;

function createPost(post) {
    return new Promise((resolve) => {
        setTimeout(() => {
            posts.push(post);
            resolve();
        }, 1000);
    });
}

function updateLastUserActivityTime() {
    return new Promise((resolve) => {
        setTimeout(() => {
            lastUserActivityTime = new Date();
            resolve();
        }, 1000);
    });
}

function deleteLastPost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (posts.length > 0) {
                const deletedPost = posts.pop();
                resolve(deletedPost);
            } else {
                reject("ERROR: No posts available to delete");
            }
        }, 1000);
    });
}

function displayPostsAndActivity() {
    console.log("Posts Created:");
    console.log(posts);
    console.log("Last User Activity Time:", lastUserActivityTime);
}

createPost({ title: "Post One" })
    .then(updateLastUserActivityTime)
    .then(() => {
        displayPostsAndActivity();
        return createPost({ title: "Post Two" });
    })
    .then(updateLastUserActivityTime)
    .then(() => {
        displayPostsAndActivity();
        return createPost({ title: "Post Three" });
    })
    .then(updateLastUserActivityTime)
    .then(() => {
        displayPostsAndActivity();
        return deleteLastPost();
    })
    .then(() => {
        console.log("Post Deleted!");
        console.log("New Posts:");
        console.log(posts);
    })
    .catch((error) => {
        console.error(error);
    });
