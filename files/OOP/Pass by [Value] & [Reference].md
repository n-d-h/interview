# **`Tham chiếu` & `Tham trị`**  

### **1️⃣ Định nghĩa**
- **Tham trị (Pass by Value):** Truyền **bản sao của giá trị** vào hàm. Mọi thay đổi bên trong hàm không ảnh hưởng đến biến gốc.  
- **Tham chiếu (Pass by Reference):** Truyền **địa chỉ của biến gốc**, nên thay đổi trong hàm sẽ ảnh hưởng trực tiếp đến biến gốc.  

---

### **2️⃣ So sánh chi tiết**
| **Tiêu chí**       | **Tham trị (Pass by Value)** | **Tham chiếu (Pass by Reference)** |
|--------------------|---------------------------|--------------------------------|
| **Dữ liệu truyền** | Giá trị của biến được sao chép. | Địa chỉ bộ nhớ của biến gốc. |
| **Ảnh hưởng đến biến gốc** | Không ảnh hưởng. | Ảnh hưởng trực tiếp. |
| **Áp dụng cho** | Kiểu dữ liệu nguyên thủy (int, double, char, bool, ...) trong Java, C. | Kiểu dữ liệu đối tượng (class, array, List, Map, ...) trong Java, C++. |
| **Hiệu suất** | Tốn ít bộ nhớ hơn. | Có thể tốn nhiều bộ nhớ hơn do thao tác trên dữ liệu lớn. |
| **Thay đổi trong hàm** | Chỉ thay đổi bản sao. | Thay đổi ngay cả biến gốc. |

---

### **3️⃣ Ví dụ minh họa**
#### **🔹 Tham trị (Pass by Value)**
Trong Java, các kiểu **nguyên thủy (primitive types)** như `int`, `double`, `char` truyền theo **tham trị**:
```java
public class Test {
    public static void modifyValue(int x) {
        x = 10;  // Chỉ thay đổi giá trị của biến x cục bộ
    }

    public static void main(String[] args) {
        int a = 5;
        modifyValue(a);
        System.out.println(a);  // Kết quả vẫn là 5 (không bị thay đổi)
    }
}
```
✅ **Kết quả:** `5` → `a` không thay đổi vì chỉ truyền **bản sao giá trị**.

---

#### **🔹 Tham chiếu (Pass by Reference)**
Với **đối tượng (object)** hoặc **mảng (array)**, Java truyền theo **tham chiếu**, nghĩa là nó truyền địa chỉ bộ nhớ:
```java
import java.util.*;

public class Test {
    public static void modifyList(List<String> list) {
        list.add("New Item");  // Thay đổi trực tiếp danh sách
    }

    public static void main(String[] args) {
        List<String> myList = new ArrayList<>();
        myList.add("Item 1");
        modifyList(myList);
        System.out.println(myList); // Kết quả: [Item 1, New Item]
    }
}
```
✅ **Kết quả:** `[Item 1, New Item]` → `myList` bị thay đổi vì nó được truyền bằng **tham chiếu**.

---

### **4️⃣ Một số lưu ý quan trọng**
1. **Java không thực sự hỗ trợ Pass by Reference**  
   - Java luôn truyền **tham trị**, nhưng với đối tượng, giá trị truyền vào là **tham chiếu đến đối tượng**, không phải đối tượng thực tế.
   - Không thể thay đổi tham chiếu của biến, nhưng có thể thay đổi nội dung của đối tượng.
   ```java
   public static void changeReference(StringBuilder sb) {
       sb = new StringBuilder("New Value"); // Chỉ thay đổi tham chiếu cục bộ
   }

   public static void main(String[] args) {
       StringBuilder sb = new StringBuilder("Hello");
       changeReference(sb);
       System.out.println(sb); // Kết quả: Hello (Không bị thay đổi)
   }
   ```
   ✅ **Lý do:** `sb` trong `changeReference` chỉ thay đổi cục bộ, không ảnh hưởng đến `sb` bên ngoài.

2. **Trong C++ có hỗ trợ Pass by Reference**  
   - Trong C++, có thể truyền tham chiếu bằng `&`:
   ```cpp
   void modify(int &x) {
       x = 10; // Thay đổi trực tiếp biến gốc
   }

   int main() {
       int a = 5;
       modify(a);
       cout << a; // Kết quả: 10
   }
   ```
   ✅ **Ở C++, `a` bị thay đổi do truyền tham chiếu thực sự.**

---

### **5️⃣ Kết luận**
| **Tham trị** | **Tham chiếu** |
|-------------|--------------|
| Truyền **bản sao giá trị**. | Truyền **địa chỉ bộ nhớ** của biến. |
| Không ảnh hưởng đến biến gốc. | Ảnh hưởng trực tiếp đến biến gốc. |
| Dùng cho kiểu nguyên thủy. | Dùng cho object, mảng. |

📌 **Tóm lại:**  
- Nếu muốn **giữ nguyên giá trị gốc**, hãy truyền kiểu nguyên thủy (pass by value).  
- Nếu muốn **thay đổi trực tiếp biến gốc**, hãy truyền object hoặc mảng (pass by reference). 🚀