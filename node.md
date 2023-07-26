---
title: "những thư viện đã dùng"
date: 2023-7-10
---

+ shadcn UI --> ko phải là thư viện , nó là collection các component đã đc code sẵn , chỉ việc copy -> khá hay , giúp làm ui nhanh, làm dashboard nhanh hơn

+ Clerk authentication là một thư viện xác thực và quản lý người dùng, cung cấp các tính năng như đăng nhập, đăng ký, quên mật khẩu, xác thực email và quản lý thông tin người dùng trong ứng dụng web. Thư viện Clerk giúp đơn giản hóa việc xây dựng hệ thống xác thực phức tạp và cung cấp một giao diện người dùng hiện đại và linh hoạt.

+Thư viện Prisma là một ORM (Object-Relational Mapping) cho Node.js và TypeScript. Nó cung cấp một cách dễ dàng để tương tác với cơ sở dữ liệu trong ứng dụng của bạn.

{
    một số câu lệnh:
    npx prisma generate // khởi tạo
    npx prisma migrate reset // reset lại database và lấy lại dữ liệu đã mất
    npx prisma db push //Lệnh npx prisma db push được sử dụng để đồng bộ hóa lược đồ Prisma của bạn với lược đồ cơ sở dữ liệu
}
+ PlanetScaleDB cho phép lưu trữ và quản lý dữ liệu quy mô lớn, đồng thời cung cấp tính năng như đảm bảo tính sẵn sàng (high availability), sao lưu và phục hồi dữ liệu (backup and recovery), và quản lý phiên bản dữ liệu (data versioning). Nó giúp giảm thiểu sự cố về quy mô dữ liệu và cho phép các ứng dụng xử lý khối lượng lớn dữ liệu và tải truy vấn cao.

+Axios là một thư viện JavaScript được sử dụng để gửi các yêu cầu HTTP từ một ứng dụng web đến một máy chủ. Nó là một công cụ mạnh mẽ và dễ sử dụng cho việc tương tác với API và truyền dữ liệu qua mạng.

+react hot toast là một thư viện để hiện thông báo một cách đẹp mắt

+ window.location.assign() là một phương thức của đối tượng window.location trong JavaScript, được sử dụng để chuyển hướng trình duyệt đến một URL mới. Trong đoạn code bạn đưa ra, phương thức assign() được gọi với một đối số là một chuỗi nội suy, có giá trị là /${response.data.id}.

+ Cloudinary là một dịch vụ quản lý hình ảnh và video trên đám mây. Nó cung cấp các công cụ và tính năng mạnh mẽ để tải lên, lưu trữ, quản lý và tạo biểu đồ cho các tệp đa phương tiện trên ứng dụng web và di động.

+ date-fns : chuyển đổi dạng date thành string 

Zustand là một thư viện quản lý trạng thái (state management) cho ứng dụng React. Nó được thiết kế để giúp quản lý trạng thái của ứng dụng một cách đơn giản, hiệu quả và linh hoạt.

Một số đặc điểm và lợi ích của Zustand là:

Trạng thái kiểu Hook: Zustand sử dụng hook của React để quản lý trạng thái, giúp bạn viết mã dễ đọc và dễ hiểu hơn.

Tự động kết hợp và cập nhật trạng thái: Khi trạng thái thay đổi, Zustand sẽ tự động kết hợp và cập nhật lại các thành phần sử dụng trạng thái đó mà không cần sử dụng Redux hoặc MobX.

Trạng thái toàn cục: Trạng thái được lưu trữ ở một nơi duy nhất và có thể được chia sẻ và sử dụng trong nhiều thành phần khác nhau của ứng dụng.

Tối ưu hiệu suất: Zustand được tối ưu hóa để tránh render không cần thiết và sử dụng memoization để tăng hiệu suất.

Không cần Redux: Với Zustand, bạn không cần phải sử dụng Redux để quản lý trạng thái lớn và phức tạp. Thay vào đó, Zustand giúp bạn quản lý trạng thái một cách đơn giản và hiệu quả hơn.

Dễ dàng tích hợp với React: Zustand được thiết kế để dễ dàng tích hợp và sử dụng cùng với React và các thư viện khác.

Recharts là một gói thư viện React được sử dụng để tạo các biểu đồ dữ liệu động và tương tác. Nó cung cấp một tập hợp các thành phần dễ sử dụng để tạo các loại biểu đồ phổ biến như biểu đồ đường, biểu đồ cột, biểu đồ hình tròn, biểu đồ hình tròn, biểu đồ tia, và nhiều loại biểu đồ khác