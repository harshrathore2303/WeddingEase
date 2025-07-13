import React from "react";
import Slider from '../Slider/Slider'
import CustomButton from "./CustomButton";
import { Card } from "./Card";
import slides from "../../assets/data/homeslider.json"

export default function Home() {
  const feedbacks = [
    {
      id: 1,
      title: "Great site",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aliquam voluptatibus quae?",
      img: "https://res.cloudinary.com/dpsgxzjzw/image/upload/v1751630504/pics_ozoeew.jpg",
    },
    {
      id: 2,
      title: "Great site",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aliquam voluptatibus quae?",
      img: "https://res.cloudinary.com/dpsgxzjzw/image/upload/v1751630504/pics_ozoeew.jpg",
    },
    {
      id: 3,
      title: "Great site",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aliquam voluptatibus quae?",
      img: "https://res.cloudinary.com/dpsgxzjzw/image/upload/v1751630504/pics_ozoeew.jpg",
    },
    {
      id: 4,
      title: "Great site",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aliquam voluptatibus quae?",
      img: "https://res.cloudinary.com/dpsgxzjzw/image/upload/v1751630504/pics_ozoeew.jpg",
    },
  ];

  return (
    <section className="md:px-36 px-16 py-6 font-serif">
      {/* First Heading with organize button */}
      <div className="hidden md:flex justify-between">
        <p className="font-semibold text-3xl w-[250px]">
          Start your journey to the perfect wedding
        </p>
        <div className="flex w-[600px] flex-col px-5">
          <q className="font-semibold">
            In the blink of an eye, everything can change. But love, when it’s
            real, will stand the test of time.
          </q>
          <span className="text-right font-bold">— Unknown</span>
          <CustomButton
            padding="8px"
            title="Let's Organize"
            width="150px"
            address="/organize"
          />
        </div>
      </div>

      <Slider slides={slides} label={"home"}/>

      <div className="w-full mt-8 px-auto flex justify-center">
        <img src="https://res.cloudinary.com/dpsgxzjzw/image/upload/v1751630728/Group_48_frsazp.png" />
      </div>

      <div className="w-full py-4 px-auto flex items-center flex-col">
        <CustomButton
          title="Checkout our Galleries"
          width="350px"
          padding="8px"
        />
        <h1 className="text-4xl py-7 font-medium">All you need is an me</h1>
        <q className="text-xl font-normal">
          I wiII take of everything for you from event planning and curation to
          design and predication.
        </q>
        <img src="https://res.cloudinary.com/dpsgxzjzw/image/upload/v1751630485/image_lf8cci.png" className="w-full mt-5" />
      </div>

      <div className="flex w-full items-center flex-col py-5">
        <h2 className="text-2xl font-semibold">Our Reviews</h2>
        <q className="text-xl py-2">
          Feedback is the breakfast of champions. Create a space where voices
          are heard and trust is built.
        </q>
      </div>

      <div className="flex justify-center">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          {feedbacks.map((item, index) => (
            <Card item={item} key={index} />
          ))}
        </div>
      </div>

      <div className="bg-[#F6F6F6] w-full max-w-max mx-auto my-5 flex items-center justify-center flex-col p-8 shadow-lg">
        <h1 className="text-2xl">Contact Us</h1>
        <input
          placeholder="Contact us"
          className="rounded-lg p-2 m-5 outline-none text-center"
        />
      </div>
    </section>
  );
}
