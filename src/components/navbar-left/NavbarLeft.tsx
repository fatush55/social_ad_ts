// Root
import React, {FC, useState} from "react"
import {NavLink} from "react-router-dom"
// Ant Design
import {Menu, Button, Row} from 'antd'
import {CommentOutlined, ProfileOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
// Style
import style from "./NavbarLeft.module.css"
import {useDispatch} from "react-redux";
import {setNavbarMode} from "../../thunks/app-thunk";


type PropsType = {
    mode: boolean
}

export const NavbarLeft: FC<PropsType> = ({mode}) => {
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('/profile')
    const handleClick = (e: any ) => setCurrent(e.key)
    const handlerNavbarMode = () =>  dispatch(setNavbarMode(!mode))

    return (
        <Menu
            mode={"inline"}
            selectedKeys={[current]}
            onClick={handleClick}
            theme="dark"
            onOpenChange={handlerNavbarMode}
        >
            <div className={style.logo} />
            <Menu.Item key={'/profile'} icon={<ProfileOutlined />} >
                <NavLink to={`/profile`}  >
                    Profile
                </NavLink>
            </Menu.Item>
            <Menu.Item key={'/users'} icon={<UserOutlined />} >
                <NavLink to='/user'>
                    Users
                </NavLink>
            </Menu.Item>

            <Menu.Item key={'/dialog'} icon={<CommentOutlined />}>
                <NavLink to='/dialog'>
                    Dialog
                </NavLink>
            </Menu.Item>
            <Row justify="center" align="bottom">
                <Button
                    style={{marginTop: '50vh'}}
                    onClick={handlerNavbarMode}
                    type="primary"
                    icon={mode ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    // block
                    ghost
                    // danger
                />
            </Row>
        </Menu>
    )
}
