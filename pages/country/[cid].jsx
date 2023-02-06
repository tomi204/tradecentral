import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../components/Layouts/layout';
import { NextPageWithLayout } from '../_app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { GetAllItems } from '../../components/BlockchainApi/ListedTokens';
import Link from 'next/link';
import Image from 'next/image';
import { FaEthereum } from 'react-icons/fa';
import { ethers, utils } from 'ethers';


const SearchPage = () => {
  const { trades } = GetAllItems();
  const country = useRouter();
  const search = country.query.cid;

  const [ethPrice, setEthPrice] = useState(0);
  const getEthPrice = async () => {
    const response = await fetch("https://api.coinlore.net/api/ticker/?id=80");
    const data = await response.json(); // Extracting data as a JSON Object from the response
    const parseNumber1 = data[0].price_usd;

    setEthPrice(parseNumber1);
  };

  useEffect(() => {
    getEthPrice();
  }, []);

  let filteredItems = trades?.filter(item => {
    let name = item.country.toLowerCase();
    return name.indexOf(search?.toLowerCase()) !== -1;
  });



  return (
    <>
      {
        filteredItems?.map((trade) => (

          <div key={trade.id} className="w-6/12 mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/trade/${trade.id}`} >
              <Image className="w-full h-auto mb-4" width={50} height={50} src={trade.image} alt={`${trade.name} image`} />
            </Link>
            <div className="px-5 pb-5">
              <Link href={`/trade/${trade.id}`} >
                <h5 className="text-xl mb-4 font-semibold tracking-tight text-gray-900 dark:text-white">{trade.name}</h5>
              </Link>

              <div className="flex items-center justify-between">
                <span className="text-2xl  font-bold text-gray-900 dark:text-white"><FaEthereum />{(ethers.utils.formatEther(trade.price) / ethPrice).toFixed(5)}</span>
                <Link href={`/trade/${trade.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                  Read more
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Link>
              </div>
            </div>
          </div>
        ))
      }

    </>
  )
}



export default SearchPage