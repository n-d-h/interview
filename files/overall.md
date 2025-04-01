# Object-Oriented Programming (OOP)

- static class / method
- final / static
- chứng minh tính đa hình là quan trọng nhất
- phân biệt tham chiếu và tham trị
- override & overload
- SOLID
- những loại variable
- cohesion
- tight coupling / Loose coupling
- DI
- async/await
- bộ nhớ stack và heap
- git / svn
- tối ưu select
- session / cookies / localStorage
- class / object
- bảo đảm chất lượng src code
- lập trình bất đồng bộ là gì
- web api trả về dữ liệu gì
- mô hình mvc và thứ tự xử lý
- khoá chính và khoá ngoại
- View / Stored Procedure / Trigger

---

#### 1. Đặc điểm của `final`:

- Những thuộc tính `final` không có khả năng thay đổi giá trị của nó.
- Các phương thức `final` không có khả năng override ở lớp con.
- Những class `final` sẽ không có khả năng kế thừa.

---

#### 2. Đa hình (Polymorphism)

Tính đa hình là khả năng một object có thể thực hiện một tác vụ theo nhiều cách khác nhau, cụ thể là cho phép biến/hàm hoặc đối tượng có thể có nhiều dạng khác nhau.

#### Có 2 loại đa hình:

- **Đa hình tĩnh (Static polymorphism):** Được thực hiện tại thời điểm biên dịch.
- **Đa hình động (Dynamic polymorphism):** Được thực hiện tại thời điểm chạy.

---

#### 3. Các loại biến (Variable) trong OOP

- **Primitive Variable:** Biểu diễn các giá trị nguyên thủy như `int`, `float`...
- **Reference Variable:** Tham chiếu đến các đối tượng trong Java.
- **Instance Variable:** Giá trị thay đổi từ đối tượng này sang đối tượng khác.
- **Static Variable:** Một bản sao duy nhất được chia sẻ giữa mọi đối tượng class.
- **Local Variable:** Được khai báo bên trong `method`, `block` hoặc `constructor`.

---

#### 4. SOLID Principles

Nguyên tắc SOLID là các nguyên tắc hướng đối tượng được Robert C. Martin giới thiệu trong bài báo cáo _"Design Principles and Design Patterns"_ năm 2000.

- **S - Single Responsibility Principle (SRP):** Một class chỉ chịu trách nhiệm cho một chức năng duy nhất.
- **O - Open Closed Principle (OCP):** Mở rộng nhưng không chỉnh sửa code đã tồn tại.
- **L - Liskov Substitution Principle (LSP):** Các thể hiện con có thể thay thế cho cha mà không ảnh hưởng đến tính đúng đắn của chương trình.
- **I - Interface Segregation Principle (ISP):** Tạo nhiều interface nhỏ, thay vì một interface lớn.
- **D - Dependency Inversion Principle (DIP):** Module cấp cao không phụ thuộc vào module cấp thấp.

---

#### 5. Constructor

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
- **[SQL Injection](http://www.lavamunky.com/2011/11/why-parameterized-queries-stop-sql.html)**: Tấn công bằng cách chèn mã SQL độc hại.
- **[Normalization](https://datapot.vn/chuan-hoa-du-lieu-la-gi-1nf-2nf-3nf-datapot/)**: Giảm lặp lại dữ liệu.
- **Transaction**: Đảm bảo tính toàn vẹn dữ liệu.
- **JDBC**: Java Database Connectivity giúp kết nối Java với cơ sở dữ liệu.

[Full SQL Injection](https://cyberjutsu.io/blog/tong-hop-sql-injection-techniques-phan-tich-toan-dien-2025)

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
- **Tìm số nguyên tố**
- **Giai thừa**
- **Fibonacci**
- **Hoán vị**
- **Đảo ngược chuỗi**
- **Chia để trị**
- **Làm phẳng mảng**
- **Tìm các phần tử trùng**
- **Loại bỏ phần tử trùng**
- **Tìm các kí tự xuất hiện nhiều nhất**
- **Tìm các kí tự trùng lặp trong chuỗi**
- **Tìm số lớn thứ hai**
- **Tìm số lớn nhất**
- **Tìm số bị thiếu trong mảng đã sắp xếp**
- **Tìm số lớn nhất nhỏ hơn**
- **Tìm các tập hợp số có tổng bằng một số cho trước**
- **bubble sort**
- **quick sort**
- **merge sort**
- **insertion sort**
- **binary search**
- **depth first search**
- **breadth first search**
- **dijkstra algorithm**
- **floyd warshall algorithm**

---

# Node.js

- **JavaScript**
- **Express.js**
- **Next.js**

```java
// Online Java Compiler
// Use this editor to write, compile and run your Java code online
import java.util.*;

class Main {
    private static void bai1(int[] arr) {
        int n = arr.length;

        int count = 0;

        // change 5 to 0
        for (int i = 0; i < n; i++) {
            if (arr[i] == 5) {
                arr[i] = 0;
                count++;
            }
        }

        int[] result = new int[n];

        int zeroIndex = 0;
        int nonZeroIndex = count;
        for (int num : arr) {
            // move 0 to the left and others to the right
              if (num == 0) {
                  result[zeroIndex++] = num;
              } else {
                  result[nonZeroIndex++] = num;
              }
        }


        System.out.println("Shift left: " + Arrays.toString(result));

        int[] result2 = new int[n];
        for (int i = 0, j = count; j < n; j++) {
            result2[i] = result[j];
            i++;
        }

        System.out.println("Shift right: " + Arrays.toString(result2));
    }

    private static void bai2(int[] arr1, int arr2[]){
        Map<Integer, Integer> map = new HashMap();
        for (int i = 0; i < arr1.length; i++){
                if (arr1[i] == arr2[i]){
                    map.put(arr1[i], i);
                }
        }
        System.out.println("Value and Position 2 arrays meet at: " + map);
    }

    private static void bai3(){
        int size = 5;
        char[][] array = new char[size][size];

        // Gán '0' vào toàn bộ mảng
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                if (i == j || i + j == size - 1) {
                    array[i][j] = 'X'; // Đánh dấu đường chéo chính & phụ
                } else {
                    array[i][j] = '0'; // Các phần tử khác gán '0'
                }
            }
        }

        for (char[] row : array) {
            for (char cell : row) {
                System.out.print(cell + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int[] arr1 = {5,2,5,3,6,7,3,5,3,10,9,5};
        System.out.println("1)");
        bai1(arr1);
        System.out.println("================================");
        System.out.println("2)");
        int[] arr2 = {1,2,4,7,8,10,15,17,11,20};
        int[] arr3 = {2,3,4,8,9,10,11,16,18,20};
        bai2(arr2, arr3);
        System.out.println("================================");
        System.out.println("3)");
        bai3();
    }
}
```
