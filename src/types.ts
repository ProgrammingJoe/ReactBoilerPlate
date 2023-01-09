export interface School {
  name: string
  district: District
  category: string
}

export interface District {
  id: number
  name: string
  code: string
}

export interface ProviderProps {
  children: JSX.Element | JSX.Element[]
}
