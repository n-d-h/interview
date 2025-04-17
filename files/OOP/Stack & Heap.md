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

---

`Heap`:

Heap là nơi lưu trữ các đối tượng Java. Khi tạo một đối tượng bằng cách sử dụng từ khóa "new", đối tượng sẽ được lưu trữ trong Heap. Vùng nhớ Heap có thể tồn tại đến khi không có tham chiếu đến đối tượng đó nữa hoặc cho đến khi chương trình kết thúc.

`Stack`:

Stack là nơi lưu trữ các biến cục bộ và các tham số của phương thức. Mỗi lần một phương thúc được gọi, một frame mới được tạo ra trên Stack để lưu trữ các biến cục bộ và tham số của phương thức đó. Khi phương trình hoàn thành, frame được loại bỏ khỏi Stack và bộ nhớ được giải phóng.

>_Note_:
> - Frame (còn được gọi là activation record hay call stack frame) là một đơn vị dữ liệu được tạo ra khi một phương thức được gọi trong chương trình Java. Mỗi frame chứa các thông tin về biến cục bộ, tham số của phương thức và các giá trị trả về.
>- Mỗi khi một phương thức được gọi, một frame mới được tạo ra trên đỉnh của Stack, các tham số của phương thức và các biến cục bộ được cấp phát trên frame này. Các giá trị được truyền vào phương thức được đưa vào frame thông qua tham số của frame.
> - Khi phương thức hoàn thành, frame được loại bỏ khỏi đỉnh của Stack và bộ nhớ được giải phóng. Các giá trị trả về của phương thức được truyền lại thông qua frame trước đó trong Stack.

Cách lưu trữ bộ nhớ trên Heap và Stack khác nhau:
Trong Heap, bộ nhớ được cấp phát động bởi JVM khi các đối tượng được tạo ra và bộ nhớ được giải phóng khi không có tham chiếu nào trỏ đến đối tượng đó nữa.

Trong Stack, bộ nhớ được cấp phát tĩnh khi một phương thức được gọi và bộ nhớ được giải phóng khi phương thức hoàn thành. 


```java
public class Example {

    private static String global1 = "Hello, world!";

    private String global2 = "Hi, world!";
    
    public static void main(String[] args) {

        String localVar = "Hello, Java!";
        Object obj = new Object();
        System.out.println(obj);

    }
}
```

Trong ví dụ trên:

- Biến toàn cục global1 được lưu trữ trên Heap, cụ thể hơn là trong vùng nhớ static memory(data segment). Khi lớp được tải vào bộ nhớ, biến toàn cục này sẽ được khởi tạo.

- Biến toàn cục global2 được lưu trữ trên Heap, nhưng lưu trữ trong vùng nhớ non-static memory, nơi lưu trữ tất các các biến thể hiện của một lớp. Nó được tạo khi mộ instance được tạo ra.

- Tham số args của phương thức main được lưu trữ trên stack vì chúng là biến cục bộ của phương thức.

- Biến cục bộ localVar được lưu trữ trên stack vì nó cũng là một biến cục bộ của phương thức.

- Đối tượng obj được khởi tạo bằng từ khóa new, do đó nó sẽ được lưu trữ trên heap và một địa chỉ tham chiếu đến đối tượng sẽ được lưu trữ trên stack.

> Note:
> - Khi phương thức "main" được gọi, frame mới được tạo ra trên Stack để lưu trữ các biến cục bộ và tham số của phương thức bao gồm localVar và tham số args. Sau đó, một đối tượng mới được tạo ra trên Heap bằng cách sử dụng từ khóa "new", và địa chỉ của đối tượng này được gán cho biến obj. khi System.out.println(obj) địa chỉ của đối tượng được in màn hình.
> - Khi phương thức "main" kết thúc, frame trên Stack được loại bỏ khỏi Stack và các biến cục bộ cùng tham số của phương thức được giải phóng khỏi bộ nhớ. Tuy nhiên, đối trượng được tạo ra trên Heap sẽ tiếp tục tồn tại cho đến khi bị bộ thu gom rác(Garbage collected) lụm :v