# 🔥 **Index trong SQL là gì?**
**Index (chỉ mục)** trong SQL giúp tăng tốc truy vấn bằng cách tạo một cấu trúc dữ liệu đặc biệt để tìm kiếm nhanh hơn. Nó hoạt động tương tự như **mục lục của một cuốn sách**, giúp tìm kiếm dữ liệu nhanh hơn thay vì quét toàn bộ bảng.

---

## 🛠 **Các loại Index trong SQL**
### 1️⃣ **Primary Index (Chỉ mục chính)**
- Tự động tạo khi một cột được đặt làm `PRIMARY KEY`.
- **Duy nhất** và **không thể có giá trị NULL**.
- Dữ liệu được sắp xếp theo chỉ mục này.

🔹 **Ví dụ:**
```sql
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,  -- Tự động có index
    Name VARCHAR(100),
    Age INT
);
```

---

### 2️⃣ **Unique Index (Chỉ mục duy nhất)**
- Đảm bảo rằng các giá trị trong cột là **duy nhất**.
- Cho phép **NULL** (khác với `PRIMARY KEY`).

🔹 **Ví dụ:**
```sql
CREATE UNIQUE INDEX idx_unique_email ON Employees(Email);
```

---

### 3️⃣ **Composite Index (Chỉ mục tổng hợp)**
- Đánh index trên **nhiều cột cùng lúc**.
- Hữu ích cho các truy vấn tìm kiếm nhiều điều kiện.

🔹 **Ví dụ:**
```sql
CREATE INDEX idx_composite ON Employees(Department, Salary);
```
👉 **Lưu ý:** Thứ tự cột trong chỉ mục rất quan trọng!  

---

### 4️⃣ **Full-Text Index (Chỉ mục toàn văn)**
- Dùng để **tìm kiếm văn bản** nhanh chóng trong các cột kiểu `TEXT` hoặc `VARCHAR`.
- Hữu ích cho **tìm kiếm theo từ khóa**.

🔹 **Ví dụ (MySQL):**
```sql
CREATE FULLTEXT INDEX idx_fulltext ON Articles(Title, Content);
```
👉 **Lưu ý:** Không phải tất cả DBMS đều hỗ trợ `FULLTEXT`.

---

### 5️⃣ **Clustered Index (Chỉ mục có cụm)**
- **Sắp xếp dữ liệu vật lý** theo chỉ mục.
- Mỗi bảng **chỉ có một** `Clustered Index`.
- `PRIMARY KEY` trong SQL Server & MySQL mặc định là `Clustered Index`.

🔹 **Ví dụ:**
```sql
CREATE CLUSTERED INDEX idx_clustered ON Employees(Salary);
```

---

### 6️⃣ **Non-Clustered Index (Chỉ mục không có cụm)**
- Chỉ lưu trữ **chỉ mục riêng biệt**, không ảnh hưởng thứ tự dữ liệu thực tế.
- Có thể có nhiều `Non-Clustered Index` trên một bảng.

🔹 **Ví dụ:**
```sql
CREATE NONCLUSTERED INDEX idx_nonclustered ON Employees(Age);
```

---

## ⚡ **Khi nào nên dùng Index?**
✅ Khi truy vấn có `WHERE`, `JOIN`, `ORDER BY`, `GROUP BY`.  
✅ Khi tìm kiếm trong bảng có **dữ liệu lớn**.  
✅ Khi cần truy vấn theo **nhiều điều kiện** (Composite Index).  

---

## ⚠ **Nhược điểm của Index**
❌ **Tốn dung lượng bộ nhớ** (Đặc biệt khi có nhiều chỉ mục).  
❌ **Giảm tốc độ `INSERT`, `UPDATE`, `DELETE`**, vì dữ liệu phải cập nhật index.  

💡 **Giải pháp:** Chỉ đánh index trên các cột thường xuyên **tìm kiếm** hoặc **sắp xếp**.

---

## 🚀 **Kiểm tra Index có hiệu quả không?**
Bạn có thể sử dụng **`EXPLAIN`** để xem truy vấn có sử dụng index hay không:

```sql
EXPLAIN SELECT * FROM Employees WHERE Age > 30;
```
---

## 📌 **Tóm tắt**
| **Loại Index**        | **Mô tả** |
|-----------------|----------------------|
| `PRIMARY INDEX` | Tự động có khi đặt `PRIMARY KEY` |
| `UNIQUE INDEX`  | Đảm bảo giá trị trong cột là duy nhất |
| `COMPOSITE INDEX` | Đánh index trên nhiều cột cùng lúc |
| `FULLTEXT INDEX` | Tăng tốc tìm kiếm văn bản |
| `CLUSTERED INDEX` | Sắp xếp dữ liệu theo thứ tự chỉ mục |
| `NON-CLUSTERED INDEX` | Chỉ lưu chỉ mục, không sắp xếp dữ liệu thực tế |

