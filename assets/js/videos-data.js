/**
 * HỆ THỐNG DỮ LIỆU BÀI GIẢNG TIN HỌC THPT - BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
 * Chuẩn chương trình GDPT 2018 & Định hướng cấu trúc đề thi Tốt nghiệp THPT Quốc Gia
 */

const CURRICULUM_DATA = {
  grades: [
    { id: "all", name: "Tất cả khối lớp", badge: "ALL" },
    { id: "12", name: "Lớp 12 (Trọng tâm thi THPT)", badge: "LỚP 12", desc: "AI, Mạng máy tính, CSDL quan hệ, Luyện đề 2025+" },
    { id: "11", name: "Lớp 11 (CS & ICT)", badge: "LỚP 11", desc: "Hệ CSDL, Lập trình nâng cao, Thuật toán sắp xếp/tìm kiếm" },
    { id: "10", name: "Lớp 10 (Nền tảng cốt lõi)", badge: "LỚP 10", desc: "Số hóa dữ liệu, Căn bản Python, Cấu trúc rẽ nhánh & lặp" }
  ],

  tracks: [
    { id: "all", name: "Tất cả định hướng", icon: "layers" },
    { id: "cs", name: "Khoa học máy tính (CS)", icon: "cpu", desc: "Thuật toán, Cấu trúc dữ liệu, Lập trình Python chuyên sâu" },
    { id: "ict", name: "Tin học ứng dụng (ICT)", icon: "layout", desc: "Hệ CSDL quan hệ, SQL, Thiết kế web, Ứng dụng số" }
  ],

  topics: [
    { id: "all", name: "Tất cả chủ đề" },
    { id: "python", name: "Lập trình Python", count: 18 },
    { id: "sql_db", name: "CSDL & Truy vấn SQL", count: 12 },
    { id: "network_security", name: "Mạng & An ninh mạng", count: 8 },
    { id: "ai_modern", name: "Trí tuệ nhân tạo (AI)", count: 6 },
    { id: "exam_practice", name: "Luyện đề thi THPT 2025+", count: 14 }
  ],

  // Danh sách video bài giảng chất lượng cao, bài bản theo SGK Kết nối tri thức
  videos: [
  {
    "id": "vid-10-01",
    "title": "Tin học 10 KNTT - Bài 1: Thông tin và Xử lí Thông tin",
    "grade": "10",
    "track": "all",
    "topic": "network_security",
    "bookRef": "SGK Tin học 10 KNTT - Bài 1 (Chủ đề 1: Máy tính & Xã hội tri thức)",
    "duration": "24:21",
    "durationSec": 1461,
    "level": "Cơ bản",
    "levelColor": "emerald",
    "views": "15.2K",
    "rating": 4.9,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "NỀN TẢNG TIN 10",
    "youtubeId": "tlL5OWA7C0M",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    "description": "Tìm hiểu bản chất của thông tin và dữ liệu, quá trình xử lý thông tin trong máy tính điện tử, các đơn vị đo lượng thông tin (Bit, Byte, KB, MB, GB, TB) và bảng mã ký tự ASCII, Unicode.",
    "chapters": [
      {
        "time": "00:00",
        "title": "Khái niệm Thông tin và Dữ liệu",
        "sec": 0
      },
      {
        "time": "06:10",
        "title": "Quá trình 3 bước xử lý thông tin của máy tính",
        "sec": 370
      },
      {
        "time": "12:45",
        "title": "Đơn vị đo lượng thông tin (Bit, Byte, KB, MB, GB)",
        "sec": 765
      },
      {
        "time": "18:30",
        "title": "Thiết bị số và vai trò trong xã hội hiện đại",
        "sec": 1110
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Đơn vị cơ bản và nhỏ nhất dùng để đo lượng thông tin trong máy tính là gì?",
        "options": [
          "Byte",
          "Bit (Binary Digit)",
          "Kilobyte (KB)",
          "Hertz (Hz)"
        ],
        "correct": 1,
        "explanation": "Bit (viết tắt của Binary Digit) là đơn vị nhỏ nhất để đo lượng thông tin, chỉ nhận một trong hai giá trị nhị phân 0 hoặc 1."
      }
    ]
  },
  {
    "id": "vid-10-02",
    "title": "Tin học 10 KNTT - Bài 16: Ngôn ngữ lập trình bậc cao và Python",
    "grade": "10",
    "track": "cs",
    "topic": "python",
    "bookRef": "SGK Tin học 10 KNTT - Bài 16 (Chủ đề 6: Lập trình Python căn bản)",
    "duration": "25:52",
    "durationSec": 1552,
    "level": "Cơ bản",
    "levelColor": "emerald",
    "views": "28.6K",
    "rating": 5.0,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "BẮT ĐẦU PYTHON",
    "youtubeId": "WAFMOxkTLqU",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    "description": "Làm quen môi trường lập trình Python IDLE, phân biệt chế độ gõ lệnh trực tiếp (Interactive mode) và chế độ soạn thảo tệp script (.py), thực hiện các phép toán số học căn bản.",
    "chapters": [
      {
        "time": "00:00",
        "title": "Giới thiệu ngôn ngữ lập trình bậc cao & Python",
        "sec": 0
      },
      {
        "time": "07:20",
        "title": "Khởi động IDLE & Chế độ gõ lệnh trực tiếp",
        "sec": 440
      },
      {
        "time": "14:15",
        "title": "Chế độ soạn thảo file chương trình (.py)",
        "sec": 855
      },
      {
        "time": "20:30",
        "title": "Các phép toán số học: +, -, *, /, //, %, **",
        "sec": 1230
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Trong Python, kết quả của phép toán `17 // 5` và `17 % 5` lần lượt là bao nhiêu?",
        "options": [
          "3 và 2",
          "3.4 và 2",
          "2 và 3",
          "3 và 0"
        ],
        "correct": 0,
        "explanation": "Toán tử // chia lấy phần nguyên (17 // 5 = 3), toán tử % chia lấy phần dư (17 % 5 = 2 vì 17 = 5*3 + 2)."
      }
    ]
  },
  {
    "id": "vid-10-03",
    "title": "Tin học 10 KNTT - Bài 17: Biến và Lệnh gán trong Python",
    "grade": "10",
    "track": "cs",
    "topic": "python",
    "bookRef": "SGK Tin học 10 KNTT - Bài 17 (Chủ đề 6: Lập trình Python)",
    "duration": "28:30",
    "durationSec": 1710,
    "level": "Cơ bản",
    "levelColor": "emerald",
    "views": "19.4K",
    "rating": 4.9,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "CÚ PHÁP CỐT LÕI",
    "youtubeId": "fp_fQ8gNpNo",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
    "description": "Quy tắc đặt tên biến chuẩn trong Python, câu lệnh gán giá trị (=), các kiểu dữ liệu cơ sở: số nguyên (int), số thực (float), xâu ký tự (str), lôgic (bool) và cách dùng hàm type().",
    "chapters": [
      {
        "time": "00:00",
        "title": "Khái niệm biến và cách thức lưu trữ bộ nhớ",
        "sec": 0
      },
      {
        "time": "06:40",
        "title": "Quy tắc đặt tên biến hợp lệ trong Python",
        "sec": 400
      },
      {
        "time": "13:50",
        "title": "Câu lệnh gán đơn và gán đồng thời nhiều biến",
        "sec": 830
      },
      {
        "time": "21:15",
        "title": "Các kiểu dữ liệu chuẩn và hàm type()",
        "sec": 1275
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Tên biến nào sau đây là hợp lệ trong ngôn ngữ lập trình Python?",
        "options": [
          "2_bien",
          "tong diem",
          "_diem_trung_binh",
          "for"
        ],
        "correct": 2,
        "explanation": "Tên biến không được bắt đầu bằng chữ số (loại 2_bien), không chứa khoảng trắng (loại tong diem), không trùng từ khóa của Python (loại for). Tên `_diem_trung_binh` hoàn toàn hợp lệ."
      }
    ]
  },
  {
    "id": "vid-10-04",
    "title": "Tin học 10 KNTT - Bài 23: Dữ liệu Danh sách (List) & Các phương thức",
    "grade": "10",
    "track": "cs",
    "topic": "python",
    "bookRef": "SGK Tin học 10 KNTT - Bài 23 (Chủ đề 6: Lập trình Python)",
    "duration": "37:27",
    "durationSec": 2247,
    "level": "Thông hiểu",
    "levelColor": "amber",
    "views": "24.1K",
    "rating": 5.0,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "TRỌNG TÂM LIST",
    "youtubeId": "fPjvxxRBKUg",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    "description": "Toàn diện về kiểu dữ liệu danh sách trong Python: cách khai báo, truy cập phần tử qua chỉ số âm/dương, duyệt mảng với for...in, các thao tác append(), insert(), remove(), pop(), clear() và toán tử in.",
    "chapters": [
      {
        "time": "00:00",
        "title": "Khởi tạo danh sách và chỉ số phần tử",
        "sec": 0
      },
      {
        "time": "09:30",
        "title": "Thêm phần tử với append() và insert()",
        "sec": 570
      },
      {
        "time": "18:45",
        "title": "Xóa phần tử với remove(), pop(), clear()",
        "sec": 1125
      },
      {
        "time": "27:10",
        "title": "Toán tử in và duyệt danh sách với for in",
        "sec": 1630
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Cho danh sách `a = [10, 20, 30]`. Sau khi thực hiện lệnh `a.append(40)`, giá trị `len(a)` bằng bao nhiêu?",
        "options": [
          "3",
          "4",
          "5",
          "Báo lỗi IndexError"
        ],
        "correct": 1,
        "explanation": "Phương thức append(40) thêm phần tử 40 vào cuối danh sách, nâng số lượng phần tử từ 3 lên 4."
      }
    ]
  },
  {
    "id": "vid-10-05",
    "title": "Tin học 10 KNTT - Bài 24: Xâu kí tự & Các thao tác xử lý chuỗi",
    "grade": "10",
    "track": "cs",
    "topic": "python",
    "bookRef": "SGK Tin học 10 KNTT - Bài 24 (Chủ đề 6: Lập trình Python)",
    "duration": "34:51",
    "durationSec": 2091,
    "level": "Thông hiểu",
    "levelColor": "amber",
    "views": "21.8K",
    "rating": 4.9,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "XỬ LÝ XÂU",
    "youtubeId": "LVQwH0p7Df4",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&auto=format&fit=crop&q=80",
    "description": "Các thao tác với xâu ký tự: ghép xâu (+), nhân xâu (*), cắt xâu con theo cú pháp [start:stop:step], các phương thức split(), join(), find() và tính chất bất biến (immutable) của xâu trong Python.",
    "chapters": [
      {
        "time": "00:00",
        "title": "Bản chất xâu ký tự và chỉ số index",
        "sec": 0
      },
      {
        "time": "08:15",
        "title": "Cắt xâu con (String Slicing)",
        "sec": 495
      },
      {
        "time": "17:40",
        "title": "Phương thức split() và join()",
        "sec": 1060
      },
      {
        "time": "26:20",
        "title": "Tìm kiếm xâu con với phương thức find()",
        "sec": 1580
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Cho xâu `s = \"Python\"`. Kết quả của biểu thức cắt xâu `s[1:4]` là gì?",
        "options": [
          "'Pyt'",
          "'yth'",
          "'ytho'",
          "'tho'"
        ],
        "correct": 1,
        "explanation": "Cắt xâu s[1:4] lấy các ký tự ở chỉ số 1, 2, 3 (không lấy chỉ số 4). s[1]='y', s[2]='t', s[3]='h' -> 'yth'."
      }
    ]
  },
  {
    "id": "vid-10-06",
    "title": "Tin học 10 KNTT - Bài 26: Hàm trong Python & Phạm vi biến (Scope)",
    "grade": "10",
    "track": "cs",
    "topic": "python",
    "bookRef": "SGK Tin học 10 KNTT - Bài 26 (Chủ đề 6: Lập trình Python)",
    "duration": "35:57",
    "durationSec": 2157,
    "level": "Vận dụng",
    "levelColor": "purple",
    "views": "20.3K",
    "rating": 5.0,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "HÀM PYTHON",
    "youtubeId": "3Jm_pBRzN_8",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    "description": "Kỹ thuật xây dựng chương trình con với từ khóa def, truyền tham số, giá trị trả về return, phân biệt biến cục bộ (Local variable) và biến toàn cục (Global variable).",
    "chapters": [
      {
        "time": "00:00",
        "title": "Khái niệm hàm và lợi ích tái sử dụng mã nguồn",
        "sec": 0
      },
      {
        "time": "09:10",
        "title": "Cú pháp định nghĩa hàm với def và return",
        "sec": 550
      },
      {
        "time": "18:30",
        "title": "Tham số và đối số truyền vào hàm",
        "sec": 1110
      },
      {
        "time": "27:45",
        "title": "Phạm vi biến cục bộ và biến toàn cục",
        "sec": 1665
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Từ khóa nào trong Python được dùng để định nghĩa một hàm mới?",
        "options": [
          "function",
          "def",
          "func",
          "procedure"
        ],
        "correct": 1,
        "explanation": "Từ khóa `def` (viết tắt của define) được dùng để định nghĩa hàm mới trong Python."
      }
    ]
  },
  {
    "id": "vid-11-01",
    "title": "Tin học 11 KNTT - Bài 1: Hệ Điều Hành & Quản Lý Tài Nguyên Máy Tính",
    "grade": "11",
    "track": "all",
    "topic": "network_security",
    "bookRef": "SGK Tin học 11 KNTT - Bài 1 (Chủ đề 1: Máy tính & Xã hội tri thức)",
    "duration": "23:19",
    "durationSec": 1399,
    "level": "Cơ bản",
    "levelColor": "emerald",
    "views": "17.9K",
    "rating": 4.9,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "HỆ ĐIỀU HÀNH",
    "youtubeId": "L6JADMqiOTg",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    "description": "Lịch sử phát triển và vai trò trung tâm của hệ điều hành: quản trị tài nguyên phần cứng (CPU, RAM, ổ đĩa), quản lý tiến trình, cung cấp giao diện người dùng CLI và GUI, phân loại hệ điều hành mã nguồn đóng (Windows, iOS) và mã nguồn mở (Linux, Android).",
    "chapters": [
      {
        "time": "00:00",
        "title": "Khái niệm và vị trí của Hệ điều hành",
        "sec": 0
      },
      {
        "time": "06:40",
        "title": "Các chức năng cốt lõi quản lý tài nguyên",
        "sec": 400
      },
      {
        "time": "13:20",
        "title": "Giao diện dòng lệnh (CLI) và đồ họa (GUI)",
        "sec": 800
      },
      {
        "time": "18:10",
        "title": "Phân loại: Nguồn đóng (Windows) vs Nguồn mở (Linux)",
        "sec": 1090
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Hệ điều hành nào sau đây thuộc nhóm phần mềm mã nguồn mở (Open Source)?",
        "options": [
          "Microsoft Windows 11",
          "Apple macOS",
          "Linux",
          "Apple iOS"
        ],
        "correct": 2,
        "explanation": "Linux là hệ điều hành mã nguồn mở tiêu biểu nhất, cho phép người dùng tự do xem, sửa đổi và phân phối mã nguồn."
      }
    ]
  },
  {
    "id": "vid-11-02",
    "title": "Tin học 11 KNTT - Bài 9: Giao Tiếp An Toàn Trên Internet",
    "grade": "11",
    "track": "all",
    "topic": "network_security",
    "bookRef": "SGK Tin học 11 KNTT - Bài 9 (Chủ đề 2: Tổ chức lưu trữ, tìm kiếm & trao đổi thông tin)",
    "duration": "23:21",
    "durationSec": 1401,
    "level": "Thông hiểu",
    "levelColor": "emerald",
    "views": "14.5K",
    "rating": 4.9,
    "instructor": {
      "name": "Cô Nguyễn Phương Thảo",
      "title": "Ban Cố vấn Chuyên môn VietJack THPT",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "AN TOÀN MẠNG",
    "youtubeId": "iBhnyBXCixg",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    "description": "Nhận diện các mối nguy hại trên không gian mạng: mã độc (virus, sâu máy tính worm, trojan, ransomware), tấn công phi kỹ thuật (Phishing), bảo vệ quyền riêng tư cá nhân và văn hóa ứng xử số.",
    "chapters": [
      {
        "time": "00:00",
        "title": "Các nguy cơ tiềm ẩn khi giao tiếp trên Internet",
        "sec": 0
      },
      {
        "time": "07:15",
        "title": "Phân loại mã độc: Virus, Worm, Trojan, Ransomware",
        "sec": 435
      },
      {
        "time": "14:30",
        "title": "Thủ đoạn lừa đảo trực tuyến (Phishing)",
        "sec": 870
      },
      {
        "time": "19:40",
        "title": "Biện pháp phòng ngừa và bảo mật tài khoản cá nhân",
        "sec": 1180
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Hình thức tấn công mạng giả mạo các tổ chức uy tín (ngân hàng, cơ quan công an) qua email hoặc tin nhắn giả để đánh cắp thông tin đăng nhập gọi là gì?",
        "options": [
          "DDoS",
          "Phishing (Tấn công giả mạo)",
          "Man-in-the-middle",
          "SQL Injection"
        ],
        "correct": 1,
        "explanation": "Phishing (lừa đảo mạo danh) là hình thức kẻ tấn công gửi thông điệp giả mạo nhằm dụ người dùng cung cấp mật khẩu, mã OTP hoặc số thẻ tín dụng."
      }
    ]
  },
  {
    "id": "vid-11-03",
    "title": "Tin học 11 KNTT - Bài 11 & 12: Cơ Sở Dữ Liệu & Hệ Quản Trị CSDL",
    "grade": "11",
    "track": "ict",
    "topic": "sql_db",
    "bookRef": "SGK Tin học 11 KNTT - Bài 11 & 12 (Chủ đề 5: Cơ sở dữ liệu - Định hướng ICT)",
    "duration": "23:53",
    "durationSec": 1433,
    "level": "Thông hiểu",
    "levelColor": "amber",
    "views": "22.3K",
    "rating": 5.0,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "CƠ SỞ DỮ LIỆU",
    "youtubeId": "-Aub2iEwbio",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
    "description": "Các khái niệm nền tảng về CSDL: dữ liệu có cấu trúc, hệ quản trị cơ sở dữ liệu (DBMS), mô hình dữ liệu quan hệ, bảng (table), bản ghi (record), trường (field), khóa chính (Primary Key) và khóa ngoài (Foreign Key).",
    "chapters": [
      {
        "time": "00:00",
        "title": "Khái niệm Cơ sở dữ liệu và vai trò trong thực tế",
        "sec": 0
      },
      {
        "time": "07:30",
        "title": "Hệ quản trị CSDL (DBMS) và các chức năng",
        "sec": 450
      },
      {
        "time": "14:15",
        "title": "Cấu trúc bảng, trường (Field) và bản ghi (Record)",
        "sec": 855
      },
      {
        "time": "19:00",
        "title": "Khóa chính và mối quan hệ giữa các bảng",
        "sec": 1140
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Trong mô hình cơ sở dữ liệu quan hệ, mỗi hàng (row) của một bảng đại diện cho thành phần nào?",
        "options": [
          "Một trường (Field)",
          "Một bản ghi (Record)",
          "Một khóa chính",
          "Một kiểu dữ liệu"
        ],
        "correct": 1,
        "explanation": "Mỗi hàng trong bảng quan hệ đại diện cho một bản ghi (Record) chứa toàn bộ thuộc tính của một đối tượng cụ thể."
      }
    ]
  },
  {
    "id": "vid-11-04",
    "title": "Tin học 11 KNTT (CS) - Bài 20: Thuật Toán Tìm Kiếm Tuần Tự & Nhị Phân",
    "grade": "11",
    "track": "cs",
    "topic": "cs",
    "bookRef": "SGK Tin học 11 KNTT - Bài 20 (Chủ đề 6: Khoa học máy tính)",
    "duration": "32:11",
    "durationSec": 1931,
    "level": "Vận dụng",
    "levelColor": "purple",
    "views": "19.8K",
    "rating": 5.0,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "THUẬT TOÁN TÌM KIẾM",
    "youtubeId": "JGxnEgX9Uec",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
    "description": "Cơ chế hoạt động, cài đặt mã nguồn Python và so sánh độ phức tạp giữa Tìm kiếm tuần tự O(n) và Tìm kiếm nhị phân O(log n). Điều kiện bắt buộc mảng phải được sắp xếp trước khi chạy tìm kiếm nhị phân.",
    "chapters": [
      {
        "time": "00:00",
        "title": "Bài toán tìm kiếm dữ liệu và ứng dụng",
        "sec": 0
      },
      {
        "time": "08:15",
        "title": "Thuật toán tìm kiếm tuần tự (Sequential Search)",
        "sec": 495
      },
      {
        "time": "16:40",
        "title": "Thuật toán tìm kiếm nhị phân (Binary Search)",
        "sec": 1000
      },
      {
        "time": "25:30",
        "title": "Đánh giá hiệu năng và số phép so sánh tối đa",
        "sec": 1530
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Điều kiện tiên quyết để có thể áp dụng thuật toán Tìm kiếm nhị phân trên một danh sách là gì?",
        "options": [
          "Danh sách phải chứa toàn số nguyên dương",
          "Các phần tử trong danh sách phải được sắp xếp theo một thứ tự xác định",
          "Số lượng phần tử trong danh sách phải là lũy thừa của 2",
          "Danh sách không được phép chứa phần tử trùng lặp"
        ],
        "correct": 1,
        "explanation": "Thuật toán tìm kiếm nhị phân bắt buộc mảng/danh sách phải được sắp xếp theo thứ tự (tăng dần hoặc giảm dần) để có thể loại bỏ một nửa không gian tìm kiếm sau mỗi bước."
      }
    ]
  },
  {
    "id": "vid-12-01",
    "title": "Tin học 12 KNTT - Bài 1: Làm Quen Với Trí Tuệ Nhân Tạo (AI)",
    "grade": "12",
    "track": "all",
    "topic": "ai_modern",
    "bookRef": "SGK Tin học 12 KNTT - Bài 1 (Chủ đề A: Máy tính & Xã hội tri thức)",
    "duration": "27:35",
    "durationSec": 1655,
    "level": "Cơ bản",
    "levelColor": "emerald",
    "views": "31.4K",
    "rating": 5.0,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "TRỌNG TÂM THI 2025",
    "youtubeId": "aqxYioHAlU0",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    "description": "Lịch sử và định nghĩa Trí tuệ nhân tạo (AI), các đặc trưng phân biệt AI với phần mềm truyền thống: khả năng học (Learning), suy luận (Reasoning), thích nghi và xử lý ngôn ngữ tự nhiên. Phân loại AI hẹp (Narrow AI) và AI tổng quát (AGI).",
    "chapters": [
      {
        "time": "00:00",
        "title": "Khái niệm Trí tuệ nhân tạo (AI) theo SGK Tin 12",
        "sec": 0
      },
      {
        "time": "07:45",
        "title": "Các đặc trưng cốt lõi của hệ thống AI",
        "sec": 465
      },
      {
        "time": "15:20",
        "title": "Phân loại: AI hẹp (Narrow AI) vs AI tổng quát (AGI)",
        "sec": 920
      },
      {
        "time": "21:50",
        "title": "Ứng dụng AI trong đời sống thực tế và y tế, giáo dục",
        "sec": 1310
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Hệ thống AI hiện nay đang được ứng dụng rộng rãi trên thực tế (như nhận diện biển số xe, dịch ngôn ngữ, xe tự lái) thuộc cấp độ nào?",
        "options": [
          "AI tổng quát (AGI)",
          "AI hẹp (Narrow AI)",
          "Siêu trí tuệ nhân tạo (ASI)",
          "AI vô thức"
        ],
        "correct": 1,
        "explanation": "Tất cả các hệ thống AI hiện nay đều thuộc nhóm AI hẹp (Narrow AI), được thiết kế để giải quyết xuất sắc một bài toán cụ thể trong phạm vi giới hạn."
      }
    ]
  },
  {
    "id": "vid-12-02",
    "title": "Tin học 12 KNTT - Bài 3: Một Số Thiết Bị Mạng Thông Dụng",
    "grade": "12",
    "track": "all",
    "topic": "network_security",
    "bookRef": "SGK Tin học 12 KNTT - Bài 3 (Chủ đề B: Mạng máy tính & Internet)",
    "duration": "49:37",
    "durationSec": 2977,
    "level": "Thông hiểu",
    "levelColor": "amber",
    "views": "25.7K",
    "rating": 4.9,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "THIẾT BỊ MẠNG",
    "youtubeId": "KZQ786erJFw",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
    "description": "Cấu tạo và nguyên lý hoạt động của các thiết bị mạng: Cáp mạng xoắn đôi (UTP) đầu bấm RJ45, Switch (bộ chuyển mạch), Router (bộ định tuyến), Access Point (điểm truy cập không dây) và Modem quang.",
    "chapters": [
      {
        "time": "00:00",
        "title": "Môi trường truyền dẫn: Cáp xoắn đôi, Cáp quang, Sóng vô tuyến",
        "sec": 0
      },
      {
        "time": "12:30",
        "title": "Switch: Cơ chế chuyển tiếp khung tin theo MAC",
        "sec": 750
      },
      {
        "time": "25:40",
        "title": "Router: Định tuyến gói tin qua địa chỉ IP",
        "sec": 1540
      },
      {
        "time": "38:15",
        "title": "Modem và Access Point trong mạng gia đình & trường học",
        "sec": 2295
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Thiết bị mạng nào đóng vai trò kết nối các mạng con khác nhau và chuyển tiếp các gói tin dựa trên địa chỉ IP đích?",
        "options": [
          "Hub",
          "Switch (Bộ chuyển mạch)",
          "Router (Bộ định tuyến)",
          "Repeater"
        ],
        "correct": 2,
        "explanation": "Router (bộ định tuyến) hoạt động ở tầng mạng, có chức năng tìm đường đi tối ưu và chuyển tiếp gói tin giữa các mạng máy tính khác nhau dựa trên địa chỉ IP."
      }
    ]
  },
  {
    "id": "vid-12-03",
    "title": "Tin học 12 KNTT - Bài 4: Giao Thức Mạng & Bộ Giao Thức TCP/IP",
    "grade": "12",
    "track": "all",
    "topic": "network_security",
    "bookRef": "SGK Tin học 12 KNTT - Bài 4 (Chủ đề B: Mạng máy tính & Internet)",
    "duration": "44:18",
    "durationSec": 2658,
    "level": "Thông hiểu",
    "levelColor": "amber",
    "views": "21.6K",
    "rating": 4.9,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "GIAO THỨC TCP/IP",
    "youtubeId": "cISjL3ByG5U",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    "description": "Khái niệm giao thức truyền thông, kiến trúc phân tầng của bộ giao thức TCP/IP: vai trò của giao thức IP trong định vị và định tuyến, vai trò của TCP trong kiểm soát truyền tin cậy, cổng dịch vụ (Port) và hệ thống phân giải tên miền (DNS).",
    "chapters": [
      {
        "time": "00:00",
        "title": "Khái niệm giao thức mạng (Network Protocol)",
        "sec": 0
      },
      {
        "time": "11:20",
        "title": "Bộ giao thức TCP/IP và mô hình phân tầng",
        "sec": 680
      },
      {
        "time": "23:45",
        "title": "Cấu trúc địa chỉ IPv4 và sự ra đời của IPv6",
        "sec": 1425
      },
      {
        "time": "35:10",
        "title": "Dịch vụ DNS: Chuyển đổi tên miền thành địa chỉ IP",
        "sec": 2110
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Hệ thống dịch vụ nào trên Internet có nhiệm vụ chuyển đổi tên miền dạng chữ (như google.com) sang địa chỉ IP dạng số?",
        "options": [
          "DHCP",
          "DNS (Domain Name System)",
          "HTTP",
          "FTP"
        ],
        "correct": 1,
        "explanation": "DNS (Hệ thống phân giải tên miền) hoạt động như danh bạ Internet, giúp chuyển đổi tên miền thân thiện với người dùng thành địa chỉ IP để các thiết bị giao tiếp với nhau."
      }
    ]
  },
  {
    "id": "vid-12-04",
    "title": "Tin học 12 KNTT (ICT) - Bài 7: HTML & Cấu Trúc Trang Web",
    "grade": "12",
    "track": "ict",
    "topic": "ict",
    "bookRef": "SGK Tin học 12 KNTT - Bài 7 (Chủ đề D: Định hướng Tin học ứng dụng)",
    "duration": "36:31",
    "durationSec": 2191,
    "level": "Cơ bản",
    "levelColor": "emerald",
    "views": "29.2K",
    "rating": 5.0,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "THIẾT KẾ WEB",
    "youtubeId": "-Ag9weZk8Rw",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=80",
    "description": "Bản chất ngôn ngữ siêu văn bản HTML, cấu trúc cây phần tử DOM chuẩn: <!DOCTYPE html>, <html>, <head>, <body>. Sử dụng các thẻ tiêu đề <h1> đến <h6>, thẻ đoạn văn <p>, ngắt dòng <br>, liên kết siêu văn bản <a> và chèn ảnh <img>.",
    "chapters": [
      {
        "time": "00:00",
        "title": "Giới thiệu ngôn ngữ HTML và cách hoạt động của trình duyệt",
        "sec": 0
      },
      {
        "time": "09:15",
        "title": "Cấu trúc khung tài liệu HTML chuẩn",
        "sec": 555
      },
      {
        "time": "18:40",
        "title": "Các thẻ tiêu đề h1-h6 và đoạn văn p",
        "sec": 1120
      },
      {
        "time": "27:50",
        "title": "Thẻ siêu liên kết a và chèn hình ảnh img",
        "sec": 1670
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Thẻ HTML nào chứa các thông tin mô tả siêu dữ liệu (metadata) của trang web như tiêu đề, liên kết CSS và bảng mã ký tự mà không hiển thị trực tiếp lên màn hình?",
        "options": [
          "<body>",
          "<head>",
          "<footer>",
          "<header>"
        ],
        "correct": 1,
        "explanation": "Thẻ <head> chứa các thông tin cấu hình và siêu dữ liệu cho trang web (như <title>, <meta>, <link> CSS) và không hiển thị trực tiếp trong vùng nội dung của trình duyệt."
      }
    ]
  },
  {
    "id": "vid-12-05",
    "title": "Tin học 12 KNTT (ICT) - Bài 14: Định Dạng Giao Diện Bằng CSS",
    "grade": "12",
    "track": "ict",
    "topic": "ict",
    "bookRef": "SGK Tin học 12 KNTT - Bài 14 (Chủ đề D: Định hướng Tin học ứng dụng)",
    "duration": "32:37",
    "durationSec": 1957,
    "level": "Thông hiểu",
    "levelColor": "amber",
    "views": "23.5K",
    "rating": 4.9,
    "instructor": {
      "name": "Thầy Nguyễn Hữu Tuyến",
      "title": "Kênh IT-Master & Giáo viên Chuyên Tin THPT",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "ĐỊNH DẠNG CSS",
    "youtubeId": "J1OeaaB_DdY",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    "description": "Tách biệt nội dung và giao diện trang web với CSS. Cú pháp bộ chọn (Selector theo tên thẻ, class, id), các cách nhúng CSS (Inline, Internal, External) và các thuộc tính định dạng cơ bản: color, font-size, background, margin, padding.",
    "chapters": [
      {
        "time": "00:00",
        "title": "Khái niệm và cú pháp luật CSS: Selector { property: value; }",
        "sec": 0
      },
      {
        "time": "08:30",
        "title": "3 cách liên kết CSS: Inline, Internal và External",
        "sec": 510
      },
      {
        "time": "17:15",
        "title": "Bộ chọn theo tên thẻ, theo Class (.) và theo Id (#)",
        "sec": 1035
      },
      {
        "time": "25:40",
        "title": "Mô hình hộp (Box Model): margin, border, padding, content",
        "sec": 1540
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Trong CSS, bộ chọn nào sau đây được sử dụng để áp dụng kiểu dáng cho phần tử có `id=\"main-nav\"`?",
        "options": [
          ".main-nav",
          "#main-nav",
          "*main-nav",
          "nav.main-nav"
        ],
        "correct": 1,
        "explanation": "Trong CSS, ký tự thăng (#) là ký hiệu đại diện cho bộ chọn Id (#main-nav). Ký tự chấm (.) đại diện cho bộ chọn class."
      }
    ]
  },
  {
    "id": "vid-12-06",
    "title": "Luyện Thi THPT: Cấu Trúc Đề Thi Tốt Nghiệp Môn Tin Học 2025+",
    "grade": "12",
    "track": "all",
    "topic": "exam_practice",
    "bookRef": "Bộ GD&ĐT - Cấu trúc định dạng đề thi tốt nghiệp THPT từ năm 2025",
    "duration": "08:05",
    "durationSec": 485,
    "level": "Tổng hợp",
    "levelColor": "purple",
    "views": "42.1K",
    "rating": 5.0,
    "instructor": {
      "name": "Kênh Học Lập Trình THT",
      "title": "Chuyên gia Luyện thi Tốt nghiệp THPT Môn Tin",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
    },
    "badge": "HƯỚNG DẪN ÔN THI",
    "youtubeId": "QMtj0S1ag9Y",
    "videoUrl": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    "description": "Phân tích ma trận cấu trúc đề thi tốt nghiệp THPT Quốc gia môn Tin học từ năm 2025 theo chương trình GDPT 2018: Phần I (Trắc nghiệm nhiều lựa chọn), Phần II (Trắc nghiệm Đúng/Sai với quy tắc tính điểm lũy tiến 0.1 - 0.25 - 0.5 - 1.0) và Phần III (Trả lời ngắn).",
    "chapters": [
      {
        "time": "00:00",
        "title": "Tổng quan cấu trúc đề thi 50 phút môn Tin học",
        "sec": 0
      },
      {
        "time": "02:15",
        "title": "Phần I: 24 câu hỏi trắc nghiệm 4 chọn 1",
        "sec": 135
      },
      {
        "time": "04:30",
        "title": "Phần II: 4 câu hỏi trắc nghiệm Đúng/Sai & Cách tính điểm",
        "sec": 270
      },
      {
        "time": "06:40",
        "title": "Chiến lược phân bổ thời gian đạt điểm 9-10",
        "sec": 400
      }
    ],
    "quiz": [
      {
        "type": "multiple_choice",
        "question": "Trong Phần II (Câu hỏi trắc nghiệm Đúng/Sai) của đề thi tốt nghiệp THPT từ năm 2025, nếu thí sinh trả lời đúng chính xác cả 4 ý a, b, c, d của một câu hỏi thì sẽ nhận được bao nhiêu điểm cho câu đó?",
        "options": [
          "0.5 điểm",
          "0.75 điểm",
          "1.0 điểm",
          "2.0 điểm"
        ],
        "correct": 2,
        "explanation": "Theo quy chế thi tốt nghiệp THPT từ năm 2025 của Bộ GD&ĐT: đúng 1 ý được 0.1đ; đúng 2 ý được 0.25đ; đúng 3 ý được 0.5đ; đúng cả 4 ý được tối đa 1.0 điểm cho câu đó."
      }
    ]
  }
],

  cheatsheets: []
};
