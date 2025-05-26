import { useState, useEffect } from 'react'

import { useRecoilState } from "recoil";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer"

import { restaurantsAtom, type Restaurant } from "../../state/restaurants"
import api from "../../utils/api"

export default function RestaurantsIndex() {
  const [loading, setLoading] = useState(true)
  const [restaurants, setRestaurants] = useRecoilState(restaurantsAtom)

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/restaurants')

      setRestaurants(res.data.data)
      setLoading(false)
    }

    fetchData()
  }, [setRestaurants])

  const renderDescription = (description: BlocksContent) =>{
    if (!description) { return "" }

    return (
      <BlocksRenderer content={description} />
    )
  }

  const renderDeleteButton = (documentId: string) => {
    return (
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        onClick={async () => {
          await api.delete(`/restaurants/${documentId}`)
            .then(() => {
              console.log("Deleted successfully")
              // Remove the restaurant from the state
              setRestaurants((prevRestaurants) => prevRestaurants.filter((restaurant: Restaurant) => restaurant.documentId !== documentId))
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        Delete
      </button>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {restaurants.map((restaurant: Restaurant) => (
              <li key={restaurant.id} className="p-4 border-b">
                <div className="font-bold text-2xl">{restaurant.Name}</div>
                <div className="mt-2">
                  {renderDescription(restaurant.Description)}
                </div>
                {renderDeleteButton(restaurant.documentId)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
