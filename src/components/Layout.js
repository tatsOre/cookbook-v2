import React from "react"
import Header from "./Header"
import Footer from "./Footer"

function Layout({ children, headerExtraContent, withFooter = true }) {
  return (
    <React.Fragment>
      <Header children={headerExtraContent} />
      <main>{children}</main>
      {withFooter && <Footer />}
    </React.Fragment>
  )
}

export default Layout
