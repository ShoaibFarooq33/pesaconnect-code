
export interface Operator {
    id: number
    name: string
    type: "mobileMoney" | "bank" | "card"
    countryCode: string
    currency: string
  }