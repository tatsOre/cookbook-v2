import React from "react"

const ThemeContext = React.createContext()

export const useThemeContext = () => React.useContext(ThemeContext)

export const THEMES = {
    DEFAULT: 'default',
    DARK: 'dark'
}

const THEME_KEY = 'CookbookTheme'

function ThemeContextProvider({ children }) {
    const [theme, setTheme] = React.useState(THEMES.DEFAULT)

    const selectTheme = (value) => {
        window.localStorage.setItem(THEME_KEY, value)
        setTheme(value)
    }

    React.useEffect(() => {
        const localTheme = window.localStorage.getItem(THEME_KEY)

        if (localTheme) {
            setTheme(localTheme)
        } else if (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            setTheme(THEMES.DARK)
        }
    }, [])

    return (
        <ThemeContext.Provider value={{
            theme, selectTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider
