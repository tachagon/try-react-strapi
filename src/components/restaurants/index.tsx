import { useState, useEffect } from 'react'

import { useRecoilState } from "recoil";
import axios from 'axios'
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer"

import { restaurantsAtom } from "../../state/restaurants";

type Restaurant = {
  id: number;
  Name: string;
  Description: BlocksContent;
}

export default function RestaurantsIndex() {
  const [loading, setLoading] = useState(true)
  const [restaurants, setRestaurants] = useRecoilState(restaurantsAtom)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:1337/api/restaurants')
      console.log("res", res);

      setRestaurants(res.data.data)
      setLoading(false)
    }

    fetchData()
  }, [setRestaurants])

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {restaurants.map((restaurant: Restaurant) => (
              console.log(restaurant),
              <li key={restaurant.id} className="p-4 border-b">
                <div className="font-bold text-2xl">{restaurant.Name}</div>
                <div className="mt-2">
                  {renderDescription(restaurant.Description)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

function renderDescription(description: BlocksContent) {
  if (!description) { return "" }

  return (
    <BlocksRenderer content={description} />
  )
}
