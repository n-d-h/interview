# **Dependency Injection (DI)** 

🔹 **Dependency Injection (DI)** là một **kỹ thuật thiết kế** giúp giảm **Coupling (sự phụ thuộc giữa các class)** bằng cách **cung cấp (inject) các dependencies từ bên ngoài thay vì để class tự khởi tạo chúng**.  

✅ **Mục tiêu của DI:**  
1. **Loose Coupling** → Class không phụ thuộc chặt vào implementation cụ thể.  
2. **Dễ bảo trì, mở rộng** → Thay đổi hoặc thay thế dependencies dễ dàng.  
3. **Dễ kiểm thử (Unit Testing)** → Có thể mock dependencies trong test.  

---

## **1️⃣ Ví Dụ Bad Design (Không Dùng DI) – Tight Coupling 😢**  
```java
class EmailService {
    void sendEmail(String message) {
        System.out.println("Sending email: " + message);
    }
}

class UserService {
    private EmailService emailService = new EmailService();  // ❌ Tightly coupled

    void registerUser(String username) {
        System.out.println("Registering user: " + username);
        emailService.sendEmail("Welcome, " + username);
    }
}
```
💥 **Vấn đề:**
- `UserService` **tạo trực tiếp** một instance của `EmailService`.  
- Nếu muốn **thay đổi cách gửi email (ví dụ, dùng SMS hoặc push notification)** → Phải sửa `UserService`.  
- **Khó kiểm thử** vì `UserService` luôn sử dụng `EmailService` thật.  

---

## **2️⃣ Good Design (Dùng Dependency Injection) – Loose Coupling 😃**  

### **👉 Dùng Constructor Injection (Cách phổ biến nhất)**
```java
class EmailService {
    void sendEmail(String message) {
        System.out.println("Sending email: " + message);
    }
}

class UserService {
    private final EmailService emailService;

    // ✅ Inject dependency thông qua constructor
    public UserService(EmailService emailService) {
        this.emailService = emailService;
    }

    void registerUser(String username) {
        System.out.println("Registering user: " + username);
        emailService.sendEmail("Welcome, " + username);
    }
}

// 💡 Khi tạo UserService, inject EmailService từ bên ngoài
public class Main {
    public static void main(String[] args) {
        EmailService emailService = new EmailService();
        UserService userService = new UserService(emailService);  // ✅ Dependency Injected
        userService.registerUser("Hoàng Đức");
    }
}
```
✅ **Lợi ích của Constructor Injection:**  
✔ `UserService` **không tạo trực tiếp** `EmailService`, dễ thay thế bằng dịch vụ khác.  
✔ Dễ mở rộng: **Nếu cần thêm SMSService hoặc PushNotificationService, chỉ cần thay đổi DI mà không cần sửa code trong UserService.**  
✔ Dễ kiểm thử: **Có thể mock `EmailService` trong unit test.**  

---

## **3️⃣ Các Loại Dependency Injection**  

🔹 **1. Constructor Injection (Khuyến nghị) 🚀**  
   - Inject dependency thông qua **constructor**.  
   - Dễ kiểm thử, đảm bảo dependency không thể bị thay đổi sau khi khởi tạo.  
   - **Ưu tiên sử dụng cách này!**  
   ```java
   class UserService {
       private final EmailService emailService;

       public UserService(EmailService emailService) { // DI thông qua constructor
           this.emailService = emailService;
       }
   }
   ```

🔹 **2. Setter Injection**  
   - Inject dependency thông qua **setter method**.  
   - Cho phép thay đổi dependency sau khi khởi tạo.  
   - **Nhược điểm:** Không đảm bảo dependency luôn có giá trị (có thể bị set null).  
   ```java
   class UserService {
       private EmailService emailService;

       public void setEmailService(EmailService emailService) { // DI thông qua setter
           this.emailService = emailService;
       }
   }
   ```

🔹 **3. Field Injection (Ít khuyến nghị) 🚫)**  
   - Inject dependency trực tiếp vào **field**.  
   - Dễ đọc nhưng **khó kiểm thử**, vì dependency bị "ẩn" bên trong class.  
   ```java
   class UserService {
       @Inject  // Dùng framework DI (Spring, Jakarta EE)
       private EmailService emailService;
   }
   ```

---

## **4️⃣ Dùng Framework để Quản Lý DI (Spring) 🏆**
Trong thực tế, **các framework như Spring hỗ trợ DI tự động** mà không cần khởi tạo thủ công.  

**👉 Ví dụ dùng Spring Framework với @Component và @Autowired**
```java
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
class EmailService {
    void sendEmail(String message) {
        System.out.println("Sending email: " + message);
    }
}

@Service
class UserService {
    private final EmailService emailService;

    @Autowired  // ✅ Spring sẽ tự động inject EmailService vào đây
    public UserService(EmailService emailService) {
        this.emailService = emailService;
    }

    void registerUser(String username) {
        System.out.println("Registering user: " + username);
        emailService.sendEmail("Welcome, " + username);
    }
}
```
🔥 **Với Spring DI:**
- Spring **tự động inject dependency** mà không cần khởi tạo thủ công (`new EmailService()`).  
- Code **gọn gàng, dễ bảo trì** và **mở rộng linh hoạt**.  

---

## **5️⃣ Kết Luận**
| **Loại** | **Ưu điểm** | **Nhược điểm** |
|----------|------------|---------------|
| **Constructor Injection** ✅ (Khuyến nghị) | Dễ kiểm thử, đảm bảo dependency luôn có giá trị, không bị thay đổi sau khi khởi tạo. | Cần khởi tạo dependency trước khi dùng. |
| **Setter Injection** ⚠️ | Có thể thay đổi dependency sau khi khởi tạo. | Không đảm bảo dependency luôn có giá trị. |
| **Field Injection** ❌ | Code gọn hơn, dễ đọc. | **Khó kiểm thử**, không thấy được dependency từ bên ngoài. |

💡 **Dependency Injection giúp code dễ bảo trì, mở rộng và test hơn.** Trong Java, nên ưu tiên **Constructor Injection** và dùng framework như **Spring** để quản lý DI. 🚀