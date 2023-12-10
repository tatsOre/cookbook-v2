import React from "react"

import Footer from "./Footer"
import Header from "./Header"

function Layout({ children, headerExtraContent, withFooter = true }) {
  return (
    <React.Fragment>
      <Header>{headerExtraContent}</Header>
      <main>{children}</main>
      {withFooter && <Footer />}
    </React.Fragment>
  )
}

export default Layout
