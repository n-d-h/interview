# **📌 Stack và Heap trong Java**  

Trong Java, bộ nhớ được chia thành hai vùng chính là **Stack** và **Heap**. Cả hai đều được quản lý bởi **JVM (Java Virtual Machine)** để lưu trữ và xử lý dữ liệu khi chương trình chạy.  

---

## **1️⃣ Stack Memory** 🏗️  
💡 **Stack (Ngăn xếp)** là vùng nhớ **LIFO (Last In, First Out)**, dùng để lưu trữ:  
✔ **Biến cục bộ (Local variables)** của phương thức.  
✔ **Tham chiếu** đến đối tượng trong Heap (nếu biến là một object).  
✔ **Call Stack** (gọi hàm, trả về giá trị).  

### **👉 Đặc điểm của Stack:**  
✅ **Nhanh** vì quản lý bộ nhớ theo thứ tự LIFO.  
✅ **Tự động giải phóng** khi phương thức kết thúc.  
✅ **Không bị rò rỉ bộ nhớ** (Memory Leak).  
❌ **Kích thước nhỏ** (phụ thuộc vào cài đặt JVM).  
❌ **StackOverflowError** nếu gọi đệ quy quá sâu.  

---

### **📌 Ví dụ về Stack Memory**  
```java
public class StackExample {
    public static void main(String[] args) {
        int x = 10;  // Biến cục bộ (nằm trong Stack)
        show(x);
    }

    static void show(int num) {
        int y = 20;  // Biến cục bộ
        System.out.println(num + y);
    }
}
```
📌 **Bộ nhớ Stack trong chương trình này:**  
```
+----------------------+
| main() x = 10       |
| show() num = 10     |
| show() y = 20       |
+----------------------+
```
🔹 Khi `show()` kết thúc, **num và y bị xóa khỏi Stack**.

---

## **2️⃣ Heap Memory** 🏛️  
💡 **Heap (Đống)** là vùng nhớ lưu trữ **đối tượng (Object)** được tạo bằng `new`.  

### **👉 Đặc điểm của Heap:**  
✅ **Kích thước lớn**, dùng để lưu trữ nhiều object.  
✅ **Có thể chia sẻ dữ liệu giữa các thread**.  
✅ **Không bị xóa khi phương thức kết thúc** (chỉ bị xóa khi không còn tham chiếu).  
❌ **Tốc độ truy xuất chậm hơn Stack**.  
❌ **Dễ gây rò rỉ bộ nhớ** nếu không giải phóng đúng cách.  

---

### **📌 Ví dụ về Heap Memory**  
```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
    }
}

public class HeapExample {
    public static void main(String[] args) {
        Person p1 = new Person("Hoàng");  // Đối tượng trong Heap
        Person p2 = new Person("Linh");   // Đối tượng trong Heap
    }
}
```
📌 **Bộ nhớ Heap trong chương trình này:**  
```
+----------------------+
| p1 -> [Person("Hoàng")]  |
| p2 -> [Person("Linh")]   |
+----------------------+
```
🔹 Các object `"Hoàng"` và `"Linh"` **tồn tại trong Heap** cho đến khi JVM thực hiện **Garbage Collection (GC)**.

---

## **3️⃣ So sánh Stack vs Heap**  

| **Đặc điểm**     | **Stack** 🏗️  | **Heap** 🏛️  |
|----------------|--------------|-------------|
| **Tốc độ**  | Nhanh (LIFO) | Chậm hơn |
| **Chứa**  | Biến cục bộ, tham chiếu | Đối tượng (Object) |
| **Thời gian tồn tại**  | Xóa khi phương thức kết thúc | Tồn tại cho đến khi GC xóa |
| **Dễ bị lỗi**  | `StackOverflowError` (đệ quy quá sâu) | Memory Leak (rò rỉ bộ nhớ) |
| **Truy cập**  | Chỉ có thể truy cập trong hàm | Có thể truy cập từ nhiều nơi |
| **Quản lý bộ nhớ** | JVM tự động giải phóng | Garbage Collector xóa |

---

## **4️⃣ Garbage Collection (GC) trong Heap**  
🔥 Heap có cơ chế **Garbage Collection (GC)** để tự động xóa object **không còn tham chiếu**.  

### **Ví dụ về GC:**
```java
class Person {
    String name;
}

public class GarbageCollectionExample {
    public static void main(String[] args) {
        Person p1 = new Person();
        p1 = null; // Không còn tham chiếu -> sẽ bị GC xóa

        new Person(); // Tạo object nhưng không có biến tham chiếu -> bị GC xóa ngay
    }
}
```
🔹 **Garbage Collector** sẽ giải phóng object **không còn ai tham chiếu**, giúp tiết kiệm bộ nhớ.

---

## **🔥 Kết luận**
| **Đặc điểm chính** | **Stack** 🏗️ | **Heap** 🏛️ |
|----------------|--------------|-------------|
| **Dùng để**  | Chứa biến cục bộ, tham chiếu | Chứa object |
| **Tốc độ**  | Rất nhanh | Chậm hơn Stack |
| **Tự động xóa** | Khi phương thức kết thúc | Khi GC dọn dẹp |
| **Dễ lỗi** | `StackOverflowError` (đệ quy) | Memory Leak nếu quên giải phóng |

💡 **👉 Quy tắc chung:**  
- Dữ liệu **nhỏ, ngắn hạn** ➝ **Stack**.  
- Dữ liệu **lớn, dài hạn** ➝ **Heap**.  

🚀 **Nắm vững Stack & Heap giúp tối ưu hiệu suất và tránh lỗi bộ nhớ trong Java!**