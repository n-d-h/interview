# Final 

#### 1. Từ khoá final
- **Biến final**: khi một biến được khai báo với từ khoá final, nó chỉ chứa một giá trị duy nhất trong toàn bộ chương trình (hay dễ hiểu hơn gọi là biến hằng).
- **Phương thức final**: khi một phương thức được khai báo với từ khoá final, các class con kế thừa sẽ không thể ghi đè (override) phương thức này.
- **Lớp final**: khi từ khoá final sử dụng cho một lớp, lớp này sẽ không thể được kế thừa.
- **Biến static final trống**: Một biến final mà không được khởi tạo tại thời điểm khai báo được gọi là biến final trống.

---

#### 2. Phương thức final
- Phương thức final có thể kể thừa nhưng không thể bị ghi đè (override) ở lớp con.
- Phương thức final được sử dụng để ngăn chặn việc thay đổi hành vi của một phương thức.

---

#### 3. Lớp final
- Lớp final không thể được kế thừa.

---

#### 4. Biến static final trống
- Một biến final mà không được khởi tạo tại thời điểm khai báo được gọi là biến final trống.
- Biến final trống phải được khởi tạo trong constructor hoặc trong khối static.
- Không thể thay đổi giá trị của nó sau khi đã được khởi tạo.

```java
public class FinalExample {
    static final int MAX_VALUE;
    final int MIN_VALUE;

    static {
        MAX_VALUE = 100;
    }

    public FinalExample() {
        MIN_VALUE = 10;
    }

    public static void main(String[] args) {
        FinalExample ex = new FinalExample();
        System.out.println("MAX_VALUE = " + FinalExample.MAX_VALUE);
        System.out.println("MIN_VALUE = " + ex.MIN_VALUE);
    }
}
``` 

```java
output:
MAX_VALUE = 100
MIN_VALUE = 10
```


