# 🚀 `this` & `super`  

`this` và `super` đều là từ khóa đặc biệt được sử dụng để tham chiếu đến các thành phần của lớp. Tuy nhiên, chúng có ý nghĩa và cách sử dụng khác nhau.  

---

## **1️⃣ `this` - Tham chiếu đến chính đối tượng hiện tại**
📌 **`this` dùng để:**  
✅ Tham chiếu đến **biến instance** của lớp hiện tại.  
✅ Gọi **phương thức của lớp hiện tại**.  
✅ Gọi **constructor khác trong cùng một lớp** (`this()`).  

### **🔍 Ví dụ 1: Dùng `this` để phân biệt biến instance và biến cục bộ**
```java
class Student {
    String name;

    Student(String name) {
        this.name = name; // 'this.name' là biến instance, 'name' là tham số
    }

    void display() {
        System.out.println("Name: " + this.name);
    }
}

public class Test {
    public static void main(String[] args) {
        Student s1 = new Student("Hoàng");
        s1.display(); // Output: Name: Hoàng
    }
}
```
📌 **Giải thích:**  
- `this.name = name;` → `this` giúp phân biệt giữa biến instance `name` và tham số `name`.  

---

### **🔍 Ví dụ 2: Gọi constructor khác trong cùng một lớp**
```java
class Car {
    String model;
    
    // Constructor 1
    Car() {
        this("Unknown"); // Gọi constructor khác
    }

    // Constructor 2
    Car(String model) {
        this.model = model;
    }

    void display() {
        System.out.println("Model: " + model);
    }
}

public class Test {
    public static void main(String[] args) {
        Car c1 = new Car(); // Gọi constructor mặc định
        c1.display(); // Output: Model: Unknown
    }
}
```
📌 **Giải thích:**  
- `this("Unknown")` → Gọi constructor khác trong cùng lớp (`Car(String model)`).  

---

### **🔍 Ví dụ 3: Gọi phương thức trong cùng một lớp**
```java
class Example {
    void method1() {
        System.out.println("Method 1");
        this.method2(); // Gọi method2() từ method1()
    }

    void method2() {
        System.out.println("Method 2");
    }
}

public class Test {
    public static void main(String[] args) {
        Example ex = new Example();
        ex.method1();
    }
}
```
📌 **Kết quả**
```
Method 1
Method 2
```
📌 **Giải thích:**  
- `this.method2();` gọi `method2()` trong cùng một lớp.

---

## **2️⃣ `super` - Tham chiếu đến lớp cha**
📌 **`super` dùng để:**  
✅ Tham chiếu đến **biến instance của lớp cha**.  
✅ Gọi **phương thức của lớp cha**.  
✅ Gọi **constructor của lớp cha** (`super()`).  

---

### **🔍 Ví dụ 1: Truy cập biến instance của lớp cha**
```java
class Parent {
    String name = "Parent";
}

class Child extends Parent {
    String name = "Child";

    void display() {
        System.out.println("Lớp con: " + this.name);   // Child
        System.out.println("Lớp cha: " + super.name);  // Parent
    }
}

public class Test {
    public static void main(String[] args) {
        Child obj = new Child();
        obj.display();
    }
}
```
📌 **Kết quả**
```
Lớp con: Child
Lớp cha: Parent
```
📌 **Giải thích:**  
- `this.name` → Truy cập biến `name` của `Child`.  
- `super.name` → Truy cập biến `name` của `Parent`.  

---

### **🔍 Ví dụ 2: Gọi phương thức của lớp cha**
```java
class Parent {
    void show() {
        System.out.println("Phương thức của lớp cha");
    }
}

class Child extends Parent {
    void show() {
        super.show(); // Gọi phương thức lớp cha
        System.out.println("Phương thức của lớp con");
    }
}

public class Test {
    public static void main(String[] args) {
        Child obj = new Child();
        obj.show();
    }
}
```
📌 **Kết quả**
```
Phương thức của lớp cha
Phương thức của lớp con
```
📌 **Giải thích:**  
- `super.show();` gọi `show()` của `Parent` trước khi thực hiện `show()` của `Child`.  

---

### **🔍 Ví dụ 3: Gọi constructor của lớp cha**
```java
class Parent {
    Parent() {
        System.out.println("Constructor của lớp cha");
    }
}

class Child extends Parent {
    Child() {
        super(); // Gọi constructor của lớp cha
        System.out.println("Constructor của lớp con");
    }
}

public class Test {
    public static void main(String[] args) {
        Child obj = new Child();
    }
}
```
📌 **Kết quả**
```
Constructor của lớp cha
Constructor của lớp con
```
📌 **Giải thích:**  
- `super();` gọi constructor của `Parent` trước khi thực hiện constructor của `Child`.  

---

## **3️⃣ So sánh `this` và `super`**
|  | **`this`** | **`super`** |
|---|-----------|------------|
| **Tham chiếu đến** | Chính đối tượng hiện tại | Lớp cha (superclass) |
| **Truy cập biến** | Biến instance trong cùng lớp | Biến instance của lớp cha |
| **Gọi phương thức** | Phương thức trong cùng lớp | Phương thức của lớp cha |
| **Gọi constructor** | Constructor khác trong cùng lớp (`this()`) | Constructor của lớp cha (`super()`) |
| **Khi nào sử dụng?** | Khi cần tham chiếu đến chính nó | Khi cần tham chiếu đến lớp cha |

---

## **4️⃣ Khi nào sử dụng `this` và `super`?**
✅ **Dùng `this` khi:**  
- Cần phân biệt giữa biến instance và tham số cùng tên.  
- Gọi constructor khác trong cùng lớp.  
- Gọi phương thức trong cùng lớp.  

✅ **Dùng `super` khi:**  
- Muốn truy cập phương thức hoặc biến của lớp cha đã bị ghi đè (`overriden`).  
- Gọi constructor của lớp cha (`super()`).  

---

## **🔥 Kết luận**
- `this` → Dùng để tham chiếu đến **chính đối tượng** hiện tại.  
- `super` → Dùng để tham chiếu đến **lớp cha** của đối tượng hiện tại.  
- **Trong constructor, `super()` phải là lệnh đầu tiên nếu dùng.**  
- **Luôn kiểm tra kỹ khi sử dụng `this` và `super` để tránh lỗi logic!** 🚀