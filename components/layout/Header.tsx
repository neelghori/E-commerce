import Image from "next/image";
import Input from "@Ecommerce/components/UI/Input";
import Sidebar from "./Sidebar";

const Header: React.FC<any> = (props) => {
  return (
    <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div>
        <Image src="/logo.png" alt="Your Company" width={100} height={100} />
      </div>
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          id="search"
          placeholder="Search..."
          classnames="w-96 !outline-none"
        />
        <Sidebar />
      </div>
    </div>
  );
};

export default Header;
