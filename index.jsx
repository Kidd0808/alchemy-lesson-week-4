import Head from 'next/head'
import { useState } from 'react'
import { NFTCard } from './components/nftCards';

const Home = () => {

  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setfetchForCollection]=useState(false)

  const fetchNFTs = async() => {
    let nfts;
    console.log("fetching NFTs");
    const api_key = "WEEJZpwP4HRQ4sw5u_x7A_3ChhhCsOel"
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;

    if (!collection.length) {
      var requestOptions = {
        method: 'GET'
      };

      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("NFT in collection:", nfts)
      setNFTs(nfts.nfts)
    }

  }

  const fetchNFTsForCollection = async () => {
    if(collection.lenght) {
      const api_key = "WEEJZpwP4HRQ4sw5u_x7A_3ChhhCsOel"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}contractAddress=${collection}&withMetadata=${true}`;

     if (nfts) {
       console.log("NFTs in collection:", nfts)
     } 
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        <input onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <input onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address"></input>
        <label className="text-gray-600"><input onChange={(e)=>{setfetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for Collection</label>
        <button onClick={
          () => {
            if(fetchForCollection) {
              fetchNFTsForCollection()
            }else fetchNFTs()
          }
        }>Check your collection here!</button>
      </div>
      <div>
        {
          NFTs.lenght && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
