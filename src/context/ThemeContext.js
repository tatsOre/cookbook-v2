import React from "react"

const ThemeContext = React.createContext()

export const useThemeContext = () => React.useContext(ThemeContext)

export const THEMES = {
    DEFAULT: 'default',
    DARK: 'dark'
}

function ThemeContextProvider({ children }) {
    const [theme, setTheme] = React.useState(THEMES.DEFAULT)

    return (
        <ThemeContext.Provider value={{
            theme, setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider
