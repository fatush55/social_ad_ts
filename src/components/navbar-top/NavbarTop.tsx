// Root
import React, {FC} from "react"
// Ant Design
import {Menu, } from 'antd'
import {MailOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons'


type PropsType = {}

export const NavbarTop: FC<PropsType> = () => {
    return (
        <Menu mode="horizontal" theme={"dark"}>
            <Menu.Item key="mail" icon={<MailOutlined />}>
                Navigation One
            </Menu.Item>
        </Menu>
    )
}
