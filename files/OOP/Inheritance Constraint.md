# Ràng buộc kế thừa

Trong Java, **phương thức non-static thông thường không thể bắt buộc lớp con phải sử dụng**. Tuy nhiên, bạn có thể sử dụng một số kỹ thuật để **ép buộc** lớp con phải gọi một phương thức cụ thể từ lớp cha.

---

## **1️⃣ Dùng `final` trong phương thức**
Nếu bạn muốn **bắt buộc lớp con sử dụng phương thức của lớp cha mà không được phép override**, bạn có thể dùng `final`:

```java
abstract class Animal {
    final void eat() {
        System.out.println("Eating...");
    }
}

class Dog extends Animal {
    // Không thể override eat()
}
```

🔹 **Lớp `Dog` không thể override `eat()`, nên nó luôn phải dùng phiên bản từ `Animal`.**  
🚨 Nhưng nếu bạn không gọi `eat()` trong lớp `Dog`, nó vẫn không bị bắt buộc sử dụng.

---

## **2️⃣ Dùng `super` để ép gọi phương thức cha**
Một cách khác là **đảm bảo phương thức của lớp cha luôn được gọi** khi override bằng cách dùng `super`:

```java
abstract class Animal {
    void makeSound() {
        System.out.println("Some generic animal sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        super.makeSound();  // Bắt buộc gọi phương thức từ lớp cha
        System.out.println("Woof! Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.makeSound();
    }
}
```

🔹 **Output:**
```
Some generic animal sound
Woof! Woof!
```
👉 **Nhờ `super.makeSound()`, lớp `Dog` bị buộc phải gọi phương thức của `Animal`.**

---

## **3️⃣ Dùng Template Method Pattern**
Nếu bạn muốn lớp con **bắt buộc phải thực thi một phương thức**, nhưng không được thay đổi cấu trúc logic, bạn có thể dùng **Template Method Pattern**:

```java
abstract class Animal {
    // Template method: Gọi một chuỗi các phương thức theo trình tự
    final void live() {
        eat();
        makeSound();  // Lớp con bắt buộc phải cung cấp cách thực hiện riêng
        sleep();
    }

    private void eat() {
        System.out.println("Eating...");
    }

    abstract void makeSound();  // Lớp con phải override

    private void sleep() {
        System.out.println("Sleeping...");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Woof! Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.live();
    }
}
```

🔹 **Output:**
```
Eating...
Woof! Woof!
Sleeping...
```

👉 **Lớp `Dog` bị bắt buộc phải override `makeSound()`, nhưng trình tự `live()` không thay đổi.**

---

## **Tóm tắt**
| Cách | Mô tả | Hạn chế |
|------|------|-------|
| **`final` method** | Bắt lớp con dùng phương thức cha mà không override được | Không ép buộc gọi nó nếu không muốn |
| **`super` trong override** | Yêu cầu lớp con gọi phương thức cha khi override | Lớp con vẫn có thể quên không gọi `super` |
| **Template Method Pattern** | Bắt buộc lớp con sử dụng theo trình tự có sẵn | Mất linh hoạt, chỉ phù hợp với một số trường hợp |

💡 **Cách hiệu quả nhất:** Dùng **Template Method Pattern** khi bạn muốn lớp con **bắt buộc phải sử dụng một phương thức non-static** theo trình tự có sẵn.