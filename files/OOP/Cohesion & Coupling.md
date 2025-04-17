# **Cohesion là gì?**  
**Cohesion (Tính gắn kết)** là **mức độ mà các phần trong một module hoặc class liên quan chặt chẽ với nhau** để thực hiện một nhiệm vụ cụ thể.  

👉 **Cohesion cao (High Cohesion)** → Mỗi class/module chỉ thực hiện một nhiệm vụ cụ thể.  
👉 **Cohesion thấp (Low Cohesion)** → Class/module chứa nhiều chức năng không liên quan, làm cho code khó bảo trì.

---

## **1️⃣ Ví dụ về Cohesion thấp**
```java
class Utility {
    void calculateTax() { /* Tính thuế */ }
    void printInvoice() { /* In hóa đơn */ }
    void sendEmail() { /* Gửi email */ }
}
```
💥 **Vấn đề:** Class `Utility` chứa các chức năng **không liên quan** như tính thuế, in hóa đơn và gửi email → **Cohesion thấp**.  

---

## **2️⃣ Ví dụ về Cohesion cao**
```java
class TaxCalculator {
    void calculateTax() { /* Tính thuế */ }
}

class InvoicePrinter {
    void printInvoice() { /* In hóa đơn */ }
}

class EmailService {
    void sendEmail() { /* Gửi email */ }
}
```
✅ **Cải thiện:** Mỗi class có một nhiệm vụ riêng biệt, giúp **dễ bảo trì và mở rộng** → **Cohesion cao**.

---

## **3️⃣ So sánh Low vs High Cohesion**
| **Cohesion Thấp** ❌ | **Cohesion Cao** ✅ |
|----------------------|---------------------|
| Class chứa nhiều chức năng không liên quan | Class chỉ có một nhiệm vụ cụ thể |
| Code khó hiểu, khó bảo trì | Code dễ mở rộng và tái sử dụng |
| Thay đổi một tính năng có thể ảnh hưởng đến nhiều phần khác | Ít ảnh hưởng khi thay đổi code |

---

## **4️⃣ Kết luận**  
🟢 **Hướng tới High Cohesion** để giúp code **dễ bảo trì, dễ mở rộng và ít lỗi**.  
🔴 **Tránh Low Cohesion** vì làm code **rối rắm, khó quản lý và dễ phát sinh lỗi**.

---

# Coupling
### **1️⃣ Tight Coupling vs. Loose Coupling**  
**Coupling (Tính liên kết)** là **mức độ phụ thuộc giữa các class hoặc module trong hệ thống**.  

- **Tight Coupling (Liên kết chặt - Mức độ phụ thuộc cao)**  
  → Các class/module phụ thuộc trực tiếp vào nhau.  
- **Loose Coupling (Liên kết lỏng - Mức độ phụ thuộc thấp)**  
  → Các class/module có thể thay đổi độc lập mà không ảnh hưởng đến nhau.

---

## **2️⃣ Tight Coupling (Liên kết chặt)**
💥 **Vấn đề:** Khi một class thay đổi, các class khác cũng phải thay đổi theo.  

### **Ví dụ:**
```java
class Engine {
    void start() {
        System.out.println("Engine starting...");
    }
}

class Car {
    Engine engine = new Engine(); // Car phụ thuộc chặt vào Engine

    void startCar() {
        engine.start();
    }
}
```
💥 **Nhược điểm của Tight Coupling:**
- Nếu `Engine` thay đổi (ví dụ: thêm tham số vào hàm `start()`), thì `Car` cũng phải thay đổi.
- Khó mở rộng và bảo trì.

---

## **3️⃣ Loose Coupling (Liên kết lỏng)**  
✅ **Giải pháp:** Sử dụng **Dependency Injection (DI) hoặc Interface** để giảm phụ thuộc.  

### **Ví dụ:**
```java
interface Engine {
    void start();
}

class PetrolEngine implements Engine {
    @Override
    public void start() {
        System.out.println("Petrol Engine starting...");
    }
}

class DieselEngine implements Engine {
    @Override
    public void start() {
        System.out.println("Diesel Engine starting...");
    }
}

class Car {
    private Engine engine;

    // Inject dependency qua constructor
    Car(Engine engine) {
        this.engine = engine;
    }

    void startCar() {
        engine.start();
    }
}
```
### **Ưu điểm của Loose Coupling:**
✅ **Dễ bảo trì:** Nếu muốn đổi sang `DieselEngine`, chỉ cần truyền đối tượng mới vào `Car`.  
✅ **Dễ mở rộng:** Thêm `ElectricEngine` mà không sửa `Car`.  

---

## **4️⃣ So sánh Tight vs Loose Coupling**
| **Tight Coupling ❌** | **Loose Coupling ✅** |
|----------------------|---------------------|
| Class phụ thuộc chặt vào nhau | Class/module có thể thay đổi độc lập |
| Khó mở rộng, thay đổi gây lỗi dây chuyền | Dễ mở rộng, dễ bảo trì |
| Ít linh hoạt, khó tái sử dụng code | Code linh hoạt, tái sử dụng tốt hơn |

---

## **5️⃣ Kết luận**
🔴 **Tránh Tight Coupling** vì làm code khó bảo trì và mở rộng.  
🟢 **Ưu tiên Loose Coupling** bằng cách sử dụng **Interface, Dependency Injection (DI), Abstract Class** để làm giảm sự phụ thuộc giữa các module.