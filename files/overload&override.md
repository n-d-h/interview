# **Override và Overload**  

### **1️⃣ Định nghĩa**  
| **Tính chất** | **Overloading (Nạp chồng phương thức)** | **Overriding (Ghi đè phương thức)** |
|--------------|----------------------------------|----------------------------------|
| **Khái niệm** | Tạo nhiều phương thức cùng tên trong cùng một lớp nhưng khác nhau về tham số. | Định nghĩa lại phương thức của lớp cha trong lớp con để thay đổi hành vi. |
| **Phạm vi áp dụng** | Cùng một lớp. | Giữa lớp cha và lớp con (Kế thừa). |
| **Thay đổi hành vi?** | Không thay đổi hành vi gốc, chỉ mở rộng thêm cách sử dụng. | Thay đổi hành vi của phương thức trong lớp con. |
| **Tham số truyền vào** | **Bắt buộc khác nhau** về số lượng, kiểu dữ liệu, hoặc thứ tự tham số. | **Giữ nguyên** tham số và kiểu dữ liệu so với lớp cha. |
| **Kiểu trả về** | Có thể giống hoặc khác nhau. | **Phải giống hoặc là kiểu con** của kiểu trả về phương thức cha (Covariant return type). |
| **Modifier (Phạm vi truy cập)** | Không phụ thuộc vào phương thức khác. | Không được giảm mức độ truy cập của phương thức cha. |
| **Xử lý với static** | Có thể áp dụng với phương thức `static`. | Không áp dụng với phương thức `static`. |
| **Có cần kế thừa không?** | ❌ Không cần kế thừa. | ✅ Cần kế thừa (`extends`). |

---

### **2️⃣ Ví dụ về Overloading (Nạp chồng phương thức)**
- Khi chúng ta có nhiều phương thức cùng tên trong một lớp nhưng khác nhau về số lượng hoặc kiểu tham số.

```java
class MathUtils {
    // Phương thức tính tổng 2 số nguyên
    public int sum(int a, int b) {
        return a + b;
    }

    // Nạp chồng: Thêm phương thức tổng 3 số nguyên
    public int sum(int a, int b, int c) {
        return a + b + c;
    }

    // Nạp chồng: Thay đổi kiểu tham số thành double
    public double sum(double a, double b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        MathUtils math = new MathUtils();
        System.out.println(math.sum(3, 5));       // Gọi sum(int, int)
        System.out.println(math.sum(3, 5, 7));    // Gọi sum(int, int, int)
        System.out.println(math.sum(3.5, 2.5));   // Gọi sum(double, double)
    }
}
```
✅ **Kết quả:**  
```
8  
15  
6.0  
```
📌 **Lưu ý:**  
- Tên phương thức **giống nhau** nhưng **khác tham số** (kiểu dữ liệu, số lượng).
- **Không thể overload chỉ bằng cách thay đổi kiểu trả về**.

---

### **3️⃣ Ví dụ về Overriding (Ghi đè phương thức)**
- Khi lớp con muốn thay đổi hành vi của phương thức lớp cha.

```java
class Animal {
    // Phương thức trong lớp cha
    public void makeSound() {
        System.out.println("Some generic animal sound");
    }
}

class Dog extends Animal {
    // Ghi đè phương thức makeSound() của lớp cha
    @Override
    public void makeSound() {
        System.out.println("Bark! Bark!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog();
        myDog.makeSound(); // Gọi phương thức đã override
    }
}
```
✅ **Kết quả:**  
```
Bark! Bark!  
```
📌 **Lưu ý:**  
- **Phải giữ nguyên** tên phương thức, kiểu trả về (hoặc kiểu con), danh sách tham số.  
- Dùng `@Override` để tránh lỗi khi không ghi đè đúng cách.  
- **Không thể override phương thức `static`** (static method thuộc về class, không thuộc về object).

---

### **4️⃣ So sánh qua một ví dụ chung**
Nếu một lớp sử dụng **cả Overloading và Overriding**:

```java
class Parent {
    public void show() {
        System.out.println("Parent show()");
    }
    
    // Overloaded method trong cùng một class
    public void show(String msg) {
        System.out.println("Message: " + msg);
    }
}

class Child extends Parent {
    // Overriding phương thức show() của Parent
    @Override
    public void show() {
        System.out.println("Child show()");
    }
}

public class Main {
    public static void main(String[] args) {
        Parent obj1 = new Parent();
        obj1.show();               // Parent show()
        obj1.show("Hello");        // Message: Hello

        Parent obj2 = new Child();
        obj2.show();               // Child show()
    }
}
```
✅ **Kết quả:**  
```
Parent show()  
Message: Hello  
Child show()  
```
📌 **Giải thích:**  
- `show()` bị **override** trong lớp `Child`, nên khi gọi từ `obj2`, nó thực hiện phiên bản trong `Child`.  
- `show(String msg)` không bị ghi đè, vì nó chỉ có trong `Parent` và không tồn tại trong `Child`.

---

### **5️⃣ Những lưu ý quan trọng**
| **Lưu ý** | **Overloading (Nạp chồng)** | **Overriding (Ghi đè)** |
|-----------|-----------------------------|--------------------------|
| **Phải khác tham số?** | ✅ Bắt buộc. | ❌ Giữ nguyên tham số. |
| **Có cần kế thừa không?** | ❌ Không cần kế thừa. | ✅ Bắt buộc có kế thừa (`extends`). |
| **Có thể thay đổi kiểu trả về?** | ❌ Không thể chỉ thay đổi kiểu trả về. | ✅ Có thể (nếu là kiểu con - covariant). |
| **Có thể thay đổi phạm vi truy cập?** | ✅ Có thể thay đổi thoải mái. | ❌ Không thể giảm mức độ truy cập của phương thức cha. |
| **Dùng với `static` được không?** | ✅ Có thể overload `static method`. | ❌ Không thể override `static method`. |

---

### **6️⃣ Kết luận**
| **Overloading** | **Overriding** |
|----------------|----------------|
| Cùng một lớp. | Giữa lớp cha và lớp con. |
| Tên giống nhau, nhưng khác tham số. | Tên, tham số, kiểu trả về giống nhau. |
| Mở rộng cách sử dụng phương thức. | Thay đổi hành vi của phương thức cha. |
| Không liên quan đến kế thừa. | Chỉ xảy ra khi có kế thừa. |

💡 **Ghi nhớ:**  
- **Overloading = Đa hình tại thời gian biên dịch (Compile-time Polymorphism).**  
- **Overriding = Đa hình tại thời gian chạy (Runtime Polymorphism).** 🚀