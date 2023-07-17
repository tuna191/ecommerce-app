import { authMiddleware } from "@clerk/nextjs";
// giải pháp cho việc khi mà copy url nó chỉ hoạt động trên localhost --> nghĩa là url đó vẫn chưa đc public
export default authMiddleware({
  publicRoutes: ["/api/:path*"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
