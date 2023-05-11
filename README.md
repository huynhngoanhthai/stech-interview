# [**Table Of Content**](#table-of-content)
- [**Table Of Content**](#table-of-content)
- [**Introduction**](#introduction)
- [**Download**](#download)
- [**Rules**](#rules)
  - [**1. Method**](#1-method)
  - [**2. Direction**](#2-direction)
  - [**3. Code**](#3-code)
- [**Document**](#document)
  - [**1. Authentication**](#1-authentication)
  
    - [**🟡 1. register**](#1-register)
    - [**🟡 2. login**](#2-login)
    - [**🟡 3. upload image**](#3-upload-image)
    - [**🟢 4. history upload user**](#4-history)
    - [**🟠 5. delete image**](#5-delete)
    
# [**Introduction**](#introduction)

Đây là tài liệu mô tả chi tiết từng API được mình - Huỳnh Ngô Anh Thái - viết và chuẩn bị trong đồ án.
Mình làm cái này để thực hiện bài test phỏng vấn
# [**Download**](#download)
đầu tiên là tại src về rồi mở terminal lên chay
```sh
$ npm i
```
tạo một file là .env 
```javascript
PORT = 3000
MONGO_URL = mongodb://localhost:27017/database
BUCKET_NAME = upload
JWT_SECRET = 04112001
URL = http://localhost:3000/
```
sao đó
```sh
$ npm start
```
# [**Rules**](#rules)

## [**1. Method**](#1-method)

API của mình viết theo chuẩn Restful API, trong đồ án của mình thì mình chỉ sử dụng 5 dạng phương thức quen thuộc 
sau để xây dựng đồ án:

- 🟢 **GET** - Để truy xuất một tài nguyên. Ví dụ: lấy thông tin 1 giao dịch thì dùng phương thức GET

- 🟡 **POST** - Để tạo một tài nguyên trên máy chủ. Ví dụ: tạo mới một tài khoản

- 🔵 **PUT** - Để thay đổi trạng thái toàn bộ một tài nguyên hoặc để cập nhật nó. Ví dụ: thay đổi mật khẩu, tên hiển thị

- 🟠 **PATCH** - Giống PUT nhưng PATCH thường dùng trong trường hợp sửa 1 phần của tài nguyên.

- 🔴 **DELETE** - Để huỷ bỏ hoặc xoá một tài nguyên. Ví dụ: xóa hoàn toàn một thể loại, bài viết,...

Hãy để ý một chút tới màu sắc mà mình quy ước bên trên. Mình sẽ sử dụng màu sắc kết hợp với các thông tin khác
để mô tả API.

## [**2. Direction**](#2-direction)

Để xem toàn bộ các điều hướng khi một API được gọi. Hãy mở `router/authRouter.js` - đây là tệp tin chứa 
điều hướng một API về đăng ký đăng nhập được gọi được gọi.

<p align="center">
    <img src="./photo/document01.png" width=800 />
</p>
<h3 align="center">

***Hình ảnh các API được khai báo trong tệp tin authRouter.js***
  
 Để xem toàn bộ các điều hướng khi một API được gọi. Hãy mở `router/fileRouter.js` - đây là tệp tin chứa 
điều hướng một API về các chức năng thêm,xóa,xem được gọi được gọi.

<p align="center">
    <img src="./photo/document02.png" width=800 />
</p>
<h3 align="center">

***Hình ảnh các API được khai báo trong tệp tin fileRouter.js***
  
</h3>

Giả sử, mình lấy ví dụ một dòng cho dễ hiểu nha 😅

> router.post("/login", authController.login);

Trong này, cấu trúc mặc định câu lệnh là

> router."các phương thức hỗ trợ"("tên đường dẫn", "Controller sẽ xử lý yêu cầu");

Vậy thì với ví dụ trên thì 

- `POST` là các phương thức hỗ trợ

- `/login` là tên đường dẫn của API. Ví dụ như: GET - http://localhost:3000/api/v1/auth sẽ là một yêu cầu hợp lệ

- `authController.login` là controller xử lý yêu cầu này.

lưu ý:
địa trị mình setup bản đầu cho url "http://localhost:3000/api/v1/auth"
tứ là nếu mình gọi phương thức login sẽ là 😅

> POST http://localhost:3000/api/v1/authu/login

<p align="center">
    <img src="./photo/document03.png" width=800 />
</p>
<h3 align="center">

## [**3. Code**](#3-code)

Các mình viết hàm xử lý là đồng nhất và xuyên suốt toàn bộ các controller nên mình sẽ mô tả tóm gọn 
như sau:

<p align="center">
    <img src="./photo/document04.png" width=800 />
</p>
<h3 align="center">

***Cấu trúc mặc định của một Controller***
</h3>
Từ hình minh họa bên trên, chúng ta có thể hiểu được cấu trúc một Controller trong đồ án này. 


# [**Document**](#document)

Phần này mình sẽ mô tả chi tiết từng API, đối số truyền vào là gì và kết quả trả về.


## [**1. Authentication**](#1-authentication)

Mục đích chung là phục vụ chức năng đăng nhập & xác thực danh tính người dùng. Bất kì ai cũng có thể sử dụng API này.
Trong API mình có sử dụng chức năng Variable của POSTMAN để tiết kiệm thời gian viết code. Tên & ý nghĩa của chúng như sau:

| Tên                   | Chức năng                                                                         |
|-----------------------|-----------------------------------------------------------------------------------|
| ENDPOINT_URL          | Tên đường dẫn chung của đồ án - http://localhost:3000/api/v1  |

để biết được hostname bạn sự dụng lệnh trong cmd:
> ipconfig
sao đo tìm dòng 
>  IPv4 Address. . . . . . . . . . . : 192.168...
đó là hostname của bạn 

### [**🟡 1. register**](#1-register)


  
 - **Purpose**: Xử lý yêu cầu đăng ký của user từ Android gửi tới.

- **Permission**: ADMIN - SUPPORTER - USER

- **Method**: 🟡 **POST**

- **URL**: {{ENDPOINT_URL}}/auth/signup

- **Headers**: bỏ trống

- **Body**:
  
    | Tên                   | Tùy chọn | Ý nghĩa                                                                           |
    |-----------------------|----------|-----------------------------------------------------------------------------------|
    | name                  | Bắt buộc | name đăng ký tài khoản                                                            |
    | Email                 | Bắt buộc | Email đăng ký tài khoản                                                           |
    | Password              | Bắt buộc | Mật khẩu tài khoản                                                                |
    | age                   | Bắt buộc | độ tuổi của người dùng                                                            |
  
    

- **Respone**:

```json
  {
    "success": true,
    "data": {
        "name": "thai",
        "email": "anhthai9@gmail.com",
        "password": "$2a$10$kGxOdPBRLxMIZHONYDLWl.gZ5LnjTQnz6kj2pFvk5i.RghXu15eNW",
        "age": 23,
        "active": true,
        "file": [],
        "_id": "645c73b58d0d3ba609e7ee63",
        "createdAt": "2023-05-11T04:48:53.303Z",
        "updatedAt": "2023-05-11T04:48:53.303Z",
        "__v": 0
    }
}
  
  ````
  
- **ERROR**:
  
  - api sẽ bât lỗi nếu email trung với email đã tồn tại trong cơ sơ dữ liệu
  
   ```json
          {
    "success": false,
    "statusCode": 400,
    "message": "email is supplicated"
}
  ```    
  
  - đăng mật khẩu phải có tử 6-30 kí tự
  
  ```json
   {
    "success": false,
    "message": "users validation failed: password: Must be at least 6 character"
  }
  ```   
### [**🟡 2. Login**](#2-login)

- **Purpose**: Xử lý yêu cầu đăng ky của user gửi tới.

- **Permission**: ADMIN - SUPPORTER - USER

- **Method**: 🟡 **POST**

- **URL**: {{ENDPOINT_URL}}/auth/login

- **Headers**: bỏ trống

- **Body**:
  
    | Tên                   | Tùy chọn | Ý nghĩa                                                                           |
    |-----------------------|----------|-----------------------------------------------------------------------------------|
    | Email                 | Bắt buộc | Email đăng ký tài khoản                                                            |
    | Password              | Bắt buộc | Mật khẩu tài khoản                                                                 |

- **Respone**:

```json
  
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaHRoYWlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUFU3eGlrSUFkbGZFY3ZXV0dSSkFndVpNc20vMjBJUDNBck1ZZThyVlZoajJVanNBV056SWkiLCJuYW1lIjoidGhhaSIsImlhdCI6MTY4Mzc4MDU2MiwiZXhwIjoxNjgzODY2OTYyfQ.wwEqfiC7kLJkHlKE0ezGWM-uJwPK6dJbRKXEgD89lHM"
}
  
  ```
  
  - **ERROR**:
  - email hoặc password ko khớp thì sẽ báo lỗi 


### [**🟡 3.  upload image**](#3-upload-image)

- **Purpose**: Xử lý yêu cầu gửi otp qua email của user từ  gửi tới.

- **Permission**: ADMIN - SUPPORTER - USER

- **Method**: 🟡 **POST**

- **URL**: {{ENDPOINT_URL}}/file/upload

- **Headers**: bỏ trống

- **Form-data**:
  
    | key                   | Value    | Description                                                                       |
    |-----------------------|----------|-----------------------------------------------------------------------------------|
    | photo                 | FILE     | có thể tải lên 1 hoăc nhiều ảnh                                                   |
    

- **Respone**:
```json
  {
    "success": true,
    "message": "Upload successful"
}
  ```
- **ERROR**:
  - người dùng phải đăng nhập mới sự dụng được chức năng này nếu không đăng nhập sẽ báo lỗi 

  ```json
        {
          "success": false,
          "statusCode": 401,
          "message": "You are not logged in! Please log in to get access."
      }
  ```    
    +khi đăng nhập thành công bạn sẽ được trả về một token bạn hải lưu token đo ở chỗ authorization, chon Type Bearer Token, sao đó nhập vào ô Token
      <p align="center">
        <img src="./photo/postmanToken.png"/>
    </p>
    <h3 align="center">
  
  - người dùng phải tải ảnh lên là một file ảnh có đuôi phải là ".jbg", ".png", ".gif", ".jpeg",".jpg"
    ```json
      {
    "success": false,
    "statusCode": 400,
    "message": "it isn't image"
}
  ```    
  - người dùng không thể tải anh với kích thước lớn hơn 10MB
     ```json
   {
    "success": false,
    "statusCode": 400,
    "message": "File too large"
}
  ```    
  

### [**🟢 4.  history upload user**](#4-history)

- **Purpose**: gọi tới có thẻ trả về danh sách các file đã tải lên server có thể click trực tiếp để hiện thị hình ảnh.

- **Permission**: ADMIN - SUPPORTER - USER

- **Method**: 🟢 **GET**

- **URL**: {{ENDPOINT_URL}}/file/history-upload
  
- **Headers**: bỏ trống

- **Body**:  bỏ trống
  
- **Respone**:

```json
      {
    "success": true,
    "files": [
        "http://localhost:3000/photo-1683772362081.jpg",
        "http://localhost:3000/photo-1683772362083.jpg",
        "http://localhost:3000/photo-1683772362083.jpg",
        "http://localhost:3000/photo-1683772644095.jpg",
        "http://localhost:3000/photo-1683772644096.jpg",
        "http://localhost:3000/photo-1683772644097.jpg",
        "http://localhost:3000/photo-1683778882906.jpg",
        "http://localhost:3000/photo-1683778882908.jpg",
        "http://localhost:3000/photo-1683778882909.jpg",
        "http://localhost:3000/photo-1683780599680.jpg"
    ]
}
      ```
  - **ERROR**:
    - người dùng phải đăng nhập mới sự dụng được chức năng này nếu không đăng nhập sẽ báo lỗi 

    ```json
          {
            "success": false,
            "statusCode": 401,
            "message": "You are not logged in! Please log in to get access."
        }
    ```    

### [**🟠 5.delete image**](#5-delete)

- **Purpose**: Xử lý yêu cầu gửi quên mật khẩu của user từ Android gửi tới.

- **Permission**: ADMIN - SUPPORTER - USER

- **Method**: 🟠 **PATCH**

- **URL**: {{ENDPOINT_URL}}/file/delete-upload/:filename

- **Headers**: bỏ trống

- **Body**: 
  
- **Respone**:
```json
      {
    "success": true,
}
      ```

  - **ERROR**:
  - người dùng phải đăng nhập mới sự dụng được chức năng này nếu không đăng nhập sẽ báo lỗi 

  ```json
        {
          "success": false,
          "statusCode": 401,
          "message": "You are not logged in! Please log in to get access."
      }
  ```    
  - nếu người dùng không sở hưu file đó thì không thể xóa 
  ```json
  {
    "success": false,
    "statusCode": 401,
    "message": "you can't delete files you don't own"
}
    ```    
