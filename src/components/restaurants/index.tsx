import { useState, useEffect } from 'react'

import axios from 'axios'
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer"

type Restaurant = {
  id: number;
  Name: string;
  Description: BlocksContent;
}

export default function RestaurantsIndex() {
  const [loading, setLoading] = useState(true)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    axios.get('http://localhost:1337/api/restaurants')
      .then((res) => {
        setRestaurants(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {restaurants.map((restaurant) => (
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
