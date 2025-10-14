import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

function Tiny() {
    return <button>Click me </button>
}

describe('rtl is wired', () => {
    it('finds a button by role', () => {
        render(<Tiny />)
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })
})