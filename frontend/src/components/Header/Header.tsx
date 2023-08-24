import AppHeader from "./AppHeader";
import Link from "next/link";

type Props = {
  title?: string;
};

const Header: React.FC<Props> = ({ title }) => {
  return (
    <>
      <AppHeader title={title}/>

      <nav>
        <div className="app-max-width w-full">
          <div className="flex-1 flex justify-center items-center cursor-pointer">
            <Link href="/">
              <span className="text-xl"> Tracking Book Reading Exercise </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;