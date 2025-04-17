# **So sánh Interface và Abstract Class trong Java**  

| **Tiêu chí**           | **Interface** | **Abstract Class** |
|-----------------------|--------------|--------------------|
| **Mục đích**         | Cung cấp **hợp đồng** (contract) cho các lớp triển khai. | Là một lớp cơ sở trừu tượng để các lớp con kế thừa. |
| **Từ khóa**          | `interface` | `abstract class` |
| **Phương thức**      | Mặc định là `public abstract` (trước Java 8). | Có thể có cả **phương thức abstract** và **phương thức có thân**. |
| **Thuộc tính (fields)** | Chỉ có `public static final` (hằng số). | Có thể có biến instance (non-static) và hằng số. |
| **Trình triển khai (Implementation)** | Các lớp **phải implement tất cả** phương thức abstract hoặc đánh dấu là abstract. | Lớp con có thể kế thừa và **có thể override** hoặc không. |
| **Kế thừa (extends, implements)** | Một lớp có thể **implement nhiều interface** (đa kế thừa kiểu interface). | Một lớp **chỉ có thể kế thừa một abstract class** (hỗ trợ đơn kế thừa). |
| **Constructor** | ❌ Không có constructor. | ✅ Có thể có constructor. |
| **Modifier của phương thức** | Mặc định `public`, không thể `private` hoặc `protected`. | Có thể là `public`, `protected`, `private`. |
| **Hỗ trợ static method?** | ✅ (Từ Java 8). | ✅ Có thể có phương thức `static`. |
| **Hỗ trợ default method?** | ✅ (Từ Java 8) với `default` keyword. | ❌ Không có `default` method. |
| **Khi nào sử dụng?** | Khi cần đảm bảo rằng các lớp thực thi **phải tuân theo một hợp đồng nhất định**. | Khi muốn chia sẻ **hành vi chung** giữa các lớp con nhưng vẫn giữ khả năng mở rộng. |

---

## **Ví dụ về Interface**
📌 **Tình huống:** Một con chim có thể bay (`fly()`), một chiếc máy bay cũng có thể bay. Nhưng chúng bay theo cách khác nhau, vì thế ta dùng **interface**.

```java
// Định nghĩa Interface
interface Flyable {
    void fly();  // Phương thức abstract (không có thân)
}

// Lớp Bird triển khai (implements) interface Flyable
class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("Bird flaps its wings to fly.");
    }
}

// Lớp Plane triển khai interface Flyable
class Plane implements Flyable {
    @Override
    public void fly() {
        System.out.println("Plane uses engines to fly.");
    }
}

public class Main {
    public static void main(String[] args) {
        Flyable bird = new Bird();
        Flyable plane = new Plane();
        
        bird.fly();  // Bird flaps its wings to fly.
        plane.fly(); // Plane uses engines to fly.
    }
}
```
✅ **Kết quả:**  
```
Bird flaps its wings to fly.  
Plane uses engines to fly.  
```
📌 **Ghi nhớ:**  
- Lớp `Bird` và `Plane` **buộc phải triển khai** phương thức `fly()`.  
- Interface giúp **tạo hợp đồng** giữa các lớp khác nhau nhưng có chung đặc điểm.  

---

## **Ví dụ về Abstract Class**
📌 **Tình huống:** Một con chó, một con mèo đều có chung hành vi **ăn (eat)**, nhưng chúng **kêu (makeSound)** khác nhau.  

```java
// Định nghĩa abstract class
abstract class Animal {
    // Phương thức có thân
    public void eat() {
        System.out.println("This animal is eating...");
    }

    // Phương thức abstract (không có thân)
    abstract void makeSound();
}

// Lớp Dog kế thừa (extends) từ Animal
class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog says: Woof! Woof!");
    }
}

// Lớp Cat kế thừa từ Animal
class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Cat says: Meow! Meow!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog();
        Animal myCat = new Cat();
        
        myDog.eat();      // This animal is eating...
        myDog.makeSound(); // Dog says: Woof! Woof!
        
        myCat.eat();      // This animal is eating...
        myCat.makeSound(); // Cat says: Meow! Meow!
    }
}
```
✅ **Kết quả:**  
```
This animal is eating...  
Dog says: Woof! Woof!  
This animal is eating...  
Cat says: Meow! Meow!  
```
📌 **Ghi nhớ:**  
- `Animal` chứa phương thức chung `eat()` (có thân).  
- `makeSound()` được **bắt buộc override** trong lớp con.  
- Lớp `Dog` và `Cat` **kế thừa hành vi chung** từ `Animal`, nhưng vẫn có thể **thay đổi hành vi riêng**.

---

## **Khi nào dùng Interface và Abstract Class?**
| **Tình huống** | **Dùng Interface** | **Dùng Abstract Class** |
|---------------|------------------|------------------|
| Khi cần tạo một hợp đồng (contract) mà nhiều lớp phải tuân theo. | ✅ | ❌ |
| Khi cần chia sẻ logic chung nhưng vẫn hỗ trợ đa hình. | ❌ | ✅ |
| Khi muốn sử dụng đa kế thừa. | ✅ | ❌ (chỉ hỗ trợ đơn kế thừa) |
| Khi không cần quản lý trạng thái hoặc biến instance. | ✅ | ❌ |
| Khi có một số phương thức mặc định có thể dùng chung. | ❌ | ✅ |

---

## **💡 Tổng kết**
| **Tiêu chí** | **Interface** | **Abstract Class** |
|-------------|-------------|----------------|
| **Hỗ trợ kế thừa** | ✅ Đa kế thừa (một lớp có thể implement nhiều interface). | ❌ Chỉ đơn kế thừa. |
| **Phương thức** | ✅ Chỉ có `abstract` (Java 7 trở về trước). Java 8 hỗ trợ `default` & `static`. | ✅ Có thể chứa cả phương thức `abstract` và `concrete` (có thân). |
| **Biến (fields)** | ✅ Chỉ có `public static final` (hằng số). | ✅ Có thể có biến instance (non-static). |
| **Constructor** | ❌ Không có constructor. | ✅ Có constructor. |
| **Ứng dụng** | Khi cần đảm bảo rằng tất cả các lớp tuân theo một **hợp đồng** nhất định. | Khi có logic chung cho nhiều lớp con và cần hỗ trợ **đa hình**. |

💡 **Kết luận:**  
- **Dùng Interface** khi muốn **tạo một hợp đồng** chung cho các lớp mà không quan tâm đến cách chúng thực hiện.  
- **Dùng Abstract Class** khi muốn **chia sẻ logic chung** nhưng vẫn cho phép lớp con mở rộng.  
🚀