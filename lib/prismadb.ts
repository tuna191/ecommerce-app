//cách để import PrismaClient từ gói @prisma/client. PrismaClient là một class được cung cấp bởi Prisma để tương tác với cơ sở dữ liệu.
import {PrismaClient} from "@prisma/client"
//Dòng declare global và khối code liền sau đó: Đoạn code này được sử dụng để khai báo một biến toàn cục prisma. 
//Việc khai báo biến này giúp chúng ta có thể truy cập vào PrismaClient từ bất kỳ đâu trong ứng dụng của mình.
declare global {
    var prisma : PrismaClient | undefined

}
//Đây là cách tạo một phiên bản của PrismaClient. Nếu biến prisma đã được định nghĩa (thường là trong môi trường development), 
//chúng ta sử dụng phiên bản đó. Nếu không, chúng ta tạo một phiên bản mới của PrismaClient.
const prismadb = globalThis.prisma || new PrismaClient();
//iểm tra xem chúng ta đang ở môi trường phát triển hay không. Nếu là môi trường phát triển, 
//chúng ta gán biến prisma là prismadb, cho phép chúng ta truy cập vào PrismaClient từ bất kỳ đâu trong ứng dụng.
if(process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb