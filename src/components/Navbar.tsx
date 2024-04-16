'use client'

import React, { useState } from 'react'
import { FaLocationCrosshairs, FaLocationDot } from 'react-icons/fa6'
import { IoIosSunny } from 'react-icons/io'
import SearchBox from './SearchBox'
import axios from 'axios'
import { placeAtom } from '@/app/atom'
import { useAtom } from 'jotai'

type Props = { location?: string }

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY

export default function Navbar({ location }: Props) {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [place, setPlace] = useAtom(placeAtom)

  async function handleInputChange(value: string) {
    setCity(value)
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${API_KEY}&cnt=56`
        )

        const suggestions = response.data.list.map((item: any) => item.name)
        setSuggestions(suggestions)
        setError('')
        setShowSuggestions(true)
      } catch (error) {
        setSuggestions([])
        setShowSuggestions(false)
      }
    } else {
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value)
    setShowSuggestions(false)
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (suggestions.length === 0) {
      setError('Location not found')
    } else {
      setError('')
      setPlace(city)
      setShowSuggestions(false)
    }
  }

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3x1">Weather</h2>
          <IoIosSunny className="text-3xl mt-1 text-yellow-300" />
        </div>
        <section className="flex gap-2 items-center">
          <FaLocationCrosshairs className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <FaLocationDot className="text-2xl" />
          <p className="text-slate-900/80 text-sm">{location}</p>
          <div className="relative">
            <SearchBox value={city} onChange={(e) => handleInputChange(e.target.value)} onSubmit={handleSubmitSearch} />
            <SuggestionBox {...{ showSuggestions, suggestions, handleSuggestionClick, error }} />
          </div>
        </section>
      </div>
    </nav>
  )
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean
  suggestions: string[]
  handleSuggestionClick: (suggestion: string) => void
  error: string
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-4">
          {error && suggestions.length < 1 && <li className="text-red-500">{error}</li>}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            ></li>
          ))}
          <li className="cursor-pointer p-1 rounded hover:bg-gray-200"></li>
        </ul>
      )}
    </>
  )
}
