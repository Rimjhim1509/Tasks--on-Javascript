# JavaScript Event Loop – Asynchronous Execution Explained

JavaScript is a **single-threaded language**, meaning it has **one call stack** and can execute only **one piece of code at a time**.  
Yet, it handles **asynchronous operations** (timers, network requests, DOM events) without freezing the program.

This happens because of the **Event Loop**, a core part of the JavaScript runtime:
- **Browser** → V8 + Web APIs
- **Node.js** → V8 + libuv

The Event Loop enables **non-blocking I/O**, making JavaScript feel *concurrent* even though it’s single-threaded.

---

## 1. Key Components of the Event Loop

### 🔹 Call Stack
- **LIFO (Last In, First Out)**
- Executes **synchronous code**
- Functions are pushed when called and popped when returned
- Event Loop works **only when stack is empty**

---

### 🔹 Web APIs / Host Environment
Provided by:
- **Browser**: `setTimeout`, `fetch`, DOM events
- **Node.js**: `fs.readFile`, timers, networking

Async operations are handled **outside the JS engine** here.

---

### 🔹 Callback Queue (Macrotask Queue)
- **FIFO (First In, First Out)**
- Contains callbacks from:
  - `setTimeout`
  - `setInterval`
  - I/O
  - DOM events
- Also called **macrotasks**

---

### 🔹 Microtask Queue (Higher Priority)
- Executed **before macrotasks**
- Contains:
  - `Promise.then / catch / finally`
  - `queueMicrotask`
  - `MutationObserver`

---

### 🔹 Render Queue (Browser Only)
- Handles:
  - Repaint
  - Reflow
- Checked **after microtasks, before next macrotask**
---

## 2. How the Event Loop Works (Algorithm)

The Event Loop runs continuously:

1. **Check Call Stack**
   - If not empty → wait
2. **Drain Microtask Queue**
   - Run ALL microtasks
   - Newly added microtasks run immediately
3. **Execute One Macrotask**
   - Take one callback from Callback Queue
4. **Render Phase (Browser)**
   - Update UI if needed
5. **Repeat**

### ⚠️ Important Rules
- Event Loop runs **only when stack is empty**
- **Synchronous code blocks everything**
- **Microtasks can starve macrotasks**

---

## 3. Event Loop Phases (Node.js Perspective)

1. **Timers Phase**
   - `setTimeout`, `setInterval`
2. **Pending Callbacks**
   - I/O error callbacks
3. **Idle / Prepare**
   - Internal use
4. **Poll Phase**
   - Executes I/O callbacks
5. **Check Phase**
   - `setImmediate`
6. **Close Callbacks**
   - Cleanup (e.g., socket close)

🔁 **Microtasks run after every phase**

> Browsers don’t expose these phases explicitly, but behavior is conceptually similar.

---

## 4. Practical Examples

### ✅ Example 1: `setTimeout` (Macrotask)

```js
console.log('1. Start');

setTimeout(() => {
  console.log('3. Timeout callback');
}, 0);

console.log('2. End');
