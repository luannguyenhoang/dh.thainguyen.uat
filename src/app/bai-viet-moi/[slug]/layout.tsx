import { LayoutPost } from "@/layouts/layoutPost";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LayoutPost>{children}</LayoutPost>
    </>
  );
};

export default Layout;
