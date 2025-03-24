# 🚀 **Bốn tính chất (OOP)**
Lập trình Hướng Đối Tượng (Object-Oriented Programming - OOP) là một mô hình lập trình dựa trên khái niệm "đối tượng" (object), trong đó dữ liệu và phương thức được đóng gói lại với nhau. OOP có **bốn tính chất chính**:

1. **Tính đóng gói (Encapsulation)**  
2. **Tính kế thừa (Inheritance)**  
3. **Tính đa hình (Polymorphism)**  
4. **Tính trừu tượng (Abstraction)**  

Chúng ta sẽ cùng tìm hiểu từng tính chất với định nghĩa và ví dụ thực tế.

---

## **1️⃣ Tính đóng gói (Encapsulation)**
### 📌 **Định nghĩa**
- Đóng gói là **che giấu thông tin**, chỉ cho phép truy cập vào dữ liệu thông qua các phương thức được cung cấp.
- Các thuộc tính (biến) của một lớp nên được đặt là **private** hoặc **protected** để tránh bị truy cập trực tiếp từ bên ngoài.

### 📍 **Ví dụ thực tế**
- Một chiếc **ATM**: Bạn chỉ có thể rút tiền bằng cách nhập mã PIN đúng và chọn số tiền, chứ không thể trực tiếp mở máy và lấy tiền ra.
- Trong một ứng dụng quản lý nhân sự, bạn **không nên cho phép truy cập trực tiếp** vào lương của nhân viên mà phải thông qua các phương thức.

### 🔍 **Ví dụ trong Java**
```java
class BankAccount {
    private double balance; // Biến này bị ẩn, chỉ truy cập thông qua phương thức

    public BankAccount(double balance) {
        this.balance = balance;
    }

    // Chỉ cho phép kiểm tra số dư thông qua phương thức getBalance()
    public double getBalance() {
        return balance;
    }

    // Chỉ có thể thay đổi số dư bằng cách sử dụng phương thức deposit()
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}
```
📌 **Giải thích**:
- Biến `balance` được khai báo là `private`, **không thể bị truy cập trực tiếp từ bên ngoài**.
- Các phương thức `getBalance()` và `deposit()` cho phép truy xuất dữ liệu một cách có kiểm soát.

---

## **2️⃣ Tính kế thừa (Inheritance)**
### 📌 **Định nghĩa**
- Kế thừa cho phép một lớp **mới (lớp con - subclass)** **kế thừa các thuộc tính và phương thức** của một lớp **có sẵn (lớp cha - superclass)**.
- Giúp **tái sử dụng mã nguồn**, giảm trùng lặp và dễ bảo trì.

### 📍 **Ví dụ thực tế**
- Một **xe hơi** là một loại **phương tiện** (vehicle), vì vậy nó có thể kế thừa thuộc tính **số bánh, động cơ...** từ lớp phương tiện.
- Một ứng dụng thương mại điện tử có lớp **User**, và từ đó có thể tạo ra **Admin, Customer**, mỗi loại người dùng có thêm các chức năng riêng.

### 🔍 **Ví dụ trong Java**
```java
// Lớp cha (Superclass)
class Vehicle {
    String brand = "Toyota"; // Thuộc tính chung

    void honk() {
        System.out.println("Beep beep!");
    }
}

// Lớp con (Subclass) kế thừa từ Vehicle
class Car extends Vehicle {
    int wheels = 4;

    void display() {
        System.out.println("Brand: " + brand); // Kế thừa từ Vehicle
        System.out.println("Wheels: " + wheels);
    }
}

public class Test {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.display();
        myCar.honk(); // Gọi phương thức từ lớp cha
    }
}
```
📌 **Giải thích**:
- `Car` kế thừa `Vehicle`, vì vậy nó có thể sử dụng thuộc tính `brand` và phương thức `honk()` mà không cần khai báo lại.

---

