import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'  // <-- auto-extends expect with jest-dom matchers

afterEach(() => {
  cleanup()
})