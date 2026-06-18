import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const Button01 = ({ text = "Let's Collaborate", link = "#", className = "" }) => {
  return (
    <Button
      asChild
      className={`relative text-sm font-mono font-bold rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer border-none shadow-md ${className}`}
    >
      <Link href={link}>
        <span className="relative z-10 transition-all duration-500 uppercase tracking-widest">
          {text}
        </span>
        <div
          className="absolute right-1 w-10 h-10 bg-current rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45"
        >
          <ArrowUpRight size={16} className="text-white dark:text-black" />
        </div>
      </Link>
    </Button>
  );
};

export default Button01;
