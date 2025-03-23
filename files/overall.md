# Object-Oriented Programming (OOP)

- static class / method
- final / static
- chứng minh tính đa hình là quan trọng nhất
- phân biệt tham chiếu và tham trị
- override & overload
- structure & class
- destructor
- SOLID
- những loại variable
- cohesion
- tight coupling / Loose coupling
- DI
- async/await

---

#### 1. Thế nào là `static`?

Các phương thức và hàm có chứa từ khóa `static` đều thuộc lớp có thể truy cập từ class trực tiếp mà không cần trải qua quá trình tạo đối tượng mới.

---

#### 2. Đặc điểm của `final`:

- Những thuộc tính `final` không có khả năng thay đổi giá trị của nó.
- Các phương thức `final` không có khả năng override ở lớp con.
- Những class `final` sẽ không có khả năng kế thừa.

---

#### 3. Đa hình (Polymorphism)

Tính đa hình là khả năng một object có thể thực hiện một tác vụ theo nhiều cách khác nhau, cụ thể là cho phép biến/hàm hoặc đối tượng có thể có nhiều dạng khác nhau.

#### Có 2 loại đa hình:

- **Đa hình tĩnh (Static polymorphism):** Được thực hiện tại thời điểm biên dịch.
- **Đa hình động (Dynamic polymorphism):** Được thực hiện tại thời điểm chạy.

---

#### 4. Các loại biến (Variable) trong OOP

- **Primitive Variable:** Biểu diễn các giá trị nguyên thủy như `int`, `float`...
- **Reference Variable:** Tham chiếu đến các đối tượng trong Java.
- **Instance Variable:** Giá trị thay đổi từ đối tượng này sang đối tượng khác.
- **Static Variable:** Một bản sao duy nhất được chia sẻ giữa mọi đối tượng class.
- **Local Variable:** Được khai báo bên trong `method`, `block` hoặc `constructor`.

---

#### 5. SOLID Principles

Nguyên tắc SOLID là các nguyên tắc hướng đối tượng được Robert C. Martin giới thiệu trong bài báo cáo _"Design Principles and Design Patterns"_ năm 2000.

- **S - Single Responsibility Principle (SRP):** Một class chỉ chịu trách nhiệm cho một chức năng duy nhất.
- **O - Open Closed Principle (OCP):** Mở rộng nhưng không chỉnh sửa code đã tồn tại.
- **L - Liskov Substitution Principle (LSP):** Các thể hiện con có thể thay thế cho cha mà không ảnh hưởng đến tính đúng đắn của chương trình.
- **I - Interface Segregation Principle (ISP):** Tạo nhiều interface nhỏ, thay vì một interface lớn.
- **D - Dependency Inversion Principle (DIP):** Module cấp cao không phụ thuộc vào module cấp thấp.

---

#### 6. Constructor

- **Private Constructor:** Hạn chế khởi tạo class từ bên ngoài.
- **Default Constructor:** Trình biên dịch tự động tạo ra.
- **Copy Constructor:** Tạo bản sao đối tượng.
- **Static Constructor:** Chỉ được thực thi một lần khi class được tải.
- **Parameterized Constructor:** Chấp nhận tham số để tùy chỉnh trạng thái của đối tượng.

---

# SQL

[🔗 Fullstack SQL Interview Guide](https://github.com/Ren0503/fullstack-interviews/tree/main/database/sql)

#### Các nguyên tắc SQL

- **Indexing**: Tăng tốc độ truy vấn.
- **SQL Injection**: Tấn công bằng cách chèn mã SQL độc hại.
- **Transaction**: Đảm bảo tính toàn vẹn dữ liệu.
- **JDBC**: Java Database Connectivity giúp kết nối Java với cơ sở dữ liệu.

---

# Design Patterns

- **Factory Pattern**
- **Builder Pattern**
- **Singleton Pattern**

---

# Microservices

- **Redis**
- **Docker Container/Image**
- **Kubernetes**

---

# Thuật toán

[🔗 Tổng hợp kiến thức thuật toán](https://www.thanhnamnguyen.dev/tai-lieu/phong-van/kien-thuc-nen-tang/thuat-toan)

#### Các thuật toán quan trọng

- **Tìm kiếm**
- **Sắp xếp**
- **Tìm số nguyên**
- **Giai thừa**
- **Fibonacci**
- **Hoán vị**

---

# Node.js

- **JavaScript**
- **Express.js**
- **Next.js**
