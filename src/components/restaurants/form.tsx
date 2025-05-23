import React from "react"
import { useSetRecoilState } from "recoil";

import api from "../../utils/api"
import { restaurantsAtom } from "../../state/restaurants"

export default function RestaurantsForm() {
  const setRestaurants = useSetRecoilState(restaurantsAtom)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = document.getElementById("name") as HTMLInputElement;

    const data = Object.fromEntries(formData.entries());

    await api.post("/restaurants", { data })
      .then((res) => {
        setRestaurants((prevRestaurants) => [
          ...prevRestaurants,
          res.data.data,
        ])

        name.value = ""
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold underline mb-4">
        Restaurants Form
      </h1>

      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Restaurant Name" name="Name" />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>
      </form>

    </div>
  )
}
