# Static OOP

#### 1. Thế nào là `static`?

Các phương thức và hàm có chứa từ khóa `static` đều thuộc lớp có thể truy cập từ class trực tiếp mà không cần trải qua quá trình tạo đối tượng mới.

---

#### 2. Gọi phương thức non-static trong phương thức static

Trong Java, bạn không thể trực tiếp gọi một phương thức không static (non-static) từ một phương thức static. Điều này là do phương thức static không phụ thuộc vào bất kỳ đối tượng nào của lớp, trong khi phương thức không static yêu cầu một đối tượng của lớp để gọi nó.

Để gọi một phương thức không static (non-static) trong một phương thức static, chúng ta phải sử dụng một thực thể (đối tượng) của lớp chứa phương thức non-static. Đây là trường hợp phổ biến khi gọi một phương thức không static từ phương thức main() static

Không thể override (đè) phương thức static trong Java, bởi vì kỹ thuật đè (overriding) phương thức được dựa trên quá trình gán (binding) động khi khi chương trình đang chạy (runtime) và những phương thức static  được gán tĩnh trong thời gian biên dịch. Phương thức tĩnh không ràng buộc với thực thể của lớp nên phương thức tĩnh sẽ không thể override (đè).

```java
class Example {
    int x = 10;

    void nonStaticMethod() {
        System.out.println("This is a non-static method.");
    }

    static void staticMethod() {
        Example obj = new Example(); // Tạo đối tượng vì phương thức non-static cần đối tượng
        obj.nonStaticMethod(); // Gọi phương thức non-static thông qua đối tượng
        System.out.println(obj.x); // Truy cập biến non-static thông qua đối tượng
    }
}

public class Main {
    public static void main(String[] args) {
        Example.staticMethod();
    }
}
```

---
#### 3. Khối static
Khối static là một khối mã được thực thi một lần khi class được tải vào bộ nhớ. Khối static được sử dụng để khởi tạo các biến static của lớp. _(ví dụ như các biến tĩnh hoặc các cấu trúc dữ liệu tĩnh. Điều này đặc biệt hữu ích khi việc khởi tạo yêu cầu thực hiện các hành động phức tạp hơn việc chỉ gán một giá trị)_

- Đảm bảo chỉ được thực thi một lần khi lớp được tải vào bộ nhớ. Điều này đảm bảo rằng các thành viên tĩnh chỉ được khởi tạo một lần, giúp tiết kiệm tài nguyên và tránh các vấn đề liên quan đến việc khởi tạo nhiều lần.

- Khối static được thực thi trước phương thức main của lớp. Điều này đảm bảo rằng tất cả các thành viên tĩnh đã được khởi tạo đúng cách trước khi chương trình bắt đầu thực thi.

```java
class Example {
    static int x;

    static {
        x = 10;
        System.out.println("This is a static block.");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Example.x);
    }
}
```

---

#### 4. Tại sao phương thức main() static?

**1️⃣ Không phụ thuộc vào việc khởi tạo đối tượng**  
- Một phương thức `static` có thể được gọi trực tiếp từ lớp mà không cần tạo đối tượng.  
- Nếu `main()` không phải là `static`, chương trình sẽ phải tạo một đối tượng trước khi gọi `main()`, điều này không cần thiết và có thể gây tốn bộ nhớ.  

**2️⃣ Tính độc lập của `main()`**  
- `main()` là điểm bắt đầu của chương trình và không nên phụ thuộc vào trạng thái của bất kỳ đối tượng nào.  
- Nếu `main()` là một phương thức non-static, nó sẽ yêu cầu một thể hiện (instance) của lớp chứa nó, điều này không phù hợp với một phương thức đóng vai trò điều khiển toàn bộ chương trình.  

**3️⃣ Nguyên tắc của lập trình hướng đối tượng (OOP)**  
- Các phương thức `static` thuộc về lớp (`class`), không thuộc về đối tượng (`instance`).  
- `main()` thường chỉ chịu trách nhiệm khởi tạo các thành phần cần thiết, nên nó không cần trạng thái của một đối tượng.  

**4️⃣ Khả năng sử dụng `main()` theo cách tùy chỉnh**  
- Trong các ứng dụng Java nâng cao, có thể gọi `main()` nhiều lần hoặc từ các luồng khác nhau.  
- Nếu `main()` không phải là `static`, mỗi lần gọi sẽ yêu cầu một đối tượng mới, gây khó khăn trong quản lý bộ nhớ và làm phức tạp chương trình.  

---

#### 5. Lớp static
Một class được có thể được đặt là static chỉ khi nó là một **nested class** (tức nằm trong một lớp khác). Một **nested static class** có thể được truy cập mà không cần một object của **outer class** (lớp bên ngoài).

```java
public class UsingStaticExample {
    private String subject;

    UsingStaticExample (String subject) {
        this.subject = subject;
    }

    // nested static class
    static class MyWebsite {
        public static String WEBSITE = "gpcoder.com";
    }

    public void print() {
        System.out.println("Subject = " + subject);
        System.out.println("Website = " + MyWebsite.WEBSITE);
    }

    public static void main(String[] args) {
        UsingStaticExample ex1 = new UsingStaticExample("Core Java");
        ex1.print();

        // hoặc tạo một đối tượng của nested static class
        UsingStaticExample.MyWebsite website = new UsingStaticExample.MyWebsite();
        System.out.println(website.WEBSITE);
    }
}
```

---
#### 6. So sánh giữa `static` và `final`
- **`static`**:
  - Biến `static` được chia sẻ giữa tất cả các đối tượng của lớp.
  - Có thể truy cập biến `static` mà không cần tạo đối tượng.
  - Biến `static` được khởi tạo khi lớp được tải vào bộ nhớ.
  - Biến `static` không thể thay đổi giá trị của nó.
  - Phương thức `static` không thể override ở lớp con.
  - Lớp `static` không thể kế thừa.
- **`final`**:
    - Biến `final` không thể thay đổi giá trị của nó.
    - Phương thức `final` không thể override ở lớp con.
    - Lớp `final` không thể kế thừa.

---

#### 7. So sánh non-static và static
| Tiêu chí | static | non-static |
| --- | --- | --- |
| Thuộc về | Thuộc về lớp (class-level) | Thuộc về đối tượng (instance-level) |
| Truy cập | Có thể truy cập mà không cần tạo đối tượng của lớp | Phải tạo đối tượng của lớp để truy cập |
| Số lượng bản sao | Chỉ có một bản sao cho tất cả các đối tượng của lớp | Mỗi đối tượng có bản sao riêng của các biến và phương thức |
| Truy cập biến và phương thức khác | Chỉ có thể truy cập các thành viên static khác trong lớp | Có thể truy cập cả biến và phương thức static lẫn non-static |


