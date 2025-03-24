# **🧵 Thread và Multithreading trong Java**  

### **1️⃣ Thread là gì?**
💡 **Thread (luồng)** là đơn vị nhỏ nhất của một tiến trình (process) có thể được thực thi độc lập.  
- Trong một chương trình Java, **mặc định có một thread chính** là `main thread`, do JVM tạo ra khi chương trình bắt đầu chạy.  
- Java hỗ trợ **đa luồng (Multithreading)** giúp chương trình chạy nhiều tác vụ đồng thời (**Concurrency**) để **tăng hiệu suất**.

---

### **2️⃣ Multithreading là gì?**
💡 **Multithreading** là kỹ thuật chạy **nhiều thread cùng lúc** trong một chương trình Java.  
✔ Giúp sử dụng tài nguyên CPU hiệu quả hơn.  
✔ Thích hợp cho các tác vụ như **xử lý file lớn, giao tiếp mạng, tác vụ nền...**  
✔ Được quản lý bởi **JVM và hệ điều hành**.

---

## **3️⃣ Cách tạo Thread trong Java**
📌 Có **2 cách chính** để tạo một thread trong Java:  
### **Cách 1: Kế thừa `Thread`**
```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread đang chạy: " + Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread();
        thread1.start();  // Gọi start() để chạy thread
    }
}
```
🔹 **Gọi `start()`** để chạy thread. Nếu gọi `run()` trực tiếp, thread **không chạy đa luồng**.  

---

### **Cách 2: Implement `Runnable`**
```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread đang chạy: " + Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        Thread thread2 = new Thread(new MyRunnable());
        thread2.start();
    }
}
```
✅ **Ưu điểm** của `Runnable`:  
✔ **Linh hoạt hơn** vì có thể kế thừa lớp khác.  
✔ **Tốt hơn cho lập trình đa luồng** vì dễ quản lý hơn `Thread`.

---

## **4️⃣ Một số phương thức quan trọng trong Thread**
| **Phương thức** | **Chức năng** |
|---------------|-------------|
| `start()` | Bắt đầu một thread mới. |
| `run()` | Chạy code của thread (không tự tạo thread mới nếu gọi trực tiếp). |
| `sleep(ms)` | Tạm dừng thread trong thời gian `ms`. |
| `join()` | Chờ thread kết thúc trước khi tiếp tục. |
| `yield()` | Nhường CPU cho thread khác. |
| `isAlive()` | Kiểm tra thread còn chạy không. |

### **Ví dụ `join()`**
```java
class MyThread extends Thread {
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(i + " from " + Thread.currentThread().getName());
            try { Thread.sleep(500); } catch (InterruptedException e) {}
        }
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        
        t1.start();
        t1.join(); // Chờ t1 kết thúc rồi mới chạy t2
        
        t2.start();
    }
}
```
🔹 **`join()` đảm bảo t1 chạy xong trước, rồi mới đến t2**.

---

## **5️⃣ Sự khác biệt giữa Process và Thread**
| **Process** 🏢 | **Thread** 🧵 |
|-------------|-----------|
| Là chương trình đang chạy. | Là luồng xử lý trong process. |
| Có bộ nhớ riêng biệt. | Chia sẻ bộ nhớ với các thread khác trong cùng process. |
| Chạy độc lập, nặng hơn thread. | Nhẹ, nhanh hơn process. |
| Khởi động chậm hơn. | Khởi động nhanh hơn. |

---

## **6️⃣ Đồng bộ hóa (Synchronization) trong Multithreading**
💡 **Vấn đề:** Khi nhiều thread cùng truy cập vào một tài nguyên chung (VD: cùng ghi vào một file), có thể xảy ra xung đột dữ liệu.  
🛠 **Giải pháp:** Dùng **synchronized** để giới hạn chỉ **một thread** có thể truy cập vào tài nguyên tại một thời điểm.

### **Ví dụ lỗi khi không đồng bộ hóa**
```java
class Counter {
    int count = 0;
    
    void increase() {
        count++; // Không đồng bộ, có thể sai khi nhiều thread cùng chạy
    }
}

public class Main {
    public static void main(String[] args) {
        Counter counter = new Counter();
        
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) counter.increase();
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) counter.increase();
        });

        t1.start();
        t2.start();
        
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {}

        System.out.println("Final count: " + counter.count);
    }
}
```
🔹 **Lỗi xảy ra vì hai thread cùng ghi vào `count`, làm giá trị không chính xác**.

---

### **Cách giải quyết: Dùng `synchronized`**
```java
class Counter {
    int count = 0;

    synchronized void increase() { // Đảm bảo chỉ 1 thread truy cập
        count++;
    }
}
```
✅ **Lúc này, chỉ một thread có thể gọi `increase()` tại một thời điểm**.