👉 **Khi nào dùng Index?** Khi truy vấn có `WHERE`, `JOIN`, `ORDER BY`, `GROUP BY`.  
👉 **Tránh lạm dụng!** Vì có thể làm chậm `INSERT/UPDATE/DELETE`.

---

# 🚀 **Cách đánh Index hợp lý cho cột `username` để tìm kiếm nhanh**  

Khi bạn muốn tìm kiếm **nhanh chóng** bằng `username`, cách đánh **index phù hợp** sẽ giúp tối ưu tốc độ truy vấn.  

---

## **1️⃣ Dùng `UNIQUE INDEX` nếu `username` là duy nhất**  
Nếu `username` là **duy nhất** trong bảng (không có giá trị trùng lặp), sử dụng `UNIQUE INDEX` giúp **tìm kiếm siêu nhanh**:  

```sql
CREATE UNIQUE INDEX idx_username ON users(username);
```

- ✅ **Lợi ích**:  
  - Truy vấn `WHERE username = 'john_doe'` cực nhanh nhờ **Index Seek**.  
  - Ngăn chặn giá trị `username` bị trùng lặp.  

📌 **Truy vấn tối ưu**:  
```sql
SELECT * FROM users WHERE username = 'john_doe';
```

---

## **2️⃣ Dùng `BTREE INDEX` nếu `username` không cần duy nhất**  
Nếu `username` không cần **duy nhất**, nhưng vẫn muốn tìm nhanh theo tên, dùng **B-Tree Index**:  

```sql
CREATE INDEX idx_username ON users(username);
```

- ✅ **Tăng tốc truy vấn `WHERE username = 'john_doe'`.**  
- ✅ **Hỗ trợ `ORDER BY username ASC/DESC` nhanh hơn.**  

📌 **Truy vấn tối ưu**:  
```sql
SELECT * FROM users WHERE username = 'jane_doe';
```

---

## **3️⃣ Dùng `FULLTEXT INDEX` nếu cần tìm kiếm dạng `LIKE` hoặc `MATCH`**  
Nếu bạn muốn tìm kiếm `username` theo từ khóa (giống như tìm kiếm Google), dùng `FULLTEXT INDEX` (chỉ hỗ trợ MySQL, MariaDB):  

```sql
ALTER TABLE users ADD FULLTEXT INDEX idx_username(username);
```

📌 **Truy vấn tối ưu** (Tìm kiếm nhanh theo từ khóa):  
```sql
SELECT * FROM users WHERE MATCH(username) AGAINST('john');
```

🚀 **Nhanh hơn nhiều so với `LIKE '%john%'`.**  

---

## **4️⃣ Dùng `INDEX PREFIX` nếu `username` rất dài**  
Nếu `username` có **độ dài lớn** (ví dụ: `VARCHAR(255)`), thì đánh Index trên **phần đầu** của chuỗi giúp tiết kiệm bộ nhớ:  

```sql
CREATE INDEX idx_username ON users(username(20));
```

📌 **Phù hợp khi chỉ tìm kiếm trên phần đầu của username**.  

⏳ **Truy vấn tối ưu**:  
```sql
SELECT * FROM users WHERE username LIKE 'john%';
```
🚀 **Nhanh hơn `LIKE '%john%'` vì tận dụng Index**.

---

## **5️⃣ Dùng `COMPOSITE INDEX` nếu có nhiều điều kiện tìm kiếm**
Nếu bạn tìm kiếm theo **username + status** thường xuyên, tạo **Composite Index** giúp truy vấn nhanh hơn:  

```sql
CREATE INDEX idx_username_status ON users(username, status);
```

📌 **Truy vấn tối ưu**:  
```sql
SELECT * FROM users WHERE username = 'john_doe' AND status = 'active';
```
🚀 **Nhanh hơn so với Index chỉ trên `username`**.

---

## **📌 Tóm tắt cách đánh Index hợp lý**
| Loại Index  | Khi nào dùng? | Truy vấn tối ưu |
|-------------|-------------|----------------|
| **UNIQUE INDEX** | `username` là duy nhất | `WHERE username = 'john_doe'` |
| **BTREE INDEX** | Tìm kiếm chính xác | `WHERE username = 'jane_doe'` |
| **FULLTEXT INDEX** | Tìm kiếm từ khóa | `MATCH(username) AGAINST ('john')` |
| **INDEX PREFIX** | `username` rất dài | `WHERE username LIKE 'john%'` |
| **COMPOSITE INDEX** | Kết hợp với `status` hoặc `email` | `WHERE username = 'john' AND status = 'active'` |

🔥 **Chọn Index phù hợp giúp truy vấn nhanh hơn, tránh Full Table Scan!** 🚀