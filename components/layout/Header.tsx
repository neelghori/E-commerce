import Image from "next/image";
import Sidebar from "./Sidebar";
import Search from "@Ecommerce/container/Search/Search";
import Link from "next/link";

const Header: React.FC<any> = (props) => {
  return (
    <div className="mx-auto max-w-[100rem] px-3 lg:px-8 flex justify-between items-center">
      <Link href={"/"} className="flex gap-2 items-center">
        <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] relative">
          <Image src="/logo.png" alt="Your Company" layout="fill" />
        </div>
        <p className="hidden lg:flex lg:text-lg xl:text-xl 2xl:text-4xl font-extrabold">
          E-Commerce
        </p>
      </Link>
      <div className="flex gap-2 items-center  transition-all duration-300">
        <Search />
        <Sidebar />
      </div>
    </div>
  );
};

export default Header;
