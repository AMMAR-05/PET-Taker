import React, { useEffect, useState } from "react";
import OfferList from "../../components/Offers/OfferList";
function Offers() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState();

  // Get All Offers
  useEffect(() => {
    const getOffers = async () => {
      try {
        // get response from backend
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/offers"
        );
        const data = await response.json();

        // if there is a 400 or 500 error code throw an error
        if (!response.ok) {
          throw new Error(data.message);
        }

        // if there is no errors
        // Extract retrived data
        const result = data.data.offers;
        // Add offers
        setOffers(result);
      } catch (err) {
        setError(err.message);
      }
    };

    getOffers();
  }, []);

  return (
    <section>
      {/* finish this error */}
      <p>{error}</p>
      <OfferList offers={offers} />
    </section>
  );
}

export default Offers;
