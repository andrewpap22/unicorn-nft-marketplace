import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '.';
import images from '../assets';

/// Menu Items component
const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (index) => {
    switch (index) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/my-nfts';
      default:
        return '/';
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && 'flex-col h-full'
      }`}
    >
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, index) => (
        <li
          key={index}
          onClick={() => {
            setActive(item);
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${
            active === item
              ? 'dark:text-white text-nft-black-1'
              : 'dark:text-nft-gray-3 text-nft-gray-2'
          }`}
        >
          <Link href={generateLink(index)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

/// Button Group component
const ButtonGroup = () => {
  const hasConnected = false;

  return hasConnected ? (
    <Button btnName="Create" classStyles="mx-2 rounded-xl" />
  ) : (
    <Button btnName="Connect" classStyles="mx-2 rounded-xl" />
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('Explore NFTs');

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {}}
          >
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
        </Link>

        {/* On medium screen devices remove the text and keep only the logo  */}
        <Link href="/">
          <div className="hidden md:flex" onClick={() => {}}>
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="app-logo"
            />
          </div>
        </Link>
      </div>

      {/* Light / Dark mode toggle */}
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fa-sun">
              <FontAwesomeIcon icon={faSun} />
            </i>
            <i className="fa-moon">
              <FontAwesomeIcon icon={faMoon} />
            </i>
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>
      </div>

      {/* NavBar Menu Items for non mobile devices */}
      <div className="md:hidden flex">
        <MenuItems active={active} setActive={setActive} />
        <div className="ml-4">
          <ButtonGroup />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
