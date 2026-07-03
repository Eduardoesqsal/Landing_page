import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import App from "../App"

test("renders the main heading", () => {
  render(<App />)
  const heading = screen.getByText(/tu estilo/i)
  expect(heading).toBeInTheDocument()
})

test("renders whatsapp contact button", () => {
  render(<App />)
  const whatsappLinks = screen.getAllByText(/whatsapp/i)
  expect(whatsappLinks.length).toBeGreaterThan(0)
})
