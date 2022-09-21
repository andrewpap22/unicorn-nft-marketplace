import { useState, useEffect, useRef } from 'react';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { CreatorCard, Banner, NFTCard } from '../components';
import images from '../assets';
import { makeId } from '../utils/makeId';

const Home = () => {
  const [hideButtons, setHideButtons] = useState(false);

  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  const { theme } = useTheme();

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    }

    if (direction === 'right') {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    /// scrollWidth and offsetWidth are built in properties of the DOM element that we can use to check if the element is scrollable or not
    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  /// Logic to hide the scroll buttons of the creators card list
  useEffect(() => {
    isScrollable();

    /// We need to add an event listener to the window to check if the window is resized or not
    window.addEventListener('resize', isScrollable);

    return () => window.removeEventListener('resize', isScrollable);
  }, []);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        {/* Home page Banner */}
        <Banner
          banner="Discover 🕵️ Collect 🧰 and Sell 💰 extraordinary NFTs 🦄"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        />

        {/* Home page top sellers */}
        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Best Creators 👷
          </h1>

          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >
              {/* Array of Creators */}
              {[6, 7, 8, 9, 10].map((item) => (
                <CreatorCard
                  key={`creator-${item}`}
                  rank={item}
                  creatorImage={images[`creator${item}`]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEths={10 - item * 0.5}
                />
              ))}

              {!hideButtons && (
                <>
                  {/* Left and Right arrow buttons of the CreatorCards */}
                  {/* Left Arrow */}
                  <div
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                    onClick={() => {
                      handleScroll('left');
                    }}
                  >
                    <Image
                      src={images.left}
                      layout="fill"
                      objectFit="contain"
                      alt="left-arrow"
                      className={
                        theme === 'light' ? 'filter invert' : undefined
                      }
                    />
                  </div>

                  {/* Right Arrow */}
                  <div
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                    onClick={() => {
                      handleScroll('right');
                    }}
                  >
                    <Image
                      src={images.right}
                      layout="fill"
                      objectFit="contain"
                      alt="right-arrow"
                      className={
                        theme === 'light' ? 'filter invert' : undefined
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Home Page Best NFTs */}
        <div className="mt-10">

          {/* Title */}
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">Best NFTs 🏜️</h1>

            {/* The search bar for the best nft's */}
            <div>SearchBar</div>
          </div>

          {/* The Best NFT cards */}
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <NFTCard
                key={`nft-${item}`}
                nft={{
                  item,
                  name: `🦄 Unicorn NFT ${item}`,
                  price: (10 - item * 0.534).toFixed(2),
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  owner: `0x${makeId(3)}...${makeId(4)}`,
                  desription: 'Cool NFT on Sale',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
