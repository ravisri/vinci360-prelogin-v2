"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

import { trends } from "@/content/sample-data"

type SelectedTag = { tag: string; setTag: (tag: string) => void }

const SelectedTagContext = createContext<SelectedTag>({ tag: trends.hashtags[0].tag, setTag: () => {} })

/** Shares the hashtag picked in the ranking (block B1) with the posts block (B4). Server children pass through. */
export function SelectedTagProvider({ children }: { children: ReactNode }) {
  const [tag, setTag] = useState(trends.hashtags[0].tag)
  return <SelectedTagContext.Provider value={{ tag, setTag }}>{children}</SelectedTagContext.Provider>
}

export const useSelectedTag = () => useContext(SelectedTagContext)
