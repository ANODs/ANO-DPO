"use client";

import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

const programs = [
  {
    question: "q1"
  },
  {
    question: "q2"
  },
  {
    question: "q3"
  },

]

const TestPage = () => {
  const [question, setQuestion] = useState(0)
  const [finished, setFinished] = useState(false)

  const handleQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setQuestion((prevQuestion) => prevQuestion+1);

    if(question === programs.length - 1) setFinished(true)
  }


  return (
    <div className="min-h-screen flex justify-center items-center ">
      <Card>
        <CardHeader>
          <CardTitle>{programs[question]?.question}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          {!finished && Array.from(Array(5).keys()).map((key) => (
            <div className="w-full border-[1px] rounded-2xl p-4" key={key}>
              <input type="radio" name="program" id={String(key)} value={key} className="mr-2" />
              <label htmlFor={String(key)}>{key}</label>
            </div>
          ))}
          {finished && (
            <h2>finished!</h2>
          )}
          {!finished ? (
            <button onClick={handleQuestion} className="p-4 text-white bg-black rounded-2xl w-[200px]">Начать тест</button>
          ) : (
            <Link href='/' className="p-4 text-white bg-black rounded-2xl w-[200px]">Вернуться на главную</Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TestPage;