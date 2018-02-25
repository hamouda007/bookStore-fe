import * as React from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';

// const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const profileRouterList = [
    {
        key: 'index',
        path: '/profile',
    },
    {
        key: 'book_list',
        path: '/profile/book_list',
    },
    {
        key: 'user_info',
        path: '/profile/user_info',
    },
    {
        key: 'address',
        path: '/profile/address',
    }
];

interface MenuProps {
    pathname: string;
}

export default class BookList extends React.Component<MenuProps, {}> {
    state = {
        selectedKey: [profileRouterList[0].key]
    };

    componentDidMount() {
        this.setSelectedKey();
    }

    componentWillReceiveProps(nextProps: MenuProps) {
        const {pathname: nextPathName} = nextProps;
        const {pathname} = this.props;
        if (pathname !== nextPathName) {
            this.setSelectedKey(nextProps);
        }
    }

    setSelectedKey(props: MenuProps = this.props) {
        const {pathname} = props;
        const newSelectedObject = profileRouterList.find(({path}) => path === pathname);
        if ( newSelectedObject ) {
            this.setState({
                selectedKey: [newSelectedObject.key]
            });
        }
    }
    render() {
        return (
            <Menu
                style={{ width: 256 }}
                selectedKeys={this.state.selectedKey}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <Menu.Item key="index">
                    <Link to="/profile">个人中心</Link>
                </Menu.Item>
                <MenuItemGroup key="book_center" title={<span>订单中心</span>}>
                    <Menu.Item key="book_list"><Link to="/profile/book_list">订单列表</Link></Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup key="account_center" title={<span>账户中心</span>}>
                    {/*<Menu.Item key="my_bank">我的银行</Menu.Item>*/}
                    <Menu.Item key="user_info"><Link to="/profile/user_info">账户信息</Link></Menu.Item>
                    <Menu.Item key="address"><Link to="/profile/address">地址管理</Link></Menu.Item>
                </MenuItemGroup>
            </Menu>
        );
    }
}