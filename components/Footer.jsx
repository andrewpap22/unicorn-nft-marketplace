import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets';
import { Button } from '.';

/// Footer Links Component
const FooterLinks = ({ heading, items }) => (
  <div className="flex-1 justify-start items-start">
    <h3 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">
      {heading}
    </h3>
    <div className="flex flex-col mt-4">
      {items.map((item, index) => (
        <p
          className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3"
          key={index}
        >
          {item}
        </p>
      ))}
    </div>
  </div>
);

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="flexCenter flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-16">

      {/* Email Us input and company logo */}
      <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="app-logo"
            />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
              Unicorn 🦄
            </p>
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6">
            Get the latest Updates
          </p>

          <div className="flexBetween md:w-full minlg:w-577 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-md">
            <input type="email" placeholder="Your Email" className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none" />
            <div className="flex-initial">
              <Button btnName="Email Us!" classStyles="rounded-md" />
            </div>
          </div>
        </div>

        {/* rightmost Footer Links */}
        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
          <FooterLinks heading="Unicorn 🦄" items={['Explore', 'How it Works', 'Contact Us']} />
          <FooterLinks heading="Support ☎️" items={['Help Center', 'Terms Of Service', 'Legal', 'Privacy Policy']} />
        </div>
      </div>

      {/* All right reserved part of footer */}
      <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
            Unicorn 🦄 Inc. All Rights Reserved. ©️2022
          </p>
          <div className="flex flex-row sm:mt-4">
            {[
              images.instagram,
              images.twitter,
              images.telegram,
              images.discord,
            ].map((image, index) => (
              <div className="mx-2 cursor-pointer" key={index}>
                <Image
                  src={image}
                  objectFit="contain"
                  alt="social"
                  width={24}
                  height={24}
                  className={theme === 'light' && 'filter invert'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
