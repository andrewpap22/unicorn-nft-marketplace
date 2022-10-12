import { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router';
import axios from 'axios';
import { NFTContext } from '../context/NFTContext';
import { Loader, Button, Input } from '../components';

const ResellNFT = () => {
  const { createSale } = useContext(NFTContext);
  const router = useRouter();
  const { id, tokenURI } = router.query;

  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNFT = async () => {
    const { data } = await axios.get(tokenURI);

    setPrice(data.price);
    setImage(data.image);
    setLoading(false);
  };

  useEffect(() => {
    if (tokenURI) fetchNFT();
  }, [tokenURI]);

  const resell = async () => {
    console.log(tokenURI, id, price);
    await createSale(tokenURI, price, true, id);

    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">Resell NFT 🀄🀄</h1>

        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setPrice(e.target.value)}
        />

        {image && <img src={image} alt="NFT" className="rounded w-full mt-4" width={350} />}

        <div className="mt-4 w-full flex justify-end">
          <Button
            btnName="Resell NFT"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;
