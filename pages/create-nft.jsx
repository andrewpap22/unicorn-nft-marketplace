import { useState, useMemo, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { NFTContext } from '../context/NFTContext';
import { Button, Input, Loader } from '../components';
import images from '../assets';

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRET;

const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const CreateNFT = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const { createSale, isLoadingNFT } = useContext(NFTContext);
  const [formInput, setFormInput] = useState({
    price: '',
    name: '',
    description: '',
  });
  const { theme } = useTheme();
  const router = useRouter();

  /// upload NFT to IPFS
  const uploadToInfura = async (file) => {
    try {
      const added = await client.add({ content: file });

      /// Dedicated Gateway --- https://docs.infura.io/infura/networks/ipfs/how-to/access-ipfs-content/dedicated-gateways
      const url = `https://foxy-fxt.infura-ipfs.io/ipfs/${added.path}`;

      setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file to IPFS: ', error);
    }
  };

  const createMarketNFT = async () => {
    const { name, description, price } = formInput;

    if (!name || !description || !price || !fileUrl) return;

    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);

      /// Dedicated Gateway --- https://docs.infura.io/infura/networks/ipfs/how-to/access-ipfs-content/dedicated-gateways
      const url = `https://foxy-fxt.infura-ipfs.io/ipfs/${added.path}`;

      await createSale(url, price);

      router.push('/');
    } catch (error) {
      console.log('Error creating NFT: ', error);
    }
  };

  /// Logic to upload the image on the blockchain (IPFS)
  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfura(acceptedFile[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () => `
    dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive ? 'border-file-active' : undefined}
    ${isDragAccept ? 'border-file-accept' : undefined}
    ${isDragReject ? 'border-file-reject' : undefined}
  `,
    [isDragAccept, isDragActive, isDragReject],
  );

  if (isLoadingNFT) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
          Create a new NFT 📈
        </h1>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload File
          </p>

          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />

              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG 🏜️ PNG 🏞️ GIF 🌆 SVG 🏙️ WEBM 🌃 --- Max size 100MB.
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    alt="file upload"
                    width={100}
                    height={100}
                    objectFit="contain"
                    className={theme === 'light' ? 'filter invert' : undefined}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag & Drop your file 📂
                </p>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  or click to browse files on your device 🗃️
                </p>
              </div>
            </div>

            {/* If the image got successfully uploaded to the blockchain, read it's URL and render it here */}
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_fle" />
                </div>
              </aside>
            )}
          </div>
        </div>

        {/* Custon Inputs */}
        <Input
          inputType="input"
          title="Name"
          placeholder="Enter the name of your NFT"
          handleClick={(e) => {
            setFormInput({ ...formInput, name: e.target.value });
          }}
        />

        <Input
          inputType="textarea"
          title="Description"
          placeholder="Enter the description of your NFT"
          handleClick={(e) => {
            setFormInput({ ...formInput, description: e.target.value });
          }}
        />

        <Input
          inputType="number"
          title="Price"
          placeholder="Enter the price of your NFT"
          handleClick={(e) => {
            setFormInput({ ...formInput, price: e.target.value });
          }}
        />

        {/* The Create Button */}
        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="Create NFT"
            classStyles="rounded-xl"
            handleClick={() => {
              createMarketNFT();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
