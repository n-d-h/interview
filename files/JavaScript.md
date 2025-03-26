# JavaScript

### 1. Memoization là gì?

- **Memoization** là một kỹ thuật lưu trữ kết quả của các hàm gọi đệ quy để tránh việc tính toán lại các giá trị đã được tính toán trước đó.

```javascript
function memoizedAddTo256() {
  var cache = {};

  return function (num) {
    if (num in cache) {
      console.log("cached value");
      return cache[num];
    } else {
      cache[num] = num + 256;
      return cache[num];
    }
  };
}

var memoizedFunc = memoizedAddTo256();

memoizedFunc(20); // Normal return
memoizedFunc(20); // Cached return
```

---

### 2. Closure là gì?

- **Closure** là một hàm được trả về bởi một hàm khác, mà hàm này có thể truy cập tất cả các biến cục bộ của hàm cha.

```javascript
function outerFunction() {
  var outerVariable = "I am outside!";

  function innerFunction() {
    console.log(outerVariable); // Accessing outerVariable
  }

  return innerFunction;
}

var innerFunc = outerFunction();

innerFunc(); // Output: I am outside!
```

---

### 3. Callback là gì?

- **Callback** là một hàm được truyền vào một hàm khác như một tham số.

```javascript
function greeting(name) {
  alert("Hello " + name);
}

function processUserInput(callback) {
  var name = prompt("Please enter your name.");
  callback(name);
}

processUserInput(greeting);
```

---

### 4. Promise là gì?

- **Promise** là một đối tượng đại diện cho một giá trị chưa được xác định tại thời điểm viết code.
- **4 trạng thái của Promise:**
  - **Pending:** Trạng thái ban đầu, chưa thực thi hoặc trả về kết quả.
  - **Fulfilled:** Thực thi thành công.
  - **Rejected:** Thực thi thất bại.
  - **Settled:** Đã thực thi, có thể là thành công hoặc thất bại.
- Xử lý song song với **Promise.all()**

```javascript
let promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("Promise resolved!");
  }, 2000);
});

promise.then(function (value) {
  console.log(value); // Output: Promise resolved!
});
```

`Chaining Promises`

```javascript
function sumOfThreeElements(...elements) {
  return new Promise((resolve, reject) => {
    if (elements.length > 3) {
      reject("Only three elements or less are allowed");
    } else {
      let sum = 0;
      let i = 0;
      while (i < elements.length) {
        sum += elements[i];
        i++;
      }
      resolve("Sum has been calculated: " + sum);
    }
  });
}

sumOfThreeElements(1, 2, 3)
  .then((result) => {
    console.log(result);
    return sumOfThreeElements(1, 2, 3, 4);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

`Calling API using Promises`

```javascript
function fetchUsers() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

fetchUsers()
  .then((users) => console.log(users))
  .catch((error) => console.log(error));

/* 
- Nhược điểm: Callback Hell
- Lí do: Khi có nhiều hàm gọi lại lẫn nhau, code sẽ trở nên khó đọc và bảo trì.
- Ví dụ: fetchUsers().then(fetchPosts().then(fetchComments().then(...)));
=> Giải pháp: Sử dụng Async/Await
*/
async function fetchData() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let data = await response.json(); // Chuyển response thành JSON
    console.log(data);
  } catch (error) {
    console.error("Error:", error); // Bắt lỗi
  }
}

fetchData();
```

---

### 5. Async/Await là gì?

- **Async/Await** là một cú pháp mới giúp viết các hàm bất đồng bộ một cách đồng bộ.

```javascript
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  const result = await resolveAfter2Seconds();
  console.log(result);
}

asyncCall();
```

---

### 6. Spread và Rest Operator là gì?

- **Spread Operator** cho phép một biến có thể được mở rộng ra thành nhiều phần.
- **Rest Operator** cho phép một hàm có thể chấp nhận một số lượng không xác định các tham số.

```javascript
let arr = [1, 2, 3];
let arr2 = [...arr, 4, 5]; // Spread Operator
console.log(arr2); // Output: [1, 2, 3, 4, 5]

function sum(...args) {
  return args.reduce((a, b) => a + b);
}

