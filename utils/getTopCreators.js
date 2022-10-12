/// returns an array of top sellers
/// A top seller is a person with a high sum of prices of all NFTs they've listed.

export const getCreators = (nfts) => {
  const sellers = nfts.reduce((acc, nft) => {
    const { seller, price } = nft;
    if (!acc[seller]) {
      acc[seller] = 0;
    }
    acc[seller] += parseInt(price, 10);
    return acc;
  }, {});

  const sellersArray = Object.entries(sellers).map(([seller, price]) => ({
    seller,
    price,
  }));

  const topSellers = sellersArray.sort((a, b) => b.price - a.price).slice(0, 10);

  return topSellers;
};
