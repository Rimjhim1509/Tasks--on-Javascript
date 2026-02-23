function async1() {
    console.log("async1 start");                    // 4
    async2().then(() => {
        console.log("async1 end");                 // 6
    });
}

function async2() {
    return new Promise((resolve) => {
        resolve();
        console.log("async2");                    //5
    });
}

function* generate() {
    console.log("generate-1");                  //2
    yield;
    console.log("generate-1.2");                // 3
}

function* generate2() {
    console.log("generate-2");
    yield;
    console.log("generate-2.2");
}

console.log("script start");            // 1

setTimeout(function () {
    console.log("setTimeout");
}, 0);

const generator1 = generate();                    //2.
generator1.next();
generator1.next();

async1();

new Promise(function (resolve) {
    console.log("promise1");                      //
    resolve();
}).then(function () {
    console.log("promise2");
});

console.log("script end");

const generator2 = generate2();
generator2.next();
generator2.next();

// Here we get to know the execution order
// Synchronous code runs then ---------------> microtask(Promises...then) --------> macrotask(setTimeout)--------->resolve() schedules .then() as a microtask -------------->
// Generator code runs only when .next() is called
// script start
// generate-1
// generate-1.2
// async1 start
// async2
// promise1
// script end
// generate-2
// generate-2.2
// async1 end
// promise2
// setTimeout
