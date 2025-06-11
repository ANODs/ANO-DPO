import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Header from "@/components/header";

const NotFound = () => {
  return (

    <div className="relative p-5 flex flex-col items-center justify-center leading-0 mt-52">
      <h2 className="text-[128px] font-bold mb-3">404</h2>
      <p className="text-[#5d5d5d] text-center mb-[30px]">Похоже что-то пошло не так... Страница, на которую Вы пытаетесь попасть не существует или была удалена.</p>
      <Link href="/">
      <Button  className="w-[256px] bg-[#1a1a1a] text-white hover:bg-gray-100">
        На главную
      </Button>
      </Link>
    </div>

  );
};

export default NotFound;