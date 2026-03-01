import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import z from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [intValue, decimalValue] = num.toString().split(".")
  return decimalValue ? `${intValue}.${decimalValue.padEnd(2, '0')}` : `${intValue}.00`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  if (error.name === 'ZodError') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorTree = z.treeifyError(error) as any
    const fields = Object.keys(errorTree.properties)
    const fieldErrors = fields.map((fieldName) => errorTree.properties[fieldName].errors)
    return fieldErrors.join(". ")
  }

  else if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') {
    const field = error.meta?.driverAdapterError?.cause?.constraint?.fields[0] || "Field"
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`
  }

  else {
    return typeof error.message === "string" ? error.message : JSON.stringify(error.message)
  }
}