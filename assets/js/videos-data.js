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
      id: "vid-12-01",
      title: "Chủ đề F (CS) Lớp 12: Kỹ thuật Đệ quy & Thuật toán Chia để trị trong Python",
      grade: "12",
      track: "cs",
      topic: "python",
      bookRef: "SGK KNTT Lớp 12 - Chuyên đề Tin học & Chủ đề F",
      duration: "32:45",
      durationSec: 1965,
      level: "Vận dụng cao",
      levelColor: "purple",
      views: "18.4K",
      rating: 4.9,
      instructor: {
        name: "TS. Nguyễn Đăng Khoa",
        title: "Tổ trưởng Chuyên môn Tin học & Giảng viên ĐH Sư Phạm",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      badge: "TRỌNG TÂM THI 2025",
      youtubeId: "rfscVS0vtbw", // Fallback video or real educational video
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
      description: "Phân tích bản chất của đệ quy: điều kiện dừng (base case), bước đệ quy, cơ chế Stack bộ nhớ và bài toán kinh điển (Tháp Hà Nội, Dãy Fibonacci, Merge Sort). Chuyên đề trọng điểm xuất hiện trong phần câu hỏi phân loại 8-10 điểm kỳ thi Tốt nghiệp THPT.",
      chapters: [
        { time: "00:00", title: "Khái niệm hàm đệ quy & Cơ chế Call Stack", sec: 0 },
        { time: "06:15", title: "Cấu trúc 2 thành phần bắt buộc: Base Case & Recursive Case", sec: 375 },
        { time: "14:20", title: "Bài toán Tháp Hà Nội & Phân tích độ phức tạp thời gian O(2^n)", sec: 860 },
        { time: "22:45", title: "Giải các bẫy đề thi THPT: Đệ quy vô hạn (RecursionError)", sec: 1365 },
        { time: "28:10", title: "Chuyển đổi đệ quy sang vòng lặp tối ưu bộ nhớ", sec: 1690 }
      ],
      sampleCode: `# Ví dụ thuật toán Đệ quy tính lũy thừa nhanh O(log N)
def power_fast(a, n):
    if n == 0:
        return 1
    half = power_fast(a, n // 2)
    if n % 2 == 0:
        return half * half
    else:
        return half * half * a

# Thử nghiệm với cơ số 2 lũy thừa 10
result = power_fast(2, 10)
print(f"2^10 = {result}") # Kết quả mong đợi: 1024
`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Trong Python, điều gì sẽ xảy ra nếu một hàm đệ quy không có trường hợp cơ sở (base case)?",
          options: [
            "Chương trình chạy mãi mãi mà không bao giờ kết thúc",
            "Trình thông dịch báo lỗi RecursionError: maximum recursion depth exceeded",
            "Chương trình tự động gán giá trị trả về là 0",
            "Chương trình giải phóng RAM và chuyển sang vòng lặp While"
          ],
          correct: 1,
          explanation: "Khi không có base case, Stack bộ nhớ bị lấp đầy liên tục vượt quá giới hạn đệ quy cho phép trong Python (mặc định 1000 cuộc gọi), dẫn đến ngoại lệ `RecursionError`."
        },
        {
          type: "true_false",
          prompt: "Cho hàm Python sau:\n```python\ndef f(n):\n    if n <= 1: return 1\n    return n * f(n - 1)\n```\nHãy xác định tính Đúng/Sai của các mệnh đề sau theo định dạng đề thi mới:",
          statements: [
            { id: "a", text: "Hàm f(n) thực hiện tính giai thừa n! của số nguyên dương n.", correct: true },
            { id: "b", text: "Trường hợp cơ sở (base case) của hàm là khi n <= 1.", correct: true },
            { id: "c", text: "Nếu gọi f(4), tổng số lần hàm f được gọi (kể cả lần gọi đầu tiên) là 5 lần.", correct: false, note: "f(4) gọi f(3), f(2), f(1) -> Tổng cộng 4 lần gọi." },
            { id: "d", text: "Độ phức tạp không gian (Space Complexity) của thuật toán là O(1).", correct: false, note: "Do sử dụng Stack đệ quy n cấp nên độ phức tạp bộ nhớ là O(n)." }
          ]
        }
      ],
      documents: [
        { name: "Mindmap_DeQuy_Python_KNTT12.pdf", size: "2.4 MB", type: "pdf" },
        { name: "Bo_50_Cau_Trac_Nghiem_DeQuy_CoDapAn.pdf", size: "1.8 MB", type: "pdf" }
      ]
    },

    {
      id: "vid-12-02",
      title: "Chủ đề D (ICT) Lớp 12: Thiết kế Hệ Cơ sở dữ liệu quan hệ & Ngôn ngữ SQL",
      grade: "12",
      track: "ict",
      topic: "sql_db",
      bookRef: "SGK KNTT Lớp 12 - Định hướng Tin học ứng dụng (ICT)",
      duration: "41:10",
      durationSec: 2470,
      level: "Vận dụng",
      levelColor: "cyan",
      views: "24.1K",
      rating: 5.0,
      instructor: {
        name: "Cô ThS. Lê Thu Thảo",
        title: "Tác giả biên soạn tài liệu bồi dưỡng GDPT 2018",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
      },
      badge: "ĐỀ XUẤT HỌC NGAY",
      youtubeId: "HXV3zeRR3h4",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      poster: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
      description: "Nắm vững toàn bộ kiến thức CSDL quan hệ: Khóa chính (Primary Key), Khóa ngoại (Foreign Key), Bậc quan hệ 1-1, 1-N, N-N. Hướng dẫn chi tiết cú pháp SQL: SELECT, WHERE, GROUP BY, HAVING, INNER JOIN chuẩn định dạng đề thi Tốt nghiệp THPT.",
      chapters: [
        { time: "00:00", title: "Tổng quan Mô hình dữ liệu quan hệ theo SGK Kết nối tri thức", sec: 0 },
        { time: "08:30", title: "Quy tắc xác định Khóa chính, Khóa ngoại & Toàn vẹn tham chiếu", sec: 510 },
        { time: "18:00", title: "Cú pháp truy vấn SQL cơ bản: SELECT, FROM, WHERE, ORDER BY", sec: 1080 },
        { time: "29:15", title: "Truy vấn nâng cao: Gom nhóm GROUP BY, Điều kiện nhóm HAVING", sec: 1755 },
        { time: "36:40", title: "Kỹ thuật liên kết bảng INNER JOIN & Giải câu trắc nghiệm mã đề 2025", sec: 2200 }
      ],
      sampleCode: `-- Bảng HOC_SINH và KET_QUA_THI
SELECT 
    HOC_SINH.MaHS,
    HOC_SINH.HoTen,
    AVG(KET_QUA_THI.Diem) AS DiemTrungBinh
FROM HOC_SINH
INNER JOIN KET_QUA_THI ON HOC_SINH.MaHS = KET_QUA_THI.MaHS
WHERE HOC_SINH.Lop = '12A1'
GROUP BY HOC_SINH.MaHS, HOC_SINH.HoTen
HAVING AVG(KET_QUA_THI.Diem) >= 8.0
ORDER BY DiemTrungBinh DESC;
`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Trong câu lệnh SQL, mệnh đề nào được sử dụng để lọc dữ liệu sau khi đã thực hiện gom nhóm bằng GROUP BY?",
          options: [
            "WHERE",
            "HAVING",
            "FILTER BY",
            "ORDER BY"
          ],
          correct: 1,
          explanation: "`WHERE` lọc trên từng bản ghi đơn lẻ trước khi gom nhóm, còn `HAVING` lọc trên các nhóm sau khi gom nhóm bởi `GROUP BY`."
        },
        {
          type: "true_false",
          prompt: "Cho hai bảng trong CSDL trường học:\n- LOP(MaLop, TenLop, GiaoVienCN)\n- HOCSINH(MaHS, HoTen, NgaySinh, MaLop)\nXét các phát biểu sau:",
          statements: [
            { id: "a", text: "MaLop trong bảng HOCSINH đóng vai trò là Khóa ngoại tham chiếu đến bảng LOP.", correct: true },
            { id: "b", text: "Một học sinh có thể đồng thời thuộc về nhiều lớp học khác nhau trong mô hình này.", correct: false, note: "Mỗi học sinh chỉ chứa duy nhất 1 MaLop nên quan hệ là 1-N (1 lớp nhiều học sinh)." },
            { id: "c", text: "Trường MaHS bắt buộc phải là duy nhất và không được chứa giá trị NULL.", correct: true, note: "MaHS là Khóa chính (Primary Key)." },
            { id: "d", text: "Nếu xóa một lớp trong bảng LOP, việc có cho phép xóa các học sinh lớp đó hay không phụ thuộc vào quy tắc Ràng buộc toàn vẹn tham chiếu (ON DELETE CASCADE).", correct: true }
          ]
        }
      ],
      documents: [
        { name: "So_Tay_SQL_Cho_Hoc_Sinh_THPT_KNTT.pdf", size: "3.1 MB", type: "pdf" },
        { name: "Bai_Tap_Mo_Hinh_ERD_Sang_CSDL_Quan_He.pdf", size: "2.0 MB", type: "pdf" }
      ]
    },

    {
      id: "vid-12-03",
      title: "Chủ đề A Lớp 12: Trí tuệ Nhân tạo (AI), Học máy & Tác động xã hội",
      grade: "12",
      track: "all",
      topic: "ai_modern",
      bookRef: "SGK KNTT Lớp 12 - Chủ đề A: Máy tính và xã hội tri thức",
      duration: "28:15",
      durationSec: 1695,
      level: "Cơ bản - Thông hiểu",
      levelColor: "emerald",
      views: "15.9K",
      rating: 4.8,
      instructor: {
        name: "Thầy Trần Bảo Long",
        title: "Kỹ sư Trí tuệ nhân tạo & Cố vấn giáo dục STEM",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
      },
      badge: "KIẾN THỨC MỚI GDPT 2018",
      youtubeId: "aircAruvnKk",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
      description: "Bài giảng chuẩn mực về Khái niệm AI hẹp (Narrow AI) vs AI tổng quát (AGI), nguyên lý Học máy (Machine Learning), Học sâu (Deep Learning), các mô hình ngôn ngữ lớn (LLM) và vấn đề đạo đức, an toàn khi sử dụng AI theo SGK Kết nối tri thức Lớp 12.",
      chapters: [
        { time: "00:00", title: "Lịch sử phát triển và phân loại các cấp độ Trí tuệ nhân tạo", sec: 0 },
        { time: "07:20", title: "Phân biệt Trí tuệ nhân tạo hẹp (Narrow AI) và AGI", sec: 440 },
        { time: "14:10", title: "Quy trình huấn luyện mô hình Học máy: Thu thập -> Tiền xử lý -> Huấn luyện -> Đánh giá", sec: 850 },
        { time: "21:30", title: "Các bài toán ứng dụng: Nhận diện khuôn mặt, Xử lý ngôn ngữ tự nhiên (NLP)", sec: 1290 },
        { time: "25:00", title: "Đạo đức AI & Các câu hỏi lý thuyết trắc nghiệm THPT Quốc gia", sec: 1500 }
      ],
      sampleCode: `# Minh họa mô hình phân loại đơn giản (Khái niệm trong SGK KNTT 12)
features = ["Có email đuôi .edu", "Chứa từ 'Trúng thưởng'", "Đính kèm link lạ"]

def check_spam(email_keywords):
    spam_score = 0
    if "Trúng thưởng" in email_keywords: spam_score += 40
    if "Link lạ" in email_keywords: spam_score += 50
    if "Đuôi .edu" in email_keywords: spam_score -= 30
    
    return "THƯ RÁC (SPAM)" if spam_score >= 50 else "THƯ HỢP LỆ"

print("Kết quả đánh giá:", check_spam(["Trúng thưởng", "Link lạ"]))
`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Hệ thống AI hiện nay như ChatGPT, xe tự hành Tesla hay hệ thống nhận diện khuôn mặt được xếp vào loại nào?",
          options: [
            "Trí tuệ nhân tạo hẹp (Narrow AI / Weak AI)",
            "Trí tuệ nhân tạo tổng quát (General AI / Strong AI)",
            "Siêu trí tuệ nhân tạo (Super AI)",
            "Trí tuệ nhân tạo tự nhận thức (Self-aware AI)"
          ],
          correct: 0,
          explanation: "Hiện nay tất cả các công nghệ AI trên thế giới đều thuộc nhóm Narrow AI (chỉ làm tốt trong một phạm vi hẹp cụ thể), chưa đạt tới ngưỡng AGI."
        }
      ],
      documents: [
        { name: "Tong_Hop_Kien_Thuc_AI_SGK_KNTT12.pdf", size: "1.5 MB", type: "pdf" }
      ]
    },

    {
      id: "vid-12-04",
      title: "Luyện Đề 2025 Số 01: Chữa Đề Minh Họa Tốt Nghiệp THPT Môn Tin Học",
      grade: "12",
      track: "all",
      topic: "exam_practice",
      bookRef: "Bộ đề chuẩn ma trận đánh giá năng lực GDPT 2018 - Bộ GD&ĐT",
      duration: "55:00",
      durationSec: 3300,
      level: "Tổng hợp toàn diện",
      levelColor: "amber",
      views: "42.8K",
      rating: 5.0,
      instructor: {
        name: "TS. Nguyễn Đăng Khoa & Thầy Bảo Long",
        title: "Ban Cố vấn Chuyên môn Khối THPT",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      badge: "HOT THI THPT",
      youtubeId: "kJQP7kiw5Fk",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      poster: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
      description: "Chữa chi tiết 100% câu hỏi đề thi minh họa theo 3 phần mới nhất của Bộ Giáo Dục: Phần I (Trắc nghiệm 4 lựa chọn), Phần II (Trắc nghiệm Đúng/Sai 4 ý - cách tính điểm lũy tiến 0.1 - 0.25 - 0.5 - 1.0), Phần III (Trả lời ngắn, tính kết quả thuật toán).",
      chapters: [
        { time: "00:00", title: "Phân tích cấu trúc ma trận đề thi Tốt nghiệp THPT 2025+", sec: 0 },
        { time: "05:30", title: "Phần I: 24 câu hỏi trắc nghiệm nhiều lựa chọn", sec: 330 },
        { time: "24:10", title: "Phần II: 4 câu hỏi trắc nghiệm Đúng/Sai (Kỹ năng né bẫy)", sec: 1450 },
        { time: "42:00", title: "Phần III: 6 câu hỏi trả lời ngắn dạng bài toán lập trình & CSDL", sec: 2520 },
        { time: "50:15", title: "Chiến lược phân bổ 50 phút làm bài đạt điểm 9-10", sec: 3015 }
      ],
      sampleCode: `# Câu hỏi phần III trong đề thi minh họa:
# Cho đoạn chương trình sau, hỏi sau khi kết thúc, giá trị biến S là bao nhiêu?
arr = [3, 8, 12, 5, 9, 14, 2]
s = 0
for x in arr:
    if x % 2 == 0 and x > 6:
        s += x

print("Giá trị S:", s) # Đáp án: 8 + 12 + 14 = 34
`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Đoạn chương trình Python sau in ra giá trị gì: `a = [1, 2, 3]; b = a; b.append(4); print(len(a))`?",
          options: ["3", "4", "Báo lỗi IndexError", "Báo lỗi TypeError"],
          correct: 1,
          explanation: "Trong Python, phép gán `b = a` không tạo bản sao mảng mà gán tham chiếu cùng chỉ tới một đối tượng list. Do đó khi `b` append thì `a` cũng thay đổi, độ dài của `a` là 4."
        },
        {
          type: "true_false",
          prompt: "Xét cấu trúc tính điểm của câu hỏi Trắc nghiệm Đúng/Sai trong kỳ thi Tốt nghiệp THPT môn Tin học từ năm 2025:",
          statements: [
            { id: "a", text: "Thí sinh trả lời đúng 1 ý trong 1 câu được 0.1 điểm.", correct: true },
            { id: "b", text: "Thí sinh trả lời đúng 2 ý trong 1 câu được 0.25 điểm.", correct: true },
            { id: "c", text: "Thí sinh trả lời đúng 3 ý trong 1 câu được 0.75 điểm.", correct: false, note: "Đúng 3 ý được 0.50 điểm." },
            { id: "d", text: "Thí sinh trả lời đúng trọn vẹn cả 4 ý được 1.0 điểm.", correct: true }
          ]
        }
      ],
      documents: [
        { name: "De_Minh_Hoa_THPT_2025_TinHoc_Kem_Giai_ChiTiet.pdf", size: "4.2 MB", type: "pdf" },
        { name: "Bang_Ma_Tran_Phan_Bo_Cau_Hoi.pdf", size: "1.1 MB", type: "pdf" }
      ]
    },

    {
      id: "vid-11-01",
      title: "Chủ đề F (CS) Lớp 11: Các Thuật toán Sắp xếp cơ bản & Phân tích Độ phức tạp O(n²)",
      grade: "11",
      track: "cs",
      topic: "python",
      bookRef: "SGK KNTT Lớp 11 - Định hướng Khoa học máy tính",
      duration: "36:20",
      durationSec: 2180,
      level: "Thông hiểu - Vận dụng",
      levelColor: "cyan",
      views: "19.3K",
      rating: 4.9,
      instructor: {
        name: "TS. Nguyễn Đăng Khoa",
        title: "Tổ trưởng Chuyên môn Tin học & Giảng viên ĐH Sư Phạm",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      badge: "KHOA HỌC MÁY TÍNH",
      youtubeId: "kPRA0W1kECg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      poster: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      description: "Trực quan hóa sinh động 3 thuật toán sắp xếp trọng tâm SGK Lớp 11 Kết nối tri thức: Sắp xếp chèn (Insertion Sort), Sắp xếp chọn (Selection Sort), Sắp xếp nổi bọt (Bubble Sort). Đếm số phép so sánh và số phép hoán đổi.",
      chapters: [
        { time: "00:00", title: "Tầm quan trọng của bài toán sắp xếp trong Tin học", sec: 0 },
        { time: "05:15", title: "Thuật toán Sắp xếp chọn (Selection Sort): Ý tưởng & Cài đặt", sec: 315 },
        { time: "15:40", title: "Thuật toán Sắp xếp chèn (Insertion Sort): Tối ưu danh sách gần sắp xếp", sec: 940 },
        { time: "24:30", title: "Thuật toán Sắp xếp nổi bọt (Bubble Sort) & Tối ưu cờ hiệu (flag swapped)", sec: 1470 },
        { time: "31:00", title: "So sánh độ phức tạp thời gian Best, Worst, Average Case", sec: 1860 }
      ],
      sampleCode: `# Thuật toán Bubble Sort tối ưu có gắn cờ swapped
def bubble_sort(a):
    n = len(a)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a

test_list = [64, 34, 25, 12, 22, 11, 90]
print("Mảng trước khi sắp xếp:", test_list)
print("Mảng sau khi sắp xếp:  ", bubble_sort(test_list))
`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Trong trường hợp tốt nhất (dãy số đã được sắp xếp tăng dần sẵn), thuật toán Sắp xếp chèn (Insertion Sort) có độ phức tạp thời gian là bao nhiêu?",
          options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
          correct: 2,
          explanation: "Khi dãy đã có thứ tự sẵn, mỗi phần tử chỉ cần 1 phép so sánh với phần tử trước nó để xác định vị trí nên độ phức tạp tốt nhất là O(n)."
        }
      ],
      documents: [
        { name: "Mo_Phong_Truc_Quan_Thuat_Toan_Sap_Xep.pdf", size: "2.8 MB", type: "pdf" }
      ]
    },

    {
      id: "vid-11-02",
      title: "Chủ đề B Lớp 11: Mạng Máy Tính, Giao Thức TCP/IP & An Toàn Không Gian Mạng",
      grade: "11",
      track: "all",
      topic: "network_security",
      bookRef: "SGK KNTT Lớp 11 - Chủ đề B: Mạng máy tính và Internet",
      duration: "30:40",
      durationSec: 1840,
      level: "Thông hiểu",
      levelColor: "cyan",
      views: "14.7K",
      rating: 4.8,
      instructor: {
        name: "Cô ThS. Lê Thu Thảo",
        title: "Tác giả biên soạn tài liệu bồi dưỡng GDPT 2018",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
      },
      badge: "LÝ THUYẾT ĂN ĐIỂM",
      youtubeId: "P2cK0F6Vv3g",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      poster: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
      description: "Tìm hiểu kiến trúc mô hình TCP/IP, địa chỉ IPv4 vs IPv6, tên miền DNS, thiết bị mạng (Switch, Router, Access Point). Các biện pháp phòng chống mã độc (Virus, Worm, Trojan, Ransomware) và Luật an ninh mạng Việt Nam.",
      chapters: [
        { time: "00:00", title: "Cấu tạo & phân loại mạng máy tính (LAN, WAN, WLAN)", sec: 0 },
        { time: "07:45", title: "Giao thức IP & Phân biệt IPv4 (32 bit) với IPv6 (128 bit)", sec: 465 },
        { time: "16:20", title: "Hệ thống phân giải tên miền DNS & Hoạt động của trình duyệt", sec: 980 },
        { time: "23:10", title: "Phân loại mã độc máy tính & Cơ chế tấn công Lừa đảo (Phishing)", sec: 1390 },
        { time: "27:50", title: "Quy tắc bảo vệ dữ liệu cá nhân & Luật An ninh mạng", sec: 1670 }
      ],
      sampleCode: `# Mô phỏng kiểm tra tính hợp lệ của địa chỉ IPv4
def is_valid_ipv4(ip_str):
    octets = ip_str.split('.')
    if len(octets) != 4:
        return False
    for octet in octets:
        if not octet.isdigit(): return False
        val = int(octet)
        if val < 0 or val > 255: return False
        if len(octet) > 1 and octet[0] == '0': return False # Tránh số bắt đầu bằng 0
    return True

print("Kiểm tra 192.168.1.1:", is_valid_ipv4("192.168.1.1"))
print("Kiểm tra 256.10.0.1:  ", is_valid_ipv4("256.10.0.1"))
`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Địa chỉ IPv4 bao gồm bao nhiêu bit và được chia thành bao nhiêu octet (nhóm số thập phân)?",
          options: [
            "32 bit, chia làm 4 octet",
            "64 bit, chia làm 8 octet",
            "128 bit, chia làm 8 octet",
            "16 bit, chia làm 2 octet"
          ],
          correct: 0,
          explanation: "Địa chỉ IPv4 gồm 32 bit nhị phân, biểu diễn dưới dạng 4 số thập phân (mỗi số tương ứng 1 octet = 8 bit, từ 0 đến 255) ngăn cách nhau bởi dấu chấm."
        }
      ],
      documents: [
        { name: "So_Do_He_Thong_Mang_Internet_KNTT11.pdf", size: "1.9 MB", type: "pdf" }
      ]
    },

    {
      id: "vid-10-01",
      title: "Chủ đề F Lớp 10: Nhập môn Python Căn bản - Cú pháp, Kiểu dữ liệu & Cấu trúc rẽ nhánh",
      grade: "10",
      track: "all",
      topic: "python",
      bookRef: "SGK KNTT Lớp 10 - Bài 16 đến Bài 24",
      duration: "34:10",
      durationSec: 2050,
      level: "Cơ bản - Nền tảng",
      levelColor: "emerald",
      views: "31.2K",
      rating: 4.9,
      instructor: {
        name: "TS. Nguyễn Đăng Khoa",
        title: "Tổ trưởng Chuyên môn Tin học & Giảng viên ĐH Sư Phạm",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      badge: "NỀN TẢNG CỐT LÕI",
      youtubeId: "kqtD5dpn9C8",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      poster: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
      description: "Xây dựng tư duy lập trình vững chắc từ con số 0: Biến, kiểu dữ liệu int, float, str, bool; phép toán số học & logic (and, or, not); cấu trúc rẽ nhánh if-elif-else và các bài toán thực tế trong SGK Kết nối tri thức.",
      chapters: [
        { time: "00:00", title: "Môi trường lập trình Python (IDLE & VS Code)", sec: 0 },
        { time: "05:10", title: "Quy tắc đặt tên biến, từ khóa và các kiểu dữ liệu chuẩn", sec: 310 },
        { time: "13:20", title: "Các phép toán chia nguyên //, chia lấy dư % và lũy thừa **", sec: 800 },
        { time: "21:00", title: "Cấu trúc rẽ nhánh if - elif - else và thụt lề Indentation", sec: 1260 },
        { time: "28:30", title: "Thực hành giải 3 bài toán kiểm tra số nguyên tố và năm nhuận", sec: 1710 }
      ],
      sampleCode: `# Bài toán tính tiền điện theo bậc thang (SGK KNTT 10)
so_kwh = 125
tien = 0

if so_kwh <= 50:
    tien = so_kwh * 1678
elif so_kwh <= 100:
    tien = 50 * 1678 + (so_kwh - 50) * 1734
else:
    tien = 50 * 1678 + 50 * 1734 + (so_kwh - 100) * 2014

print(f"Tổng tiền điện cho {so_kwh} kWh là: {tien:,} VNĐ")
`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Trong Python, kết quả của biểu thức `19 // 4 + 19 % 4` là bao nhiêu?",
          options: ["7", "8", "4.75", "19"],
          correct: 0,
          explanation: "`19 // 4` bằng 4 (phép chia lấy phần nguyên). `19 % 4` bằng 3 (phép chia lấy phần dư). 4 + 3 = 7."
        }
      ],
      documents: [
        { name: "Bang_Tong_Hop_Cu_Phap_Python_Lop10.pdf", size: "1.2 MB", type: "pdf" }
      ]
    },

    {
      id: "vid-10-02",
      title: "Chủ đề A Lớp 10: Biểu Diễn Dữ Liệu Nhị Phân (Binary), Bảng Mã ASCII & Unicode",
      grade: "10",
      track: "all",
      topic: "python",
      bookRef: "SGK KNTT Lớp 10 - Bài 3 đến Bài 6",
      duration: "26:50",
      durationSec: 1610,
      level: "Cơ bản",
      levelColor: "emerald",
      views: "16.1K",
      rating: 4.7,
      instructor: {
        name: "Thầy Trần Bảo Long",
        title: "Kỹ sư Trí tuệ nhân tạo & Cố vấn giáo dục STEM",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
      },
      badge: "LÝ THUYẾT CỐT LÕI",
      youtubeId: "LFA_V_oJ1Xk",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
      description: "Hiểu sâu bản chất cách máy tính lưu trữ thông tin: Chuyển đổi giữa hệ thập phân (Dec), hệ nhị phân (Bin) và hệ thập lục phân (Hex). Các đơn vị đo dung lượng Bit, Byte, KB, MB, GB, TB và bảng mã ký tự Unicode.",
      chapters: [
        { time: "00:00", title: "Khái niệm thông tin và dữ liệu trong kỷ nguyên số", sec: 0 },
        { time: "06:20", title: "Quy tắc chuyển đổi số Thập phân sang Nhị phân và ngược lại", sec: 380 },
        { time: "14:15", title: "Hệ thập lục phân (Hexadecimal) và ứng dụng trong mã hóa màu RGB", sec: 855 },
        { time: "20:00", title: "Biểu diễn văn bản: Bảng mã ASCII (1 Byte) và Unicode UTF-8", sec: 1200 },
        { time: "24:30", title: "Tính toán dung lượng lưu trữ hình ảnh và âm thanh số", sec: 1470 }
      ],
      sampleCode: `# Chuyển đổi số trong Python
num = 156
bin_str = bin(num) # Dạng nhị phân
hex_str = hex(num) # Dạng Hex

print(f"Số thập phân: {num}")
print(f"Nhị phân:     {bin_str} (bỏ tiền tố 0b -> {bin_str[2:]})")
print(f"Thập lục phân:{hex_str} (bỏ tiền tố 0x -> {hex_str[2:].upper()})")
`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Số nhị phân 11010 trong hệ thập phân có giá trị tương ứng là bao nhiêu?",
          options: ["26", "24", "28", "22"],
          correct: 0,
          explanation: "1*2^4 + 1*2^3 + 0*2^2 + 1*2^1 + 0*2^0 = 16 + 8 + 0 + 2 + 0 = 26."
        }
      ],
      documents: [
        { name: "Cach_Chuyen_Doi_He_Dem_Nhi_Phan.pdf", size: "1.4 MB", type: "pdf" }
      ]
    },

    {
      id: "vid-12-05",
      title: "Chủ đề F (CS) Lớp 12: Cấu trúc Dữ liệu Ngăn Xếp (Stack) & Hàng Đợi (Queue)",
      grade: "12",
      track: "cs",
      topic: "python",
      bookRef: "SGK KNTT Lớp 12 - Chuyên đề học tập Tin học 12",
      duration: "38:10",
      durationSec: 2290,
      level: "Vận dụng cao",
      levelColor: "purple",
      views: "17.6K",
      rating: 4.9,
      instructor: {
        name: "TS. Nguyễn Đăng Khoa",
        title: "Tổ trưởng Chuyên môn Tin học & Giảng viên ĐH Sư Phạm",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      badge: "NÂNG CAO 9-10 ĐIỂM",
      youtubeId: "I5lre-jT70M",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      poster: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
      description: "Nguyên lý LIFO (Vào sau - Ra trước) của Stack và FIFO (Vào trước - Ra trước) của Queue. Cài đặt hoàn chỉnh bằng Python List và module `collections.deque`. Ứng dụng giải bài toán kiểm tra tính hợp lệ của dấu ngoặc và hàng đợi in ấn.",
      chapters: [
        { time: "00:00", title: "Tổng quan các cấu trúc dữ liệu trừu tượng (ADT)", sec: 0 },
        { time: "06:30", title: "Nguyên lý Stack LIFO & Các thao tác push, pop, peek, is_empty", sec: 390 },
        { time: "16:15", title: "Thuật toán kiểm tra dấu ngoặc hợp lệ bằng Stack (Bài tập thi THPT)", sec: 975 },
        { time: "26:00", title: "Nguyên lý Queue FIFO & Tối ưu hóa với deque trong Python", sec: 1560 },
        { time: "33:40", title: "Tổng kết so sánh và các dạng bẫy trắc nghiệm lý thuyết", sec: 2020 }
      ],
      sampleCode: `# Kiểm tra chuỗi ngoặc ngoặc tròn () có hợp lệ hay không bằng Stack
def is_valid_parentheses(s):
    stack = []
    for char in s:
        if char == '(':
            stack.append(char)
        elif char == ')':
            if not stack:
                return False
            stack.pop()
    return len(stack) == 0

print("Chuỗi '(())()' hợp lệ?", is_valid_parentheses("(())()")) # True
print("Chuỗi '(()' hợp lệ?   ", is_valid_parentheses("(()"))    # False
`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Cấu trúc dữ liệu Ngăn xếp (Stack) hoạt động theo nguyên lý nào sau đây?",
          options: [
            "LIFO (Last In First Out - Vào sau ra trước)",
            "FIFO (First In First Out - Vào trước ra trước)",
            "LILO (Last In Last Out - Vào sau ra sau)",
            "Priority Ordering (Theo thứ tự ưu tiên)"
          ],
          correct: 0,
          explanation: "Stack hoạt động theo cơ chế LIFO: phần tử được thêm vào sau cùng sẽ được lấy ra đầu tiên."
        }
      ],
      documents: [
        { name: "Cau_Truc_Du_Lieu_Stack_Queue_KNTT12.pdf", size: "2.1 MB", type: "pdf" }
      ]
    }
  ],

  // Mindmaps & Cheatsheets kiến thức cốt lõi ôn thi THPT Quốc Gia
  cheatSheets: [
    {
      title: "Bảng Tra Cứu Cú Pháp Python Trọng Tâm THPT 2025",
      category: "Python",
      items: [
        { code: "len(s)", desc: "Trả về độ dài chuỗi hoặc số phần tử danh sách" },
        { code: "s.split(sep)", desc: "Tách chuỗi thành danh sách theo ký tự phân cách" },
        { code: "a.append(x)", desc: "Thêm phần tử x vào cuối danh sách a" },
        { code: "a.sort(reverse=True)", desc: "Sắp xếp danh sách giảm dần trực tiếp" },
        { code: "range(start, stop, step)", desc: "Tạo dãy số từ start đến stop - 1 với bước nhảy step" },
        { code: "dict.get(key, default)", desc: "Lấy giá trị an toàn không bị sinh lỗi KeyError" }
      ]
    },
    {
      title: "Các Lệnh SQL Chuẩn SGK KNTT 12 Tin Học Ứng Dụng",
      category: "SQL",
      items: [
        { code: "SELECT col1, col2 FROM table", desc: "Trích xuất cột dữ liệu từ bảng" },
        { code: "WHERE condition", desc: "Điều kiện lọc dòng (dùng AND, OR, NOT, LIKE, IN)" },
        { code: "INNER JOIN table2 ON condition", desc: "Nối 2 bảng theo khóa chính - khóa ngoại" },
        { code: "GROUP BY col HAVING condition", desc: "Gom nhóm và điều kiện lọc trên hàm tổng hợp (SUM, AVG, COUNT)" },
        { code: "ORDER BY col DESC/ASC", desc: "Sắp xếp kết quả tăng dần hoặc giảm dần" }
      ]
    }
  ]
};
