import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components/macro'
import { Routes, Route } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

import { lightTheme, darkTheme, GlobalStyles } from './styles/theme'
import { MainPage, ChatPage } from "./pages"
import { Footer, Navbar } from "./components"
import { ChatProvider } from "./context/ChatProvider"
import "./styles/fonts.css";


function App() {
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || 'light')

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }

  return (
    <ChatProvider>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <SnackbarProvider maxSnack={1} autoHideDuration={3500} preventDuplicate>
          <GlobalStyles />
          <Navbar themeToggler={themeToggler} theme={theme} />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/chats" element={<ChatPage />} />
          </Routes>
          <Footer />
        </SnackbarProvider>
      </ThemeProvider >
    </ChatProvider>

  );
}

export default App;