---

## **7️⃣ Các loại Multithreading**
🔹 **Concurrency (Đồng thời)**:  
- Chạy nhiều task xen kẽ nhau, không nhất thiết song song.  
- Dùng khi số lượng thread nhiều hơn số CPU.  

🔹 **Parallelism (Song song)**:  
- Chạy nhiều task cùng lúc trên nhiều nhân CPU.  
- Dùng khi có nhiều CPU và muốn tăng tốc xử lý.  

---

## **8️⃣ Executor Framework (Quản lý Thread)**
💡 Java cung cấp **`ExecutorService`** để quản lý thread hiệu quả.  

### **Ví dụ sử dụng Thread Pool**
```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadPoolExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        for (int i = 1; i <= 5; i++) {
            int taskId = i;
            executor.submit(() -> {
                System.out.println("Task " + taskId + " is running on " + Thread.currentThread().getName());
            });
        }
        
        executor.shutdown();
    }
}
```
🔹 **Lợi ích của Thread Pool:**  
✔ Giúp quản lý tài nguyên tốt hơn.  
✔ Tránh tạo quá nhiều thread gây overload CPU.  

---

## **🔥 Kết luận**
✅ **Thread giúp thực thi đa tác vụ trong Java, giúp tăng hiệu suất chương trình.**  
✅ **Multithreading cần quản lý chặt chẽ để tránh lỗi xung đột dữ liệu.**  
✅ **Dùng `synchronized` hoặc `ExecutorService` để kiểm soát thread tốt hơn.**  

🚀 **👉 Biết cách tối ưu Thread giúp cải thiện hiệu suất hệ thống đáng kể!**


---


# **🔥 So sánh Lập trình Đa luồng (Multithreading), Lập trình Song song (Parallel Computing) và Lập trình Bất đồng bộ (Asynchronous Programming)**  

### **1️⃣ Định nghĩa chung**
| **Khái niệm** | **Mô tả** |
|--------------|----------|
| **Multithreading** (Đa luồng) | Chạy nhiều luồng (thread) trong **cùng một tiến trình** để thực hiện nhiều tác vụ đồng thời. |
| **Parallel Computing** (Song song) | Chạy nhiều tác vụ **đồng thời trên nhiều CPU** (hoặc nhân CPU). |
| **Asynchronous Programming** (Bất đồng bộ) | Chạy tác vụ theo kiểu **non-blocking**, không cần chờ tác vụ trước hoàn thành. |

---

## **2️⃣ Sự khác biệt chi tiết giữa các khái niệm**
### **(a) Lập trình Đa luồng (Multithreading)**
✅ **Ý tưởng chính:**  
- Dùng nhiều **luồng (threads)** trong **cùng một tiến trình (process)** để xử lý các công việc một cách đồng thời.  
- **Các thread chia sẻ bộ nhớ chung**, nhưng chỉ có một thread thực sự chạy tại một thời điểm trên một CPU nếu không có CPU đa nhân.  

✅ **Ứng dụng thực tế:**  
- UI có thể phản hồi trong khi đang tải dữ liệu nền.  
- Xử lý nhiều yêu cầu HTTP cùng lúc trên một server Java.  
- Các trình phát nhạc/video có thể **vừa tải dữ liệu vừa phát nhạc/video**.  

✅ **Cách thực hiện trong Java:**
```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread đang chạy: " + Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread();
        MyThread thread2 = new MyThread();
        thread1.start();
        thread2.start();
    }
}
```
📌 **Lưu ý:** Nếu chạy trên CPU đơn nhân, hệ điều hành sẽ chuyển đổi qua lại giữa các thread để tạo cảm giác "đồng thời".

---

### **(b) Lập trình Song song (Parallel Computing)**
✅ **Ý tưởng chính:**  
- Thay vì chuyển đổi giữa các luồng như **multithreading**, **Parallel Computing** **thực sự chạy nhiều tác vụ cùng lúc trên nhiều nhân CPU (hoặc nhiều máy tính khác nhau trong hệ thống phân tán)**.  

✅ **Ứng dụng thực tế:**  
- Xử lý dữ liệu lớn (**Big Data**), như **Machine Learning** hoặc **Data Mining**.  
- Xử lý đồ họa (**Rendering Game, Video Processing**).  