console.log(sum(1, 2, 3, 4)); // Output: 10
```

---

### 7. Destructuring là gì?

- **Destructuring** là một cú pháp giúp trích xuất các giá trị từ các mảng hoặc đối tượng.

```javascript
let arr = [1, 2, 3, 4];
let [a, b, ...rest] = arr;
console.log(a); // Output: 1
console.log(b); // Output: 2
console.log(rest); // Output: [3, 4]

let obj = { x: 1, y: 2, z: 3 };
let { x, y, z } = obj;
console.log(x); // Output: 1
console.log(y); // Output: 2
console.log(z); // Output: 3
```

---

### 8. Arrow Function là gì?

- **Arrow Function** là một cú pháp ngắn gọn để viết hàm trong JavaScript.

```javascript
let sum = (a, b) => a + b;
console.log(sum(5, 6)); // Output: 11
```

---

### 9. Hoisting là gì?

- **Hoisting** là một cơ chế JavaScript mặc định đưa tất cả các khai báo lên đầu phạm vi hiện tại.

```javascript
console.log(x); // Output: undefined
var x = 5;
```

---

### 10. Event Bubbling và Capturing là gì?

- **Event Bubbling** là quá trình mà sự kiện được kích hoạt ở phần tử con, sau đó lan rộng lên các phần tử cha.
- **Event Capturing** là quá trình mà sự kiện được kích hoạt ở phần tử cha trước, sau đó lan rộng xuống các phần tử con.

```javascript
document.querySelector(".child").addEventListener(
  "click",
  function () {
    console.log("Child Clicked!");
  },
  false
); // Event Bubbling

document.querySelector(".parent").addEventListener(
  "click",
  function () {
    console.log("Parent Clicked!");
  },
  true
); // Event Capturing
```

---

### 11. Tham chiếu và Tham trị là gì?

- **Tham trị (Pass by Value):** Giá trị của biến được sao chép vào một biến khác.
- **Tham chiếu (Pass by Reference):** Địa chỉ của biến được sao chép vào một biến khác.

```javascript
let a = 5;
let b = a;
b = 10;
console.log(a); // Output: 5

let obj1 = { x: 5 };
let obj2 = obj1;
obj2.x = 10;
console.log(obj1.x); // Output: 10
```

---

### 12. Event Loop là gì?

- **Event Loop** là một cơ chế giúp JavaScript thực thi các tác vụ bất đồng bộ một cách đồng bộ.

```javascript
console.log("Hi");

setTimeout(function () {
  console.log("there");
}, 2000);

console.log("JavaScript");

// Output: Hi, JavaScript, there
// Vì setTimeout là một hàm bất đồng bộ, nó sẽ được thực thi sau 2 giây.
```

---

### 13. Prototype là gì?

- **Prototype** là một cơ chế mà một đối tượng có thể kế thừa các thuộc tính và phương thức từ một đối tượng khác.

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log("Hello " + this.name);
};

let person1 = new Person("Alice");
```

---

### 14. Throttling và Debouncing là gì?

- **Throttling** giúp giảm tần suất gọi hàm khi sự kiện được kích hoạt.
- **Debouncing** giúp trì hoãn việc gọi hàm cho đến khi sự kiện dừng kích hoạt.

```javascript
let count = 0;
let container = document.querySelector(".container");

function doSomething() {
  container.textContent = count++;
}

container.addEventListener("mousemove", _.throttle(doSomething, 1000));
```

---

### 15. Event Delegation là gì?

- **Event Delegation** là một cơ chế giúp tránh việc gắn nhiều sự kiện cho nhiều phần tử con.

```javascript
let list = document.querySelector(".list");

list.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    console.log("List item clicked!");
  }
});
```

---

### 16. Local Storage và Session Storage là gì?

- **Local Storage** lưu trữ dữ liệu không bị xóa sau khi trình duyệt đóng.
- **Session Storage** lưu trữ dữ liệu bị xóa sau khi trình duyệt đóng.

```javascript
localStorage.setItem("name", "Alice");
sessionStorage.setItem("name", "Alice");
```

---

### 17. Event.preventDefault() và Event.stopPropagation() là gì?

- **Event.preventDefault():** Ngăn chặn hành vi mặc định của sự kiện.
- **Event.stopPropagation():** Ngăn chặn sự kiện lan rộng đến các phần tử cha.

```javascript
document.querySelector("a").addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
});
```

---

