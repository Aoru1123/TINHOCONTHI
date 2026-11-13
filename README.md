# TIN HỌC THPT – STUDY HUB

Website hỗ trợ học sinh ôn thi tốt nghiệp THPT môn Tin học được xây dựng theo kiến trúc **JSON-driven** (dữ liệu điều khiển giao diện).

## 1. Thông tin tác giả
- **Họ và tên:** Đặng Nguyễn Minh An
- **Số điện thoại:** 0967613868
- **Vai trò:** Người sáng tạo và phát triển website

## 2. Hướng dẫn chạy dự án trong Visual Studio Code
1. Mở Visual Studio Code, chọn **File -> Open Folder** và mở thư mục dự án.
2. Cài đặt tiện ích mở rộng **Live Server** (tác giả: *Ritwick Dey*).
3. Nhấp chuột phải vào tệp `index.html` và chọn **Open with Live Server**.
4. Trình duyệt sẽ khởi chạy tại địa chỉ `http://127.0.0.1:5500/index.html` và nạp toàn bộ dữ liệu từ `data.json`.

## 3. Hướng dẫn cập nhật và mở rộng dữ liệu trong `data.json`
Mọi nội dung trên website đều được đọc tự động từ `data.json`:
- **Thêm bài học mới:** Thêm một đối tượng vào mảng `"theory"`.
- **Thêm chuyên đề mới:** Thêm một đối tượng vào mảng `"topics"`.
- **Thêm câu hỏi trắc nghiệm:** Thêm một đối tượng vào mảng `"questions"`, trong đó `"correctIndex"` nhận giá trị từ `0` đến `3` (tương ứng A, B, C, D).
- **Thêm đề thi thử:** Thêm một đối tượng vào mảng `"exams"` và liệt kê danh sách ID câu hỏi trong `"questionIds"`.