✅ **Cách thực hiện trong Java (sử dụng ForkJoinPool)**
```java
import java.util.concurrent.RecursiveTask;
import java.util.concurrent.ForkJoinPool;

class SumTask extends RecursiveTask<Integer> {
    private final int[] arr;
    private final int start, end;

    SumTask(int[] arr, int start, int end) {
        this.arr = arr;
        this.start = start;
        this.end = end;
    }

    @Override
    protected Integer compute() {
        if (end - start <= 2) {
            int sum = 0;
            for (int i = start; i < end; i++) sum += arr[i];
            return sum;
        }

        int mid = (start + end) / 2;
        SumTask leftTask = new SumTask(arr, start, mid);
        SumTask rightTask = new SumTask(arr, mid, end);
        leftTask.fork();
        return rightTask.compute() + leftTask.join();
    }
}

public class ParallelExample {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8};
        ForkJoinPool pool = ForkJoinPool.commonPool();
        int result = pool.invoke(new SumTask(arr, 0, arr.length));
        System.out.println("Tổng: " + result);
    }
}
```
📌 **Điểm khác biệt:**  
- **Multithreading** có thể chạy trên 1 CPU đơn nhân.  
- **Parallel Computing** cần **nhiều CPU (hoặc nhân CPU)** để thực sự chạy đồng thời.  

---

### **(c) Lập trình Bất đồng bộ (Asynchronous Programming)**
✅ **Ý tưởng chính:**  
- Thay vì **chờ đợi** một tác vụ hoàn thành (**blocking**), nó sẽ tiếp tục chạy tác vụ khác trong khi chờ tác vụ trước hoàn thành.  
- Thường được sử dụng với **I/O-bound tasks** như **gửi request HTTP, truy vấn database, đọc ghi file**.  
- **Không tạo thêm thread** mà dùng cơ chế **callback** hoặc **Future/CompletableFuture** trong Java.  

✅ **Ứng dụng thực tế:**  
- Xử lý **request HTTP bất đồng bộ** (trong Spring Boot, Node.js).  
- **Đọc file mà không chặn UI**.  

✅ **Cách thực hiện trong Java (sử dụng CompletableFuture)**
```java
import java.util.concurrent.CompletableFuture;

public class AsyncExample {
    public static void main(String[] args) {
        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
            try {
                Thread.sleep(2000);
                System.out.println("Xử lý tác vụ...");
            } catch (InterruptedException e) {}
        });

        System.out.println("Chương trình không bị chặn!");
        future.join(); // Chờ task hoàn thành
    }
}
```
📌 **Điểm khác biệt:**  
- **Multithreading** cần tạo **nhiều thread** để xử lý.  
- **Asynchronous không cần nhiều thread**, chỉ cần **callback** để chạy tiếp khi có kết quả.

---

## **3️⃣ Tổng hợp So sánh Chi tiết**
| **Tính chất** | **Multithreading** 🧵 | **Parallel Computing** 🖥 | **Asynchronous Programming** ⏳ |
|--------------|----------------|------------------|------------------|
| **Cách chạy** | Chạy nhiều luồng trong cùng tiến trình | Chạy nhiều tiến trình trên nhiều CPU | Chạy tác vụ mà không chờ kết quả |
| **Đồng thời hay Song song?** | Đồng thời (Concurrency) | Song song (Parallelism) | Bất đồng bộ (Non-blocking) |
| **Tạo nhiều thread không?** | Có | Có | Không bắt buộc |
| **Chia sẻ bộ nhớ?** | Có (trong cùng process) | Ít hoặc không (quản lý riêng) | Không (sử dụng callback hoặc Future) |
| **Dùng khi nào?** | Xử lý nhiều tác vụ trong cùng app (VD: UI + Background Task) | Chia tác vụ lớn thành nhiều phần chạy cùng lúc trên nhiều CPU | Xử lý tác vụ không cần chờ đợi (VD: gọi API, đọc file) |

---

## **4️⃣ Kết luận**
- **Multithreading** giúp **chạy nhiều tác vụ đồng thời trong cùng một tiến trình**, hữu ích cho **các ứng dụng UI, Server xử lý nhiều request**.  
- **Parallel Computing** **chạy tác vụ song song trên nhiều CPU**, hữu ích cho **xử lý dữ liệu lớn, AI, xử lý đồ họa**.  
- **Asynchronous Programming** giúp **chạy tác vụ mà không chặn chương trình**, hữu ích cho **I/O-bound tasks như gọi API, truy vấn database**.  

🚀 **👉 Khi nào dùng cái nào?**
- 🏗 **Ứng dụng desktop hoặc mobile** 👉 Dùng **Multithreading** để tránh chặn UI.  
- 🤖 **AI, xử lý dữ liệu lớn** 👉 Dùng **Parallel Computing** để tận dụng CPU đa nhân.  
- 🌐 **Backend Web/API, Database** 👉 Dùng **Asynchronous** để tối ưu tài nguyên.  

✨ **💡 Hiểu rõ sự khác biệt sẽ giúp bạn thiết kế ứng dụng tối ưu hơn!** 🚀