### 18. Event.target và Event.currentTarget là gì?

- **Event.target:** Phần tử thực sự đã kích hoạt sự kiện.
- **Event.currentTarget:** Phần tử mà sự kiện được gắn vào.

```javascript
document.querySelector(".parent").addEventListener("click", function (e) {
  console.log(e.target); // Output: Phần tử con được kích hoạt
  console.log(e.currentTarget); // Output: Phần tử cha được gắn sự kiện
});
```

---

### 19. WeakMap và WeakSet là gì?

- **WeakMap:** Là một cấu trúc dữ liệu giữ các cặp key-value trong đó key phải là một object và giữ một tham chiếu yếu đến key.
- **WeakSet:** Là một cấu trúc dữ liệu giữ các giá trị duy nhất trong đó giá trị phải là một object và giữ một tham chiếu yếu đến giá trị.

```javascript
let weakMap = new WeakMap();
let key = {};
weakMap.set(key, "value");
console.log(weakMap.get(key)); // Output: value

let weakSet = new WeakSet();
let obj = { x: 1 };
weakSet.add(obj);
```

- Phân biệt **Map** và **WeakMap**:

  - **WeakMap** khá giống với **Map** nhưng có một số điểm khác biệt:
    - **Key và value:** Chỉ chấp nhận object.
    - **Weak Reference:** Tham chiếu yếu đến key.
    - **Garbage Collection:** Sẽ bị thu gom rác nếu không còn tham chiếu nào đến key.
    - **Iterate:** Không hỗ trợ phương thức iterate.
    - **Các phương thức:** Chỉ hỗ trợ `get()`, `set()`, `has()`, `delete()`.

- Phân biệt **Set** và **WeakSet**:
  - **WeakSet** khá giống với **Set** nhưng có một số điểm khác biệt:
    - **Value:** Chỉ chấp nhận object.
    - **Weak Reference:** Sẽ bị thu gom rác nếu không còn tham chiếu nào đến value.
    - **Garbage Collection:** Không ngăn chặn việc thu gom rác.
    - **Iterate:** Không hỗ trợ phương thức iterate.
    - **Các phương thức:** Chỉ hỗ trợ `add()`, `has()`, `delete()`.

### 20. ES6

```javascript
const arr = [1, 2, 3, 4];
const [first, second, third, fourth] = arr;

console.log(first); // Outputs 1
console.log(second); // Outputs 2
console.log(third); // Outputs 3
console.log(fourth); // Outputs 4
```

```javascript
const obj = { x: 1, y: 2, z: 3 };
const { x, y, z } = obj;

console.log(x); // Outputs 1
console.log(y); // Outputs 2
console.log(z); // Outputs 3
```

```javascript
const arr = [1, 2, 3, 4];
const [first, second, ...rest] = arr;

console.log(first); // Outputs 1
console.log(second); // Outputs 2
console.log(rest); // Outputs [3, 4]
```

```javascript
const obj = { x: 1, y: 2, z: 3 };
const { x, ...rest } = obj;

console.log(x); // Outputs 1
console.log(rest); // Outputs { y: 2, z: 3 }
```

```javascript
const obj1 = { x: 1, y: 2 };
const obj2 = { z: 3, ...obj1 };

console.log(obj2); // Outputs { z: 3, x: 1, y: 2 }
```

```javascript
const obj1 = { x: 1, y: 2 };
const obj2 = { z: 3, ...obj1, x: 4 };

console.log(obj2); // Outputs { z: 3, x: 1, y: 2 }
```

---

### 21. bind(), call() và apply() là gì?

- **bind():** Trả về một hàm mới với một ngữ cảnh được thiết lập cho hàm gốc.
- **call():** Gọi một hàm với một ngữ cảnh được thiết lập và các đối số được truyền theo cách dạng danh sách.
- **apply():** Gọi một hàm với một ngữ cảnh được thiết lập và các đối số được truyền theo cách dạng mảng.

```javascript
let person = {
  name: "Alice",
  greet: function () {
    console.log("Hello " + this.name);
  },
};

let greet = person.greet;
greet(); // Output: Hello undefined

let greet = person.greet.bind(person);
greet(); // Output: Hello Alice

person.greet.call(person); // Output: Hello Alice
person.greet.apply(person); // Output: Hello Alice
```
