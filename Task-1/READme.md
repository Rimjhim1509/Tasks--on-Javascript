
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
