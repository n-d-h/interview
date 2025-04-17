# 🔥 Phân biệt `equals()` và `==` trong Java

| **So sánh** | `==` | `equals()` |
|-------------|------|-----------|
| **Chức năng** | So sánh địa chỉ bộ nhớ (reference) | So sánh giá trị nội dung của đối tượng |
| **Áp dụng cho** | Kiểu dữ liệu nguyên thủy và object | Chủ yếu là object (trừ khi override) |
| **Mặc định với object** | Chỉ so sánh xem hai object có cùng địa chỉ hay không | Nếu không override, mặc định cũng so sánh địa chỉ (giống `==`) |
| **Override được không?** | ❌ Không thể override | ✅ Có thể override để định nghĩa cách so sánh |

---

### 🛠 Khi nào cần override `equals()`?
Mặc định, `equals()` trong `Object` chỉ kiểm tra xem hai object có cùng địa chỉ không (giống `==`).  
**Nhưng trong nhiều trường hợp, ta muốn so sánh nội dung của object thay vì địa chỉ.**  

Ví dụ: So sánh hai đối tượng `Person` dựa trên tên và tuổi.

#### 🚀 Trường hợp không override `equals()`:
```java
class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("Alice", 25);
        Person p2 = new Person("Alice", 25);

        System.out.println(p1 == p2);       // ❌ false (vì khác địa chỉ)
        System.out.println(p1.equals(p2));  // ❌ false (vì chưa override equals)
    }
}
```
💡 `equals()` chưa được override, nên vẫn so sánh địa chỉ ⇒ **Không thể so sánh nội dung đúng cách.**

---

### ✅ Override `equals()` để so sánh giá trị:
```java
class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true; // Nếu cùng tham chiếu, trả về true
        if (obj == null || getClass() != obj.getClass()) return false;

        Person person = (Person) obj;
        return age == person.age && name.equals(person.name);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("Alice", 25);
        Person p2 = new Person("Alice", 25);

        System.out.println(p1 == p2);       // ❌ false (so sánh địa chỉ)
        System.out.println(p1.equals(p2));  // ✅ true (so sánh nội dung)
    }
}
```

---

### 🚀 **Khi nào nên override `equals()`?**
- Khi bạn muốn so sánh hai object theo nội dung chứ không phải địa chỉ.
- Khi object có các thuộc tính quan trọng để xác định tính duy nhất (ví dụ: ID, email, số điện thoại).
- Khi sử dụng object làm key trong `HashMap` hoặc `HashSet`, cần đảm bảo `equals()` hoạt động đúng.

💡 **Lưu ý:** Khi override `equals()`, bạn cũng nên override `hashCode()` để đảm bảo tính nhất quán trong các cấu trúc dữ liệu như `HashMap`, `HashSet`.

---

### 📌 **Tóm tắt**
| **So sánh** | `==` | `equals()` |
|------------|--------------------------------------|-------------------------------------|
| **So sánh** | Địa chỉ bộ nhớ (reference) | Nội dung của object |
| **Áp dụng cho** | Kiểu nguyên thủy và object | Chủ yếu là object |
| **Override** | ❌ Không thể override | ✅ Có thể override để tùy chỉnh |

👉 **Khi nào cần override `equals()`?**  
✔ Khi muốn so sánh object theo nội dung, không phải địa chỉ.  
✔ Khi làm việc với `HashSet`, `HashMap`, `ArrayList.contains()`, v.v.

🔥 **Mẹo**: Nếu override `equals()`, **phải override `hashCode()` để đảm bảo tính nhất quán.**