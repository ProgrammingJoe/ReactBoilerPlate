export interface School {
  name: string
}

export interface District {
  id: number
  name: string
  code: string
}

export interface ProviderProps {
  children: JSX.Element | JSX.Element[]
}
