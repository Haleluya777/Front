export default function Layout({ children }) {
  return (
    <div>
      {/* 공통 헤더나 네비게이션 삽입 가능 */}
      {children}
    </div>
  );
}