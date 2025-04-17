# **🔹 `async` & `await`**  

`async` và `await` là hai từ khóa quan trọng trong **lập trình bất đồng bộ** (asynchronous programming), giúp xử lý các tác vụ mất thời gian như gọi API, đọc/ghi file, truy vấn database mà không làm ứng dụng bị chặn (blocking).  

---

## **1️⃣ async & await hoạt động như thế nào?**  
- `async`: Định nghĩa một **hàm bất đồng bộ**, đảm bảo rằng hàm sẽ **trả về một Promise**.  
- `await`: Dùng để **đợi** một Promise hoàn thành trước khi tiếp tục thực thi code tiếp theo.  

💡 **Lợi ích chính:**  
✔ Code trở nên **dễ đọc hơn** so với `.then()` trong Promise.  
✔ Viết code bất đồng bộ nhưng nhìn giống như đồng bộ, dễ bảo trì hơn.  

---

## **2️⃣ Ví dụ đơn giản**  

### **👉 Không dùng `async/await` (sử dụng Promise)**
```javascript
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Dữ liệu đã tải xong!");
        }, 2000);
    });
}

fetchData().then((data) => {
    console.log(data);
});
console.log("Chương trình tiếp tục chạy...");
```
📌 **Kết quả:**  
```
Chương trình tiếp tục chạy...
Dữ liệu đã tải xong!   // Xuất hiện sau 2 giây
```
💥 **Nhược điểm:** Code khó đọc hơn khi có nhiều `.then()`, gây ra "Callback Hell".  

---

### **👉 Dùng `async/await` để đơn giản hóa**
```javascript
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Dữ liệu đã tải xong!");
        }, 2000);
    });
}

async function main() {
    console.log("Chương trình bắt đầu...");
    let data = await fetchData(); // ✅ Chờ hàm fetchData() hoàn tất
    console.log(data);
    console.log("Chương trình tiếp tục...");
}

main();
```
📌 **Kết quả:**  
```
Chương trình bắt đầu...
(Dừng lại 2 giây)
Dữ liệu đã tải xong!
Chương trình tiếp tục...
```
💡 **Lợi ích:**  
✔ Dễ đọc hơn, code giống như đồng bộ nhưng vẫn chạy bất đồng bộ.  

---

## **3️⃣ Xử lý lỗi với `try...catch`**
Khi dùng `await`, bạn có thể xử lý lỗi một cách rõ ràng bằng `try...catch`.  

```javascript
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Lỗi khi tải dữ liệu!");
        }, 2000);
    });
}

async function main() {
    try {
        let data = await fetchData();
        console.log(data);
    } catch (error) {
        console.log("❌ Đã xảy ra lỗi:", error);
    }
}

main();
```
📌 **Kết quả:**  
```
❌ Đã xảy ra lỗi: Lỗi khi tải dữ liệu!
```
💡 **Lợi ích:**  
✔ Không cần `.catch()`, dễ đọc hơn so với Promise.  

---

## **4️⃣ Dùng `Promise.all()` với `async/await`**
Khi có nhiều tác vụ bất đồng bộ, ta có thể chạy chúng song song để tăng tốc độ.  

```javascript
async function task1() {
    return new Promise((resolve) => setTimeout(() => resolve("Task 1 hoàn tất!"), 2000));
}

async function task2() {
    return new Promise((resolve) => setTimeout(() => resolve("Task 2 hoàn tất!"), 3000));
}

async function main() {
    console.log("Bắt đầu các tác vụ...");
    
    let [result1, result2] = await Promise.all([task1(), task2()]); // ✅ Chạy song song
    console.log(result1);
    console.log(result2);

    console.log("Tất cả tác vụ đã hoàn thành!");
}

main();
```
📌 **Kết quả:**  
```
Bắt đầu các tác vụ...
(Dừng lại 3 giây, vì task2 lâu hơn)
Task 1 hoàn tất!
Task 2 hoàn tất!
Tất cả tác vụ đã hoàn thành!
```
💡 **Lợi ích:**  
✔ Giảm thời gian chờ bằng cách chạy **song song**, thay vì tuần tự.  

---

## **5️⃣ Khi nào nên dùng `async/await`?**
✅ Khi làm việc với **API call** hoặc **database query** (VD: `fetch()` hoặc `axios`).  
✅ Khi cần viết **code bất đồng bộ dễ đọc hơn**.  
✅ Khi muốn **xử lý lỗi tốt hơn** với `try...catch`.  
✅ Khi muốn **chạy song song nhiều tác vụ** bằng `Promise.all()`.  

---

### **🔥 Kết luận:**  
- `async/await` giúp **viết code bất đồng bộ dễ hiểu hơn** so với Promise chaining.  
- `await` giúp **tạm dừng** một hàm async mà **không block** chương trình.  
- Có thể kết hợp `try...catch` để **xử lý lỗi** một cách gọn gàng.  
- Nếu cần chạy nhiều tác vụ song song, dùng `Promise.all()` để **tăng hiệu suất**.  

🚀 **Nên sử dụng `async/await` thay cho `.then()` nếu có thể!**