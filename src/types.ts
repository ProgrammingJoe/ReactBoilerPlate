export interface School {
  id: number
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

export interface DjangoChoice {
  options: SelectOption[]
}

export interface HighSchoolCategories extends DjangoChoice {
  Elementary?: string
  MiddleSchool?: string
  Highschool?: string
}

export interface SelectOption {
  value: string
  label: string
}
