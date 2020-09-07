// Root
import React, {FC, useCallback, useEffect, useLayoutEffect, useState} from "react"
import {BrowserRouter as Router} from "react-router-dom"
import {Routes} from "./Routes"
import {Provider, useDispatch, useSelector} from "react-redux"
import {store} from "./store"
// Ant Design
import {Layout, Menu} from 'antd'
// import {} from '@ant-design/icons'
// Reducer
import {cycleAlert, setInitialize, setNavbarMode} from "./thunks/app-thunk"
// Selector
import {getInitialize, getNavbarMode} from "./selectors/app-selector"
// Components
import {NavbarLeft} from "./components/navbar-left/NavbarLeft"
import { NavbarTop } from "./components/navbar-top/NavbarTop"
// Type


const AppContainer: FC = (props) => {
    const {Header, Footer, Content, Sider} = Layout
    const dispatch = useDispatch()
    const initialize = useSelector(getInitialize)
    const mode = useSelector(getNavbarMode)

    const catchAllUnHandlerErrors = useCallback ( () => (promiseRejectedEvent: {reason: any}): void => {
        dispatch(cycleAlert({message: promiseRejectedEvent.reason.message, type: "error"}))
    }, [dispatch])

    useLayoutEffect(() => {
        window.removeEventListener('unhandledrejection', catchAllUnHandlerErrors)
    })

    useEffect(() => {
        dispatch(setInitialize())
        window.addEventListener('unhandledrejection', catchAllUnHandlerErrors)
    }, [catchAllUnHandlerErrors, dispatch])

    return (
      <Layout>
          <Router>
              <Sider style={{height: '100vh'}} collapsed={mode}>
                  <NavbarLeft mode={mode} />
              </Sider>
          <Layout>
                  <Header>
                     <NavbarTop />
                  </Header>
                  <Content>
                      {
                          !initialize
                              ? <Routes/>
                              : ''
                      }
                  </Content>
              <Footer>Footer</Footer>
          </Layout>
          </Router>
      </Layout>
    )
}

export const App: FC = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </React.StrictMode>
    )
}