## **3️⃣ Tính đa hình (Polymorphism)**
### 📌 **Định nghĩa**
- **Một hành động có thể được thực hiện theo nhiều cách khác nhau**.
- Có hai loại đa hình:
  - **Đa hình biên dịch (Compile-time Polymorphism)** – Thể hiện qua **method overloading**.
  - **Đa hình runtime (Runtime Polymorphism)** – Thể hiện qua **method overriding**.

### 📍 **Ví dụ thực tế**
- Một con người có thể **nói chuyện bằng nhiều ngôn ngữ khác nhau** (tiếng Việt, tiếng Anh, tiếng Nhật…).
- Một **hình học** có thể là hình tròn, hình vuông, nhưng đều có thể tính diện tích (`area()`).

### 🔍 **Ví dụ method overloading (Compile-time Polymorphism)**
```java
class MathUtils {
    // Cùng tên phương thức nhưng khác số lượng tham số
    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}

public class Test {
    public static void main(String[] args) {
        MathUtils obj = new MathUtils();
        System.out.println(obj.add(2, 3));       // Gọi add(int, int)
        System.out.println(obj.add(2, 3, 4));   // Gọi add(int, int, int)
    }
}
```
📌 **Giải thích**:
- Hai phương thức `add()` có cùng tên nhưng khác tham số, Java sẽ biết gọi phương thức nào dựa trên số lượng đối số.

---

### 🔍 **Ví dụ method overriding (Runtime Polymorphism)**
```java
class Animal {
    void makeSound() {
        System.out.println("Some sound...");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Bark!");
    }
}

public class Test {
    public static void main(String[] args) {
        Animal myDog = new Dog();
        myDog.makeSound(); // Output: Bark!
    }
}
```
📌 **Giải thích**:
- `Dog` ghi đè (`override`) phương thức `makeSound()` của `Animal`, giúp thay đổi hành vi của phương thức khi gọi.

---

## **4️⃣ Tính trừu tượng (Abstraction)**
### 📌 **Định nghĩa**
- Trừu tượng giúp **ẩn đi những chi tiết không cần thiết** và chỉ hiển thị các chức năng quan trọng.
- Giúp tạo **bộ khung** để các lớp con thực hiện.

### 📍 **Ví dụ thực tế**
- Một **máy pha cà phê**: Người dùng chỉ cần nhấn nút để pha cà phê mà không cần biết cơ chế hoạt động bên trong.
- Trong lập trình, một `abstract class` hoặc `interface` chỉ mô tả chức năng, lớp con sẽ triển khai cụ thể.

### 🔍 **Ví dụ trong Java**
```java
abstract class Animal {
    abstract void makeSound(); // Chỉ định nghĩa, không có phần thân
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Meow!");
    }
}

public class Test {
    public static void main(String[] args) {
        Animal myCat = new Cat();
        myCat.makeSound(); // Output: Meow!
    }
}
```
📌 **Giải thích**:
- `Animal` là **abstract class**, không thể tạo đối tượng từ nó.
- `Cat` kế thừa `Animal` và **bắt buộc phải triển khai** `makeSound()`.

---

## **📌 Tổng kết**
| Tính chất | Định nghĩa | Ví dụ thực tế |
|-----------|-----------|--------------|
| **Đóng gói** | Che giấu dữ liệu, chỉ truy cập thông qua phương thức | Máy ATM, tài khoản ngân hàng |
| **Kế thừa** | Lớp con kế thừa thuộc tính & phương thức từ lớp cha | Xe hơi kế thừa từ phương tiện |
| **Đa hình** | Một hành động có thể có nhiều cách thực hiện | Một người có thể nói nhiều ngôn ngữ |
| **Trừu tượng** | Chỉ định nghĩa phương thức, không triển khai chi tiết | Máy pha cà phê, API |

🚀 **OOP giúp mã dễ quản lý, tái sử dụng, mở rộng và bảo trì!**