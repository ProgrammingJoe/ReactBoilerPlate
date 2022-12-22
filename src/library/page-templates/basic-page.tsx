import React, { useEffect, useState } from 'react'
import {
  DesktopOutlined,
  PieChartOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
import { PageContainer } from 'library/containers'
import { useNavigate, useLocation } from 'react-router-dom'
import { ProviderProps } from 'types'

const { Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number] & {
  location: string
}

function getItem (
  label: React.ReactNode,
  key: React.Key,
  location: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    location,
    label
  }
}

const items: MenuItem[] = [
  getItem('Home', '1', '/', <PieChartOutlined />),
  getItem('Schools', '2', '/schools', <DesktopOutlined />)
]

const BasicPage: React.FC<ProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [defaultState, setDefaultState] = useState('1')
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const item = items.find((i) => i.location === location.pathname)
    if (item?.key !== undefined) setDefaultState(String(item.key))
  }, [])

  const navigateMenuItem = (menuItemKey: string): void => {
    const item = items.find((i) => i.key === menuItemKey)
    if (item !== undefined) navigate(item.location)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          selectedKeys={[defaultState]}
          mode="inline"
          items={items}
          onClick={(item) => navigateMenuItem(item.key)}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <PageContainer>
            { children }
          </PageContainer>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default BasicPage
