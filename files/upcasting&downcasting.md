## 🏆 **Upcasting và Downcasting**  

**Upcasting và Downcasting** là hai kỹ thuật trong **đa hình (polymorphism)** giúp chuyển đổi giữa kiểu dữ liệu của lớp cha (`Parent`) và lớp con (`Child`). Chúng được sử dụng phổ biến trong lập trình hướng đối tượng khi làm việc với kế thừa (`inheritance`).

---

# 1️⃣ **Upcasting**
📌 **Upcasting** là khi một đối tượng của lớp con (`Child`) được gán cho một biến của lớp cha (`Parent`).  

### **📌 Cú pháp**
```java
Parent obj = new Child(); // Upcasting
```
🚀 **Tính chất của Upcasting:**
- **Luôn hợp lệ** mà không cần ép kiểu (`casting`).
- **Chỉ truy cập được các phương thức của lớp cha**, dù đối tượng thực sự là của lớp con.
- **Dùng để sử dụng tính đa hình (polymorphism)**.

---

### **🔍 Ví dụ Upcasting**
```java
class Parent {
    void show() {
        System.out.println("Parent show()");
    }
}

class Child extends Parent {
    void display() {
        System.out.println("Child display()");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent obj = new Child(); // Upcasting (hợp lệ)
        obj.show();   // ✅ Gọi được vì show() có trong Parent
        // obj.display(); ❌ Lỗi vì không thể gọi phương thức của Child từ Parent
    }
}
```

📌 **Kết quả**
```
Parent show()
```
➡ **Mặc dù `obj` thực chất là `Child`, nhưng vì kiểu của nó là `Parent`, nên chỉ gọi được phương thức trong `Parent`**.

---

# 2️⃣ **Downcasting**
📌 **Downcasting** là khi một biến kiểu lớp cha (`Parent`) được chuyển ngược lại thành lớp con (`Child`).  

### **📌 Cú pháp**
```java
Child obj = (Child) parentObj; // Downcasting (cần ép kiểu)
```
🚀 **Tính chất của Downcasting**
- **Không tự động xảy ra** → phải ép kiểu (`(Child)`) thủ công.
- **Chỉ an toàn nếu đối tượng thực sự là `Child`**, nếu không sẽ gây lỗi `ClassCastException`.
- **Giúp truy cập đầy đủ các phương thức của `Child`**.

---

### **🔍 Ví dụ Downcasting đúng**
```java
class Parent {
    void show() {
        System.out.println("Parent show()");
    }
}

class Child extends Parent {
    void display() {
        System.out.println("Child display()");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent parentObj = new Child(); // Upcasting (hợp lệ)
        Child childObj = (Child) parentObj; // Downcasting (hợp lệ vì thực sự là Child)
        childObj.display(); // ✅ Gọi được vì obj thực sự là Child
    }
}
```

📌 **Kết quả**
```
Child display()
```
➡ **Downcasting thành công vì `parentObj` thực chất là một `Child`**.

---

### **⛔ Lỗi Downcasting sai**
Nếu bạn downcast một `Parent` mà không phải `Child`, chương trình sẽ lỗi `ClassCastException` khi chạy.

```java
public class Test {
    public static void main(String[] args) {
        Parent parentObj = new Parent(); // Không phải Child
        Child childObj = (Child) parentObj; // ❌ Lỗi tại runtime
    }
}
```
📌 **Lỗi khi chạy**
```
Exception in thread "main" java.lang.ClassCastException
```
➡ **`Parent` không thể biến thành `Child` vì nó không có các đặc điểm của `Child`**.

---

# 3️⃣ **Cách tránh lỗi Downcasting**
🔹 **Sử dụng `instanceof` để kiểm tra trước khi ép kiểu**  
```java
if (parentObj instanceof Child) {
    Child childObj = (Child) parentObj;
    childObj.display();
} else {
    System.out.println("Không thể ép kiểu");
}
```
📌 **Kết quả**
```
Không thể ép kiểu
```
➡ **Tránh lỗi `ClassCastException` bằng cách kiểm tra trước**.

---

# 4️⃣ **Khi nào dùng Upcasting và Downcasting?**
|  | **Upcasting** | **Downcasting** |
|---|--------------|----------------|
| ✅ **Tính hợp lệ** | Luôn hợp lệ | Phải kiểm tra kỹ (`instanceof`) |
| ✅ **Dùng khi** | Sử dụng đa hình (`polymorphism`) | Cần truy cập phương thức riêng của `Child` |
| ✅ **Ép kiểu** | Không cần | Cần (`(Child) parentObj`) |
| ⛔ **Lỗi có thể xảy ra** | Không có lỗi | `ClassCastException` nếu ép kiểu sai |

---

## 🔥 **Tóm tắt**
| **Thuật ngữ** | **Mô tả** | **Ví dụ** |
|--------------|---------|----------|
| **Upcasting** | Gán `Child` cho `Parent` (tự động) | `Parent p = new Child();` ✅ |
| **Downcasting** | Gán `Parent` cho `Child` (cần ép kiểu) | `Child c = (Child) parentObj;` ⚠ |

📌 **Luôn kiểm tra bằng `instanceof` trước khi Downcasting để tránh lỗi**. 🚀