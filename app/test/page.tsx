"use client";

import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

const programs = [
  {
    title: "Program1",
    checked: true
  },
  {
    title: "Program2",
  },
  {
    title: "Program3",
  }
]

const TestPage = () => {
  const [program, setProgram] = useState("")

  const changeProgram = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgram(e.target.value)
  }

  useEffect(()=>{
    console.log(program)
  }, [program])

  return (
    <div className="min-h-screen flex justify-center items-center ">
    <Card>
      <CardHeader>
        <CardTitle>Выберите программу, по которой хотите пройти тестирование</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        {programs.map((program, index) => (
          <div className="w-full border-[1px] rounded-2xl p-4" key={index}>
            <input onChange={changeProgram} type="radio" name="program" id={program.title} value={program.title} className="mr-2" />
            <label htmlFor={program.title}>{program.title}</label>
          </div>
        ))}
        <Link className="p-4 text-white bg-black rounded-2xl w-[200px]" href={`/test/${program}`}>Начать тест</Link>
      </CardContent>
    </Card>
    </div>
  );
};

export default TestPage;